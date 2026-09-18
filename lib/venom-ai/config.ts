export const venomAIConfig = {
  model: process.env.VENOM_AI_MODEL || "gpt-5-mini",
  maxOutputTokens: Number(process.env.VENOM_AI_MAX_OUTPUT_TOKENS || 420),
  maxMessagesPerSession: Number(process.env.VENOM_AI_SESSION_LIMIT || 18),
  maxInputCharacters: Number(process.env.VENOM_AI_MAX_INPUT_CHARS || 1800),
  historyMessages: Number(process.env.VENOM_AI_HISTORY_MESSAGES || 10),
  rateLimitWindowMs: Number(process.env.VENOM_AI_RATE_WINDOW_MS || 60_000),
  rateLimitRequests: Number(process.env.VENOM_AI_RATE_REQUESTS || 6),
  timeoutMs: Number(process.env.VENOM_AI_TIMEOUT_MS || 16_000),
  leadRateLimitWindowMs: Number(process.env.VENOM_LEADS_RATE_WINDOW_MS || 900_000),
  leadRateLimitRequests: Number(process.env.VENOM_LEADS_RATE_REQUESTS || 5),
  architectEnabled: process.env.VENOM_AI_ARCHITECT_ENABLED !== "false",
  briefingEnabled: process.env.VENOM_AI_BRIEFING_ENABLED !== "false",
  mockMode: process.env.VENOM_AI_MODE === "mock",
} as const;

export const safeNumber = (value: number, fallback: number, min: number, max: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
