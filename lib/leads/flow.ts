export function leadEntryStage(message?: string) {
  return message?.trim() ? "brief" : "challenge";
}

export function resolveLeadMessage(message: string, interest: string) {
  return message.trim() || interest.trim();
}
