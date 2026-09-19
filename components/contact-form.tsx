"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

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
    <div className="field-row"><Field label="Nome" htmlFor="contact-name"><input className="vc-field-control" id="contact-name" name="name" required autoComplete="name" maxLength={120} placeholder="Como podemos chamar você?" /></Field><Field label="Empresa" htmlFor="contact-company"><input className="vc-field-control" id="contact-company" name="company" autoComplete="organization" maxLength={160} placeholder="Nome da empresa" /></Field></div>
    <div className="field-row"><Field label="E-mail" htmlFor="contact-email"><input className="vc-field-control" id="contact-email" name="email" type="email" required autoComplete="email" maxLength={180} placeholder="voce@empresa.com" /></Field><Field label="WhatsApp" htmlFor="contact-whatsapp"><input className="vc-field-control" id="contact-whatsapp" name="whatsapp" type="tel" required autoComplete="tel" maxLength={40} placeholder="(00) 00000-0000" /></Field></div>
    <Field label="O que você precisa?" htmlFor="contact-interest"><select className="vc-field-control" id="contact-interest" name="interest" required value={interest} onChange={e=>setInterest(e.target.value)}><option value="" disabled>Selecione uma opção</option>{["Site ou landing page","E-commerce","Sistema sob medida","Automação e IA","Branding e identidade","Performance e crescimento","Ainda não tenho certeza"].map(i=><option key={i}>{i}</option>)}</select></Field>
    <Field label="Conte um pouco sobre o desafio" htmlFor="contact-message"><textarea className="vc-field-control" id="contact-message" name="message" required maxLength={4000} rows={4} value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Contexto, objetivo e momento atual..." /></Field>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <Button variant="primary" loading={state==="sending"}>{state==="sending"?"Enviando...":<>Enviar mensagem <ArrowRight size={18}/></>}</Button>
    {state==="error"&&<p className="form-error" role="alert">{error}</p>}
    <small>Usaremos estes dados para conversar sobre seu projeto.</small>
  </form>;
}
