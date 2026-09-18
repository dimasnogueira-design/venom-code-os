import { createHmac } from "node:crypto";
import { venomAIConfig } from "./config";

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const activeSessions = new Set<string>();

const obviousOffScope = [
  /(?:resolva|calcule|faça)\s+(?:a|uma|essa)?\s*(?:integral|derivada|equação|∫)/i,
  /(?:dever|tarefa|prova)\s+(?:de|da)\s+(?:faculdade|escola|matemática)/i,
  /(?:escreva|faça)\s+(?:uma|a)?\s*(?:redação|poesia|receita culinária)/i,
];

const projectSignals = /site|landing|e-?commerce|marketplace|sistema|plataforma|aplicativo|app|software|autom|integra|api|ia|inteligência artificial|marca|branding|identidade|negócio|empresa|clientes?|vender|captar|clínica|escola/i;

export function normalizeMessage(input: unknown) {
  return String(input ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

export function isClearlyOffScope(message: string) {
  return !projectSignals.test(message) && obviousOffScope.some(pattern => pattern.test(message));
}

export function isSpam(message: string) {
  if (/https?:\/\//gi.test(message) && (message.match(/https?:\/\//gi)?.length || 0) > 2) return true;
  if (/(.)\1{20,}/i.test(message)) return true;
  const words = message.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length > 18 && new Set(words).size / words.length < 0.22) return true;
  return false;
}

export function hashIP(ip: string) {
  const secret = process.env.VENOM_AI_HASH_SECRET || process.env.OPENAI_API_KEY || "local-development-only";
  return createHmac("sha256", secret).update(ip || "unknown").digest("hex");
}

export function checkRateLimit(key: string, now = Date.now()) {
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + venomAIConfig.rateLimitWindowMs });
    return { allowed: true, retryAfter: 0 };
  }
  if (current.count >= venomAIConfig.rateLimitRequests) {
    return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  }
  current.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export function acquireSession(sessionId: string) {
  if (activeSessions.has(sessionId)) return false;
  activeSessions.add(sessionId);
  return true;
}

export function releaseSession(sessionId: string) {
  activeSessions.delete(sessionId);
}
