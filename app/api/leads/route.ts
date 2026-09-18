import { NextResponse } from "next/server";
import { clientAddress, isSameOrigin, readJsonBody } from "@/lib/api-security";
import { safeNumber, venomAIConfig } from "@/lib/venom-ai/config";
import { consumeDistributedRateLimit } from "@/lib/venom-ai/distributed-rate-limit";
import { hashIP } from "@/lib/venom-ai/guards";
import { createServerSupabase } from "@/lib/venom-ai/supabase";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 12_000;

export async function POST(request: Request) {
  try {
    if (!isSameOrigin(request)) return NextResponse.json({ error: "Origem não autorizada." }, { status: 403 });
    const parsed = await readJsonBody(request, MAX_BODY_BYTES);
    if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: parsed.status });
    const body = typeof parsed.value === "object" && parsed.value !== null
      ? parsed.value as Record<string, unknown>
      : {};
    if (body.website) return NextResponse.json({ ok: true });
    const raw = {
      name: String(body.name ?? "").trim(),
      company: String(body.company ?? "").trim(),
      email: String(body.email ?? "").trim().toLowerCase(),
      whatsapp: String(body.whatsapp ?? "").trim(),
      interest: String(body.interest ?? "").trim(),
      message: String(body.message ?? "").trim(),
    };
    if (
      raw.name.length > 120 || raw.company.length > 160 || raw.email.length > 180
      || raw.whatsapp.length > 40 || raw.interest.length > 100 || raw.message.length > 4000
    ) return NextResponse.json({ error: "Um ou mais campos ultrapassam o tamanho permitido." }, { status: 413 });
    const lead = {
      name: raw.name,
      company: raw.company || null,
      email: raw.email,
      whatsapp: raw.whatsapp,
      interest: raw.interest,
      message: raw.message,
      source: "landing-page",
      session_id: /^[0-9a-f-]{36}$/i.test(String(body.sessionId ?? "")) ? String(body.sessionId) : null,
    };
    if (!lead.name || !emailPattern.test(lead.email) || !lead.whatsapp || !lead.interest || !lead.message) return NextResponse.json({ error: "Preencha os campos obrigatórios corretamente." }, { status: 400 });
    const supabase = createServerSupabase();
    if (!supabase) return NextResponse.json({ error: "Formulário em configuração. Fale conosco novamente em instantes." }, { status: 503 });
    const ipHash = hashIP(clientAddress(request));
    let rate;
    try {
      rate = await consumeDistributedRateLimit(supabase, {
        keyHash: ipHash,
        scope: "leads",
        limit: safeNumber(venomAIConfig.leadRateLimitRequests, 5, 1, 20),
        windowSeconds: Math.ceil(safeNumber(venomAIConfig.leadRateLimitWindowMs, 900_000, 60_000, 86_400_000) / 1000),
      });
    } catch {
      return NextResponse.json({ error: "A proteção do formulário está indisponível. Tente novamente em instantes." }, { status: 503 });
    }
    if (!rate.allowed) return NextResponse.json(
      { error: "Muitas tentativas em sequência. Aguarde um pouco e tente novamente." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
    const { error } = await supabase.from("leads").insert(lead);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Não foi possível enviar agora. Tente novamente." }, { status: 500 });
  }
}

