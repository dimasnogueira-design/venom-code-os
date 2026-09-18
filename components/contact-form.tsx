"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type State = "idle" | "sending" | "success" | "error";
export function ContactForm() {
  const [state,setState] = useState<State>("idle");
  const [error,setError] = useState("");
  const [interest,setInterest] = useState("");
  const [draft,setDraft] = useState("");
  const [context,setContext] = useState(false);
  useEffect(()=>{
    const receive=(event:Event)=>{
      const data=(event as CustomEvent<{interest:string;message?:string}>).detail;
      setInterest(data.interest);
      if(data.message) setDraft(previous=>previous ? previous+"\n\n"+data.message : data.message!);
      setContext(true); setState("idle");
    };
    window.addEventListener("venom-brief",receive);
    return ()=>window.removeEventListener("venom-brief",receive);
  },[]);
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(state==="sending") return;
    setState("sending");setError("");
    const form=event.currentTarget;
    const data=Object.fromEntries(new FormData(form));
    try {
      const response=await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,sessionId:localStorage.getItem("venom-snake-session")||undefined})});
      const result=await response.json().catch(()=>({}));
      if(response.ok){setState("success");form.reset();setDraft("");setInterest("");setContext(false);return;}
      setState("error");setError(result.error||"Não foi possível enviar agora. Tente novamente.");
    }catch{setState("error");setError("A conexão falhou. Seus dados continuam aqui; tente enviar novamente.");}
  }
  if(state==="success")return <div className="form-success" role="status"><CheckCircle2 size={34}/><h3>Mensagem recebida.</h3><p>Vamos analisar seu contexto e retornar o quanto antes.</p><button onClick={()=>setState("idle")}>Enviar outra mensagem</button></div>;
  return <form className="contact-form" onSubmit={submit} aria-busy={state==="sending"}>
    {context&&<p className="brief-context" role="status">Seu interesse já está aqui. Revise e complete o briefing.</p>}
    <div className="field-row"><label>Nome<input name="name" required autoComplete="name" maxLength={120} placeholder="Como podemos chamar você?" /></label><label>Empresa<input name="company" autoComplete="organization" maxLength={160} placeholder="Nome da empresa" /></label></div>
    <div className="field-row"><label>E-mail<input name="email" type="email" required autoComplete="email" maxLength={180} placeholder="voce@empresa.com" /></label><label>WhatsApp<input name="whatsapp" type="tel" required autoComplete="tel" maxLength={40} placeholder="(00) 00000-0000" /></label></div>
    <label>O que você precisa?<select name="interest" required value={interest} onChange={e=>setInterest(e.target.value)}><option value="" disabled>Selecione uma opção</option>{["Site ou landing page","E-commerce","Sistema sob medida","Automação e IA","Branding e identidade","Performance e crescimento","Ainda não tenho certeza"].map(i=><option key={i}>{i}</option>)}</select></label>
    <label>Conte um pouco sobre o desafio<textarea name="message" required maxLength={4000} rows={4} value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Contexto, objetivo e momento atual..." /></label>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button className="button primary" disabled={state==="sending"}>{state==="sending"?"Enviando...":<>Enviar mensagem <ArrowRight size={18}/></>}</button>
    {state==="error"&&<p className="form-error" role="alert">{error}</p>}
    <small>Usaremos estes dados para conversar sobre seu projeto.</small>
  </form>;
}
