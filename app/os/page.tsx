"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Bot,
  Check,
  CircleDollarSign,
  Clock3,
  LockKeyhole,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Agent = {
  id: string;
  title: string;
  responsibility: string;
  status: string;
};

type SystemStatus = {
  environment: string;
  commandCenter: string;
  commander: string;
  queue: string;
  durableStore: string;
  resultStore: string;
  approvalWorkflow: string;
  whatsapp: string;
  gmail: string;
  agents: Agent[];
};

type MissionResult = {
  title?: string;
  diagnosis?: string;
  plan?: string[];
  agents?: string[];
  audit?: string;
  directorDecision?: string;
  status?: string;
  mode?: string;
  jobId?: string;
  messageId?: string | null;
  workstreams?: string[];
  acceptance?: string[];
  restrictions?: string[];
  error?: string;
};

const friendlyStatus: Record<string, string> = {
  CONFIGURED_UNVERIFIED: "CONFIGURADO · AGUARDANDO TESTE",
  QUEUE_CONFIGURED_UNVERIFIED: "FILA CONFIGURADA · NÃO HOMOLOGADA",
  CONFIGURED_NOT_HOMOLOGATED: "CONFIGURADA · NÃO HOMOLOGADA",
  SIMULATION_ONLY: "SIMULAÇÃO",
  OFFLINE_WORKER_NOT_HOSTED: "WORKER LOCAL · NÃO HOMOLOGADO",
  LOCAL_OBSERVATION_ONLY: "OBSERVAÇÃO LOCAL",
  NOT_CONNECTED_PRIVATE_DATA_BLOCKED: "DESCONECTADO · DADOS BLOQUEADOS",
  NOT_CONNECTED: "NÃO CONECTADO",
  POLICY_DEFINED_NOT_AUTOMATED: "POLÍTICA DEFINIDA · QA MANUAL",
  SPECIFIED_NOT_IMPLEMENTED: "AINDA NÃO IMPLEMENTADO",
  PROTECTED: "ACESSO PROTEGIDO",
  AUTH_NOT_CONFIGURED: "ACESSO NÃO CONFIGURADO",
  NOT_CONFIGURED: "NÃO CONFIGURADO",
  CONFIGURED_STAGING: "STAGING CONFIGURADO",
  CONFIGURED_STAGING_UNVERIFIED: "STAGING · NÃO VALIDADO",
  PENDING: "AGUARDANDO WORKER",
  COMPLETED: "RESULTADO RECEBIDO",
};

function statusLabel(value: string | undefined) {
  if (!value) return "CARREGANDO";
  return friendlyStatus[value] || value.replaceAll("_", " ");
}

function statusTone(value: string | undefined) {
  if (!value) return "pending";
  if (/NOT_CONNECTED|NOT_IMPLEMENTED|NOT_CONFIGURED|OFFLINE|BLOCKED|SIMULATION/.test(value)) return "pending";
  if (/UNVERIFIED|NOT_HOMOLOGATED/.test(value)) return "review";
  return "ready";
}

export default function CommandCenterPage() {
  const [system, setSystem] = useState<SystemStatus | null>(null);
  const [statusError, setStatusError] = useState("");
  const [mission, setMission] = useState("");
  const [result, setResult] = useState<MissionResult | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/os/status", {
      cache: "no-store",
      credentials: "same-origin",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Status HTTP ${response.status}`);
        return response.json() as Promise<SystemStatus>;
      })
      .then(setSystem)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatusError("Não foi possível ler o estado protegido do sistema.");
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const jobId = result?.jobId;
    if (!jobId || !["QUEUED", "ACCEPTED_PENDING_INGESTION"].includes(result?.status || "") || system?.resultStore !== "CONFIGURED_STAGING_UNVERIFIED") return;
    let active = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const deadline = Date.now() + 60_000;
    const poll = async () => {
      try {
        const response = await fetch(`/api/commander/jobs/${encodeURIComponent(jobId)}`, {
          cache: "no-store",
          credentials: "same-origin",
        });
        if (!response.ok) throw new Error("Falha ao consultar o retorno do worker.");
        const body = await response.json() as { status: string; result?: { workstreams?: string[]; acceptance?: string[]; restrictions?: string[] } };
        if (!active) return;
        if (body.status === "COMPLETED" && body.result) {
          setResult((current) => current?.jobId === jobId ? {
            ...current,
            title: "Plano do AI ENGINEER recebido",
            diagnosis: "O worker concluiu um plano offline. Nenhum código foi alterado nem ação externa executada.",
            plan: body.result?.workstreams || [],
            agents: ["AI_ENGINEER"],
            audit: `Aceite: ${(body.result?.acceptance || []).join(" · ")} Restrições: ${(body.result?.restrictions || []).join(" · ")}`,
            status: "COMPLETED",
          } : current);
          return;
        }
        if (Date.now() < deadline) timer = setTimeout(poll, 2_000);
      } catch {
        if (active && Date.now() < deadline) timer = setTimeout(poll, 4_000);
      }
    };
    void poll();
    return () => { active = false; if (timer) clearTimeout(timer); };
  }, [result?.jobId, result?.status, system?.resultStore]);

  async function submitMission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanMission = mission.trim();
    if (!cleanMission || cleanMission.length > 4000 || busy) return;

    setBusy(true);
    setResult(null);
    try {
      const response = await fetch("/api/commander", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": crypto.randomUUID(),
        },
        body: JSON.stringify({ mission: cleanMission }),
      });
      const body = await response.json() as MissionResult;
      if (!response.ok) throw new Error(body.error || `Falha HTTP ${response.status}`);
      setResult(body);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : "Falha ao enviar a missão." });
    } finally {
      setBusy(false);
    }
  }

  const catalogAgents = system?.agents.length || 0;
  const stagingQueue = system?.queue === "CONFIGURED_NOT_HOMOLOGATED";
  const queued = result?.status === "QUEUED" || result?.status === "ACCEPTED_PENDING_INGESTION";

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="mark">V</div>
          <div><strong>VENOM CODE</strong><span>CENTRO DE COMANDO</span></div>
        </div>
        <nav aria-label="Navegação do Centro de Comando">
          <a className="active" href="#commander"><Bot size={16} /> COMMANDER <b>01</b></a>
          <a href="#email"><Mail size={16} /> E-mail <b>OFF</b></a>
          <a href="#whatsapp"><MessageCircle size={16} /> WhatsApp <b>OFF</b></a>
          <a href="#financas"><CircleDollarSign size={16} /> Finanças privadas <b>OFF</b></a>
          <a href="#auditoria"><ShieldCheck size={16} /> Auditoria e QA</a>
        </nav>
        <div className="director">
          <span>RESPONSÁVEL</span>
          <strong>Diretor</strong>
          <small>As ações externas exigem aprovação.</small>
        </div>
      </aside>

      <section className="content" id="commander">
        <header>
          <div>
            <div className="eyebrow">OPERAÇÃO PESSOAL · AMBIENTE ISOLADO</div>
            <h1>Centro de Comando</h1>
            <p>Uma entrada para coordenar agentes, acompanhar tarefas e revisar decisões.</p>
          </div>
          <div className="outline"><LockKeyhole size={14} /> {statusLabel(system?.commandCenter)}</div>
        </header>

        <div className="safetyNotice" role="note">
          <ShieldCheck size={18} />
          <div><strong>Staging técnico protegido</strong><span>Use apenas missões técnicas sintéticas. Não inclua e-mails, telefones, cobranças nem dados pessoais. Nenhuma mensagem ou pagamento é enviado por este painel.</span></div>
        </div>

        <form className="missionBox" onSubmit={submitMission}>
          <div className="missionIcon"><Sparkles size={20} /></div>
          <div className="missionInput">
            <label htmlFor="mission">MISSÃO PARA O COMMANDER</label>
            <textarea
              id="mission"
              name="mission"
              value={mission}
              onChange={(event) => setMission(event.target.value)}
              maxLength={4000}
              placeholder="Ex.: AI_ENGINEER, valide a fila de staging com uma tarefa técnica sintética."
              aria-describedby="mission-hint"
              required
            />
            <small id="mission-hint">Até 4.000 caracteres · não use informações pessoais ou financeiras</small>
          </div>
          <button type="submit" disabled={busy || !mission.trim()}>
            {busy ? <><Clock3 size={15} /> ENVIANDO</> : <><Send size={15} /> DESPACHAR</>}
          </button>
        </form>

        {result && (
          <section className="panel commanderResult" aria-live="polite" aria-label="Resultado da missão">
            <div className="panelHead"><div><span>RETORNO DO COMMANDER</span><h2>{result.title || (queued ? "Missão recebida" : "Resultado da missão")}</h2></div></div>
            {result.error ? <p role="alert">{result.error}</p> : (
              <>
                {result.diagnosis && <p>{result.diagnosis}</p>}
                {queued && result.status !== "COMPLETED" && <p>A fila aceitou o trabalho. {system?.resultStore === "CONFIGURED_STAGING_UNVERIFIED" ? "Aguardando retorno do worker." : "A persistência do retorno ainda não está configurada neste staging."}</p>}
                {result.plan && <ol>{result.plan.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ol>}
                {result.agents && <div className="agentTags">{result.agents.map((agent) => <b key={agent}>{agent}</b>)}</div>}
                {result.audit && <div className="auditBox"><strong>QA / AUDITORIA</strong><p>{result.audit}</p></div>}
                {result.directorDecision && <div className="decisionBox"><strong>DECISÃO DO DIRETOR</strong><p>{result.directorDecision}</p></div>}
                {(result.jobId || result.messageId) && <p className="jobReference">Protocolo: <code>{result.jobId || result.messageId}</code></p>}
                {result.mode && <p className="jobReference">Modo: {result.mode}</p>}
              </>
            )}
          </section>
        )}

        <section className="metrics" aria-label="Resumo do sistema">
          <article><span>AMBIENTE</span><strong>{statusLabel(system?.environment)}</strong><small><Activity size={12} /> Preview isolado</small></article>
          <article><span>COMMANDER</span><strong>{statusLabel(system?.commander)}</strong><small><Bot size={12} /> Orquestra missões</small></article>
          <article><span>FILA DURÁVEL</span><strong>{statusLabel(system?.queue)}</strong><small><Clock3 size={12} /> {stagingQueue ? "Staging · testes limitados" : "Aguardando homologação"}</small></article>
          <article><span>AGENTES NO CATÁLOGO</span><strong>{system ? catalogAgents : "—"}</strong><small><Check size={12} /> Status carregado da API</small></article>
        </section>

        <p className="jobReference">Retorno persistente do AI ENGINEER: {statusLabel(system?.resultStore)} · banco exclusivo do Commander</p>

        <div className="grid">
          <section className="panel" id="auditoria">
            <div className="panelHead"><div><span>COMANDO E EXECUÇÃO</span><h2>Sequência operacional</h2></div><span className={`statePill ${statusTone(system?.queue)}`}>{statusLabel(system?.queue)}</span></div>
            <div className="pipeline" aria-label="COMMANDER para fila para AI_ENGINEER e QA">
              <div className="live"><Bot /><strong>COMMANDER</strong><span>{statusLabel(system?.commander)}</span></div>
              <div className={stagingQueue ? "live" : ""}><Activity /><strong>FILA</strong><span>{statusLabel(system?.queue)}</span></div>
              <div><Sparkles /><strong>AI_ENGINEER</strong><span>{statusLabel(system?.agents.find((agent) => agent.id === "AI_ENGINEER")?.status)}</span></div>
              <div><ShieldCheck /><strong>QA</strong><span>REVISÃO HUMANA</span></div>
              <div><ArrowUpRight /><strong>DIRETOR</strong><span>APROVA A PRÓXIMA AÇÃO</span></div>
            </div>
            {statusError && <p className="statusError" role="alert"><AlertCircle size={14} /> {statusError}</p>}
          </section>

          <section className="panel">
            <div className="panelHead"><div><span>AGENTES PESSOAIS</span><h2>Equipe e estado real</h2></div></div>
            <div className="agentList">
              {(system?.agents || []).slice(0, 7).map((agent) => (
                <article className="agent" key={agent.id}>
                  <div className="agentDot"><Bot size={15} /></div>
                  <div><strong>{agent.id}</strong><small>{agent.responsibility}</small></div>
                  <span className={`statePill ${statusTone(agent.status)}`}>{statusLabel(agent.status)}</span>
                </article>
              ))}
              {!system && <p className="loadingState">{statusError || "Lendo o estado protegido…"}</p>}
            </div>
          </section>
        </div>

        <div className="integrationGrid">
          <article className="panel" id="email"><Mail size={18} /><div><strong>Leitura e rascunhos de e-mail</strong><span>{statusLabel(system?.gmail)}</span><small>Sem envio automático. Credencial ainda não conectada.</small></div></article>
          <article className="panel" id="whatsapp"><MessageCircle size={18} /><div><strong>WhatsApp e conflitos</strong><span>{statusLabel(system?.whatsapp)}</span><small>Observação local. Conexão oficial e QA pendentes.</small></div></article>
          <article className="panel" id="financas"><CircleDollarSign size={18} /><div><strong>Finanças e cobranças pessoais</strong><span>DADOS BLOQUEADOS</span><small>Banco privado separado ainda não configurado; nada é enviado ou negociado.</small></div></article>
        </div>
      </section>
    </main>
  );
}
