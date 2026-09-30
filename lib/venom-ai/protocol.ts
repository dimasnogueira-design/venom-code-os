export type SnakeProfile = "snake" | "architect" | "briefing";

const complexProjectPattern = /marketplace|sistema|plataforma|integra|api|pagamento|autentica|lgpd|ia|automação/i;
const briefingRequestPattern = /(?:mont|ger|cri|fech|resum).{0,24}briefing|briefing.{0,24}(?:mont|ger|cri|fech|resum)/i;

export function selectSnakeProfile({
  message,
  userMessageCount,
  hasBriefing,
}: {
  message: string;
  userMessageCount: number;
  hasBriefing: boolean;
}): SnakeProfile {
  if (!hasBriefing && userMessageCount >= 3 && briefingRequestPattern.test(message)) return "briefing";
  if (userMessageCount >= 3 && complexProjectPattern.test(message)) return "architect";
  return "snake";
}
