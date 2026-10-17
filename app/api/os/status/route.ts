import { NextResponse } from "next/server";

const agentDefinitions = [
  { id: "COMMANDER", title: "Orquestrador", responsibility: "Recebe a missão e define etapas" },
  { id: "AI_ENGINEER", title: "Engenharia de IA", responsibility: "Constrói e mantém o runtime dos agentes" },
  { id: "GMAIL_SECRETARY", title: "Secretário Gmail", responsibility: "Triagem e rascunhos com revisão humana" },
  { id: "SNAKE_WHATSAPP", title: "SNAKE Atendimento", responsibility: "Atendimento, classificação e handoff" },
  { id: "SNAKE_PRIVATE", title: "SNAKE Privado", responsibility: "Cobranças em área privada e segregada" },
  { id: "HUNTER", title: "Hunter", responsibility: "Pesquisa comercial com fontes verificáveis" },
  { id: "DIGITAL_AUDITOR", title: "Auditor Digital", responsibility: "Diagnóstico técnico e de conversão" },
  { id: "RESEARCH", title: "Research", responsibility: "Briefing factual e contexto de mercado" },
  { id: "PROTOTYPE_FACTORY", title: "Prototype Factory", responsibility: "Protótipos privados e QA" },
  { id: "CLOSER", title: "Closer", responsibility: "Propostas e cadências para revisão" },
  { id: "MEDIA_LAB", title: "Media Lab", responsibility: "Ativos comerciais próprios ou licenciados" },
  { id: "AURYK", title: "AURYK", responsibility: "Sourcing e loja de teste" },
  { id: "QA_DIRECTOR", title: "QA Director", responsibility: "Auditoria independente e veto de release" },
];

function agentStatus(id: string) {
  if (id === "COMMANDER") {
    if (process.env.VERCEL_ENV === "preview" && process.env.COMMANDER_MODE === "queue" && process.env.VENOM_QUEUE_ENABLED === "true") return "CONFIGURED_UNVERIFIED";
    return "SIMULATION_ONLY";
  }
  if (id === "AI_ENGINEER") {
    if (process.env.VERCEL_ENV === "preview" && process.env.COMMANDER_MODE === "queue" && process.env.VENOM_QUEUE_ENABLED === "true") return "CONFIGURED_UNVERIFIED";
    return "OFFLINE_WORKER_NOT_HOSTED";
  }
  if (id === "SNAKE_WHATSAPP") return "LOCAL_OBSERVATION_ONLY";
  if (id === "SNAKE_PRIVATE") return "NOT_CONNECTED_PRIVATE_DATA_BLOCKED";
  if (id === "GMAIL_SECRETARY") return "NOT_CONNECTED";
  if (id === "QA_DIRECTOR") return "POLICY_DEFINED_NOT_AUTOMATED";
  return "SPECIFIED_NOT_IMPLEMENTED";
}

export async function GET() {
  const preview = process.env.VERCEL_ENV === "preview";
  const privateStoreUrl = process.env.VENOM_OS_PRIVATE_SUPABASE_URL?.replace(/\/$/, "");
  const crmUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
  const queueConfigured = preview
    && process.env.COMMANDER_MODE === "queue"
    && process.env.VENOM_QUEUE_ENABLED === "true";
  const authConfigured = Boolean(process.env.VENOM_OS_USERNAME && process.env.VENOM_OS_PASSWORD);
  const status = {
    environment: preview ? "PREVIEW_STAGING" : process.env.VERCEL_ENV || "LOCAL",
    commandCenter: authConfigured ? "PROTECTED" : "AUTH_NOT_CONFIGURED",
    commander: queueConfigured ? "QUEUE_CONFIGURED_UNVERIFIED" : "SIMULATION_ONLY",
    queue: queueConfigured ? "CONFIGURED_NOT_HOMOLOGATED" : "DISABLED",
    durableStore: process.env.VENOM_OS_DATABASE_URL ? "CONFIGURED" : "NOT_CONFIGURED",
    resultStore: preview && privateStoreUrl && privateStoreUrl !== crmUrl && process.env.VENOM_OS_PRIVATE_SUPABASE_SERVICE_ROLE_KEY && process.env.VENOM_ENGINEER_RESULT_TOKEN ? "CONFIGURED_STAGING_UNVERIFIED" : "NOT_CONFIGURED",
    approvalWorkflow: "NOT_IMPLEMENTED",
    whatsapp: "LOCAL_OBSERVATION_ONLY",
    gmail: "NOT_CONNECTED",
    agents: agentDefinitions.map(agent => ({ ...agent, status: agentStatus(agent.id) })),
    checkedAt: new Date().toISOString(),
  };
  return NextResponse.json(status, { headers: { "Cache-Control": "private, no-store" } });
}
