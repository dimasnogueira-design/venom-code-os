import { randomUUID } from "node:crypto";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { venomAIConfig, safeNumber } from "@/lib/venom-ai/config";
import { acquireSession, checkRateLimit, hashIP, isClearlyOffScope, isSpam, normalizeMessage, releaseSession } from "@/lib/venom-ai/guards";
import { architectInstructions, briefingInstructions, shouldUseArchitect, snakeInstructions, wantsBriefing } from "@/lib/venom-ai/prompts";
import { createServerSupabase } from "@/lib/venom-ai/supabase";

export const runtime = "nodejs";
export const maxDuration = 25;

type StoredMessage = { role: "user" | "assistant"; content: string };
const json = (body: object, status = 200, headers?: HeadersInit) => NextResponse.json(body, { status, headers });

function mockReply(message: string) {
  if (/marketplace/i.test(message)) return "Um marketplace envolve dois públicos, regras de oferta, pagamento e operação. O primeiro passo é definir quem vende, quem compra e como a VENOM CODE participa de cada transação. Qual é o nicho desse marketplace?";
  if (/clínica|clinica/i.test(message)) return "Para uma clínica, o site precisa gerar confiança e facilitar o próximo passo, como agendamento ou contato. Vocês já usam algum sistema de agenda?";
  if (/escola.*inglês|inglês.*escola/i.test(message)) return "Podemos criar uma jornada focada em captação: oferta clara, prova social, teste de nível e contato rápido. Hoje os alunos chegam por qual canal?";
  return "Entendi o ponto de partida. Para desenhar uma solução útil, preciso saber qual resultado de negócio você quer alcançar primeiro.";
}

export async function POST(request: Request) {
  let lockedSession = "";
  const startedAt = Date.now();
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > 12_000) return json({ error: "Mensagem muito grande.", code: "INPUT_TOO_LARGE" }, 413);
    const body = await request.json();
    if (body.website) return json({ reply: "Posso ajudar com projetos digitais e soluções da VENOM CODE. Me conta o que você quer construir." });

    const message = normalizeMessage(body.message);
    const sessionId = /^[0-9a-f-]{36}$/i.test(String(body.sessionId || "")) ? String(body.sessionId) : randomUUID();
    if (message.length < 2) return json({ error: "Escreva um pouco mais sobre o projeto.", code: "INVALID_INPUT" }, 400);
    if (message.length > safeNumber(venomAIConfig.maxInputCharacters, 1800, 200, 4000)) return json({ error: `Use até ${venomAIConfig.maxInputCharacters} caracteres por mensagem.`, code: "INPUT_TOO_LARGE" }, 413);
    if (isSpam(message)) return json({ error: "Essa mensagem parece repetitiva. Reescreva em uma frase objetiva.", code: "SPAM" }, 400);
    if (isClearlyOffScope(message)) return json({ sessionId, reply: "Posso ajudar com projetos digitais e soluções da VENOM CODE. Me conta o que você quer construir.", blocked: true });

    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
    const ipHash = hashIP(forwarded);
    const rate = checkRateLimit(ipHash);
    if (!rate.allowed) return json({ error: "Muitas mensagens em sequência. Respire um pouco e tente novamente.", code: "RATE_LIMITED", retryAfter: rate.retryAfter }, 429, { "Retry-After": String(rate.retryAfter) });
    if (!acquireSession(sessionId)) return json({ error: "Já estou processando sua mensagem anterior.", code: "DUPLICATE_REQUEST" }, 409);
    lockedSession = sessionId;

    const supabase = createServerSupabase();
    if (!supabase && !venomAIConfig.mockMode) return json({ error: "A SNAKE está se reconectando. Tente novamente em instantes.", code: "SERVICE_UNAVAILABLE" }, 503);

    let history: StoredMessage[] = [];
    let messageCount = 0;
    if (supabase) {
      const { error: sessionError } = await supabase.from("sessions").upsert({ id: sessionId, ip_hash: ipHash, last_activity: new Date().toISOString(), status: "active" }, { onConflict: "id" });
      if (sessionError) throw new Error("storage_unavailable");
      const [countResult, historyResult] = await Promise.all([
        supabase.from("messages").select("id", { count: "exact", head: true }).eq("session_id", sessionId).eq("role", "user"),
        supabase.from("messages").select("role,content").eq("session_id", sessionId).order("created_at", { ascending: false }).limit(safeNumber(venomAIConfig.historyMessages, 10, 2, 16)),
      ]);
      if (countResult.error || historyResult.error) throw new Error("storage_unavailable");
      messageCount = countResult.count || 0;
      if (messageCount >= safeNumber(venomAIConfig.maxMessagesPerSession, 18, 4, 40)) return json({ error: "Esta conversa chegou ao limite. Envie o briefing para o time ou inicie uma nova sessão depois.", code: "SESSION_LIMIT" }, 429);
      history = ((historyResult.data || []) as StoredMessage[]).reverse();
      const { error } = await supabase.from("messages").insert({ session_id: sessionId, role: "user", content: message, ip_hash: ipHash });
      if (error) throw new Error("storage_unavailable");
    }

    let reply: string;
    let briefing: Record<string, unknown> | undefined;
    const useArchitect = venomAIConfig.architectEnabled && shouldUseArchitect(message, messageCount + 1);
    const useBriefing = venomAIConfig.briefingEnabled && wantsBriefing(message) && messageCount >= 3;

    if (venomAIConfig.mockMode) {
      reply = mockReply(message);
    } else {
      if (!process.env.OPENAI_API_KEY) return json({ error: "A SNAKE está em configuração. Tente novamente mais tarde.", code: "SERVICE_UNAVAILABLE" }, 503);
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: safeNumber(venomAIConfig.timeoutMs, 16_000, 5_000, 25_000), maxRetries: 1 });
      const internalMode = useArchitect ? architectInstructions : "";
      const instructions = internalMode ? `${snakeInstructions}\n\nUse esta função interna apenas para orientar sua resposta ao visitante:\n${internalMode}` : snakeInstructions;
      const response = await client.responses.create({
        model: venomAIConfig.model,
        instructions,
        input: [...history.map(item => ({ role: item.role, content: item.content })), { role: "user" as const, content: message }],
        max_output_tokens: safeNumber(venomAIConfig.maxOutputTokens, 420, 120, 800),
      }, { signal: AbortSignal.timeout(safeNumber(venomAIConfig.timeoutMs, 16_000, 5_000, 25_000)) });
      reply = response.output_text.trim();
      if (!reply) throw new Error("empty_model_response");
      if (useBriefing) {
        const briefingResponse = await client.responses.create({
          model: venomAIConfig.model,
          instructions: briefingInstructions,
          input: `Conversa:\n${[...history,{role:"user" as const,content:message}].map(item=>`${item.role}: ${item.content}`).join("\n")}\nassistant: ${reply}`,
          max_output_tokens: 650,
        }, { signal: AbortSignal.timeout(safeNumber(venomAIConfig.timeoutMs, 16_000, 5_000, 25_000)) });
        const match = briefingResponse.output_text.match(/\{[\s\S]*\}/);
        if (match) try { briefing = JSON.parse(match[0]); } catch { /* the visitor still receives the SNAKE answer */ }
      }
      if (supabase) await supabase.from("usage_events").insert({ session_id: sessionId, ip_hash: ipHash, model: venomAIConfig.model, input_tokens: response.usage?.input_tokens || 0, output_tokens: response.usage?.output_tokens || 0, duration_ms: Date.now() - startedAt, status: "ok" });
    }

    if (supabase) {
      await supabase.from("messages").insert({ session_id: sessionId, role: "assistant", content: reply });
      if (briefing) await supabase.from("briefings").insert({ session_id: sessionId, structured_data: briefing });
    }
    return json({ sessionId, reply, briefingReady: Boolean(briefing), remaining: Math.max(0, venomAIConfig.maxMessagesPerSession - messageCount - 1) });
  } catch (error) {
    const unavailable = error instanceof Error && error.message === "storage_unavailable";
    return json({ error: unavailable ? "A conexão da SNAKE está indisponível. Tente novamente em instantes." : "A SNAKE não conseguiu responder agora. Tente novamente.", code: unavailable ? "STORAGE_UNAVAILABLE" : "AI_UNAVAILABLE" }, 503);
  } finally {
    if (lockedSession) releaseSession(lockedSession);
  }
}
