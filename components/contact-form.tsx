"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

type State = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("sending"); setMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const result = await response.json().catch(() => ({}));
    if (response.ok) { setState("success"); form.reset(); return; }
    setState("error"); setMessage(result.error || "Não foi possível enviar agora. Tente novamente.");
  }

  if (state === "success") return <div className="form-success"><CheckCircle2 size={34} /><h3>Mensagem recebida.</h3><p>Vamos analisar seu contexto e retornar o quanto antes.</p><button onClick={() => setState("idle")}>Enviar outra mensagem</button></div>;

  return <form className="contact-form" onSubmit={submit}><div className="field-row"><label>Nome<input name="name" required autoComplete="name" placeholder="Como podemos chamar você?" /></label><label>Empresa<input name="company" autoComplete="organization" placeholder="Nome da empresa" /></label></div><div className="field-row"><label>E-mail<input name="email" type="email" required autoComplete="email" placeholder="voce@empresa.com" /></label><label>WhatsApp<input name="whatsapp" required autoComplete="tel" placeholder="(00) 00000-0000" /></label></div><label>O que você precisa?<select name="interest" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Site ou landing page</option><option>E-commerce</option><option>Sistema sob medida</option><option>Automação e IA</option><option>Ainda não tenho certeza</option></select></label><label>Conte um pouco sobre o desafio<textarea name="message" required rows={4} placeholder="Contexto, objetivo e momento atual..." /></label><input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" /><button className="button primary" disabled={state === "sending"}>{state === "sending" ? "Enviando..." : <>Enviar mensagem <ArrowRight size={18} /></>}</button>{state === "error" && <p className="form-error" role="alert">{message}</p>}<small>Ao enviar, você concorda em receber nosso contato sobre este projeto.</small></form>;
}

