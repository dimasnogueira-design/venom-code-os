"use client";

import { ArrowLeft, ArrowRight, Check, CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { SnakeAI } from "@/components/snake-ai";

type RequestState = "idle" | "sending" | "success" | "error";
type Stage = "choice" | "brief" | "challenge" | "name" | "method" | "contact" | "review";
type ContactMethod = "whatsapp" | "email" | "";
type BriefDetail = { interest:string; message?:string; project?:string; objective?:string; priority?:string };

const emptyBrief:BriefDetail = { interest:"Ainda não tenho certeza", project:"Projeto digital", objective:"Organizar a necessidade e definir o próximo passo", priority:"Clareza + execução" };

export function ContactForm() {
  const [requestState,setRequestState] = useState<RequestState>("idle");
  const [stage,setStage] = useState<Stage>("choice");
  const [error,setError] = useState("");
  const [brief,setBrief] = useState<BriefDetail>(emptyBrief);
  const [name,setName] = useState("");
  const [method,setMethod] = useState<ContactMethod>("");
  const [contact,setContact] = useState("");
  const [challenge,setChallenge] = useState("");
  const [website,setWebsite] = useState("");
  const hasSnakeContext = Boolean(brief.message);

  useEffect(()=>{
    const stored=localStorage.getItem("venom-snake-brief");
    if(stored){try{const data=JSON.parse(stored) as BriefDetail;if(data.message){setBrief(data);setChallenge(data.message);setStage("brief");}}catch{localStorage.removeItem("venom-snake-brief");}}
    const receive=(event:Event)=>{const data=(event as CustomEvent<BriefDetail>).detail;setBrief({...emptyBrief,...data});setChallenge(data.message||"");setStage("brief");setRequestState("idle");};
    window.addEventListener("venom-brief",receive);
    return ()=>window.removeEventListener("venom-brief",receive);
  },[]);

  function goToContact(nextMethod:Exclude<ContactMethod,"">){setMethod(nextMethod);setContact("");setError("");setStage("contact");}
  function validateContact(){const value=contact.trim();const valid=method==="email"?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value):value.replace(/\D/g,"").length>=10;if(!valid){setError(method==="email"?"Digite um e-mail válido.":"Digite um WhatsApp com DDD.");return;}setError("");setStage("review");}
  async function submit(){
    if(requestState==="sending")return;
    setRequestState("sending");setError("");
    const message=(hasSnakeContext?(brief.message??""):challenge).trim();
    const payload={name:name.trim(),company:"",email:method==="email"?contact.trim():"",whatsapp:method==="whatsapp"?contact.trim():"",interest:brief.interest||"Ainda não tenho certeza",message,website,sessionId:localStorage.getItem("venom-snake-session")||undefined};
    try{const response=await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});const result=await response.json().catch(()=>({}));if(response.ok){track("lead_submitted",{interest:payload.interest,snakeContext:hasSnakeContext,contactMethod:method});setRequestState("success");localStorage.removeItem("venom-snake-brief");return;}setRequestState("error");setError(result.error||"Não foi possível enviar agora. Tente novamente.");}catch{setRequestState("error");setError("A conexão falhou. Seus dados continuam aqui; tente enviar novamente.");}
  }
  function restart(){setRequestState("idle");setStage("choice");setError("");setBrief(emptyBrief);setName("");setMethod("");setContact("");setChallenge("");}

  if(requestState==="success")return <div className="movement-panel movement-success" role="status"><span className="movement-check"><CheckCircle2 size={25}/></span><p className="movement-label">BRIEFING RECEBIDO ✓</p><h3>A SNAKE organizou seu projeto.<br/>Agora entra gente de verdade.</h3><p>Nosso time vai revisar o contexto e continuar a conversa pelo canal escolhido.</p><button type="button" onClick={restart}>Iniciar outro briefing</button></div>;

  return <div className="movement-panel" aria-live="polite">
    <div className="movement-head"><div><span>SEU PRÓXIMO MOVIMENTO</span><strong>{hasSnakeContext?"BRIEFING ORGANIZADO":"ESCOLHA COMO AVANÇAR"}</strong></div><small>{stage==="choice"?"01":stage==="brief"||stage==="challenge"?"02":stage==="name"?"03":stage==="method"?"04":stage==="contact"?"05":"06"} / 06</small></div>
    {stage==="choice"&&<div className="movement-stage movement-choice"><p>Comece pela conversa que faz mais sentido para você.</p><div className="movement-actions"><SnakeAI label="CONVERSAR COM A SNAKE" identityIcon/><button type="button" className="movement-person" onClick={()=>setStage("challenge")}><MessageCircle size={18}/><span><b>Prefiro falar com uma pessoa</b><small>Conte o essencial em poucos passos</small></span><ArrowRight size={17}/></button></div></div>}
    {stage==="brief"&&<div className="movement-stage"><p className="movement-label">SEU BRIEFING</p><div className="brief-summary"><div><span>PROJETO</span><strong>{brief.project}</strong></div><div><span>OBJETIVO</span><strong>{brief.objective}</strong></div><div><span>PRIORIDADE</span><strong>{brief.priority}</strong></div><div><span>STATUS</span><strong className="brief-ready"><i/> Pronto para avançar</strong></div></div><Button variant="primary" onClick={()=>setStage("name")}>Falar com a Venom <ArrowRight size={17}/></Button></div>}
    {stage==="challenge"&&<div className="movement-stage"><button className="movement-back" type="button" onClick={()=>setStage("choice")}><ArrowLeft size={15}/> Voltar</button><p className="movement-question">Qual desafio você quer resolver?</p><Field label="Contexto essencial" htmlFor="movement-challenge"><textarea className="vc-field-control" id="movement-challenge" rows={4} value={challenge} onChange={event=>setChallenge(event.target.value)} maxLength={4000} placeholder="Explique do seu jeito. O que está acontecendo hoje?" autoFocus/></Field><Button variant="primary" disabled={challenge.trim().length<8} onClick={()=>setStage("name")}>Continuar <ArrowRight size={17}/></Button></div>}
    {stage==="name"&&<div className="movement-stage"><button className="movement-back" type="button" onClick={()=>setStage(hasSnakeContext?"brief":"challenge")}><ArrowLeft size={15}/> Voltar</button><p className="movement-question">Como podemos chamar você?</p><Field label="Seu nome" htmlFor="movement-name"><input className="vc-field-control" id="movement-name" name="name" value={name} onChange={event=>setName(event.target.value)} autoComplete="name" maxLength={120} placeholder="Nome" autoFocus/></Field><Button variant="primary" disabled={name.trim().length<2} onClick={()=>setStage("method")}>Continuar <ArrowRight size={17}/></Button></div>}
    {stage==="method"&&<div className="movement-stage"><button className="movement-back" type="button" onClick={()=>setStage("name")}><ArrowLeft size={15}/> Voltar</button><p className="movement-question">Como prefere continuar?</p><div className="method-grid"><button type="button" onClick={()=>goToContact("whatsapp")}><MessageCircle size={20}/><b>WhatsApp</b><span>Conversa direta</span></button><button type="button" onClick={()=>goToContact("email")}><Mail size={20}/><b>E-mail</b><span>Resposta organizada</span></button></div></div>}
    {stage==="contact"&&<div className="movement-stage"><button className="movement-back" type="button" onClick={()=>setStage("method")}><ArrowLeft size={15}/> Voltar</button><p className="movement-question">{method==="email"?"Qual é o seu melhor e-mail?":"Qual é o seu WhatsApp?"}</p><Field label={method==="email"?"E-mail":"WhatsApp"} htmlFor="movement-contact" invalid={Boolean(error)} message={error||undefined}><input className="vc-field-control" id="movement-contact" type={method==="email"?"email":"tel"} inputMode={method==="email"?"email":"tel"} autoComplete={method==="email"?"email":"tel"} value={contact} onChange={event=>setContact(event.target.value)} maxLength={method==="email"?180:40} placeholder={method==="email"?"voce@empresa.com":"(00) 00000-0000"} autoFocus/></Field><Button variant="primary" disabled={contact.trim().length<5} onClick={validateContact}>Revisar briefing <ArrowRight size={17}/></Button></div>}
    {stage==="review"&&<div className="movement-stage"><button className="movement-back" type="button" onClick={()=>setStage("contact")}><ArrowLeft size={15}/> Ajustar contato</button><p className="movement-label">PRONTO PARA AVANÇAR</p><div className="movement-review"><p><Check size={15}/><span><b>{name}</b><small>{method==="email"?"E-mail":"WhatsApp"}: {contact}</small></span></p><p><Check size={15}/><span><b>{brief.interest}</b><small>{hasSnakeContext?"Briefing criado com a SNAKE":"Contexto enviado diretamente"}</small></span></p></div><input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={event=>setWebsite(event.target.value)}/><Button variant="primary" loading={requestState==="sending"} onClick={submit}>{requestState==="sending"?"Enviando...":<>Enviar briefing <ArrowRight size={18}/></>}</Button>{requestState==="error"&&<p className="form-error" role="alert">{error}</p>}<small className="movement-privacy">Usaremos estes dados somente para continuar esta conversa.</small></div>}
  </div>;
}
