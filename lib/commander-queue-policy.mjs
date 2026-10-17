const MAX_MISSION_CHARACTERS = 4000;

const PRIVATE_DATA_PATTERNS = [
  /\b(cpf|cnpj|credor|cobran[cç]a|d[ií]vida|negocia[cç][aã]o financeira|pagamento|banco|cart[aã]o de cr[eé]dito)\b/i,
  /\b(gmail|whatsapp|e-?mail|telefone|celular|endere[cç]o)\b/i,
  /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/,
  /\b\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}\b/,
  /\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b/,
];

export function assessStagingMission(input) {
  if (typeof input !== 'string' || !input.trim()) {
    return { ok: false, reason: 'A missão técnica é obrigatória.' };
  }

  const mission = input.trim();
  if (mission.length > MAX_MISSION_CHARACTERS) {
    return { ok: false, reason: 'A missão deve ter no máximo 4.000 caracteres.' };
  }
  if (PRIVATE_DATA_PATTERNS.some((pattern) => pattern.test(mission))) {
    return { ok: false, reason: 'O staging técnico não aceita dados pessoais ou financeiros.' };
  }

  return { ok: true, mission };
}
