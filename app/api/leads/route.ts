import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/venom-ai/supabase";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true });
    const lead = {
      name: String(body.name ?? "").trim().slice(0, 120),
      company: String(body.company ?? "").trim().slice(0, 160) || null,
      email: String(body.email ?? "").trim().toLowerCase().slice(0, 180),
      whatsapp: String(body.whatsapp ?? "").trim().slice(0, 40),
      interest: String(body.interest ?? "").trim().slice(0, 100),
      message: String(body.message ?? "").trim().slice(0, 4000),
      source: "landing-page",
      session_id: /^[0-9a-f-]{36}$/i.test(String(body.sessionId ?? "")) ? String(body.sessionId) : null,
    };
    if (!lead.name || !emailPattern.test(lead.email) || !lead.whatsapp || !lead.interest || !lead.message) return NextResponse.json({ error: "Preencha os campos obrigatórios corretamente." }, { status: 400 });
    const supabase = createServerSupabase();
    if (!supabase) return NextResponse.json({ error: "Formulário em configuração. Fale conosco novamente em instantes." }, { status: 503 });
    const { error } = await supabase.from("leads").insert(lead);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Não foi possível enviar agora. Tente novamente." }, { status: 500 });
  }
}

