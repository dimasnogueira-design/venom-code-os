type LeadNotification = {
  name: string;
  company: string | null;
  email: string;
  whatsapp: string;
  interest: string;
  message: string;
  session_id: string | null;
};

export const leadNotificationRecipient = process.env.LEAD_NOTIFICATION_EMAIL || "venomcodeos@gmail.com";

export function formatLeadNotification(lead: LeadNotification) {
  return [
    "NOVO BRIEFING — VENOM CODE",
    "",
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company || "Não informada"}`,
    `E-mail: ${lead.email || "Não informado"}`,
    `WhatsApp: ${lead.whatsapp || "Não informado"}`,
    `Interesse: ${lead.interest}`,
    `Sessão SNAKE: ${lead.session_id || "Sem sessão"}`,
    "",
    "Contexto:",
    lead.message,
  ].join("\n");
}

export async function sendLeadNotification(lead: LeadNotification, idempotencyKey: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `venom-lead-${idempotencyKey}`,
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || "SNAKE — VENOM CODE <onboarding@resend.dev>",
      to: [leadNotificationRecipient],
      reply_to: lead.email || undefined,
      subject: `Novo briefing: ${lead.interest} — ${lead.name}`,
      text: formatLeadNotification(lead),
    }),
  });

  if (!response.ok) throw new Error("email_delivery_failed");
  return true;
}
