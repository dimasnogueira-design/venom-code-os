"use client";

import { AudioLines, Bot, ArrowRight, Mic, Square, Sparkles, Send, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { VenomClose } from "@/components/ui/venom-close";

type VoiceEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type VoiceRecognition = { lang:string; continuous:boolean; interimResults:boolean; start:()=>void; stop:()=>void; onresult:((event:VoiceEvent)=>void)|null; onerror:(()=>void)|null; onend:(()=>void)|null };
type VoiceRecognitionConstructor = new () => VoiceRecognition;
type ChatMessage = { role:"user"|"assistant"; content:string };
type APIResponse = { sessionId?:string; reply?:string; error?:string; code?:string; remaining?:number };

const quickIdeas = ["Preciso de um site para minha empresa","Quero vender online","Tenho uma ideia de sistema"];
const greeting:ChatMessage = { role:"assistant", content:"Me conta o que você quer construir. Pode começar pelo problema — eu ajudo a organizar o caminho." };

export function SnakeAI({ label = "SNAKE AI", floating = false }: { label?: string; floating?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const chatEnd = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [messages,setMessages] = useState<ChatMessage[]>([greeting]);
  const [input,setInput] = useState("");
  const [sessionId,setSessionId] = useState("");
  const [state,setState] = useState<"idle"|"typing"|"error"|"limited"|"offline">("idle");
  const [statusMessage,setStatusMessage] = useState("");
  const [remaining,setRemaining] = useState<number>();
  const [listening,setListening] = useState(false);
  const recognition = useRef<VoiceRecognition | null>(null);

  useEffect(()=>{
    setSessionId(localStorage.getItem("venom-snake-session") || "");
    return ()=>recognition.current?.stop();
  },[]);
  useEffect(()=>{ if(dialog.current?.open) chatEnd.current?.scrollIntoView({behavior:"smooth",block:"nearest"}); },[messages,state]);

  function toggleVoice() {
    if (listening) { recognition.current?.stop(); return; }
    const voiceWindow = window as typeof window & { SpeechRecognition?:VoiceRecognitionConstructor; webkitSpeechRecognition?:VoiceRecognitionConstructor };
    const Recognition = voiceWindow.SpeechRecognition || voiceWindow.webkitSpeechRecognition;
    if (!Recognition) { setStatusMessage("Entrada por voz não está disponível neste navegador."); return; }
    const instance = new Recognition(); recognition.current = instance;
    instance.lang="pt-BR"; instance.continuous=false; instance.interimResults=false;
    instance.onresult=event=>{ const transcript=event.results[event.results.length-1]?.[0]?.transcript?.trim(); if(transcript)setInput(previous=>previous?`${previous} ${transcript}`:transcript); setStatusMessage("Áudio convertido. Revise e envie quando estiver pronto."); };
    instance.onerror=()=>{ setListening(false); setStatusMessage("Não consegui ouvir. Verifique a permissão do microfone."); };
    instance.onend=()=>setListening(false);
    setStatusMessage("Ouvindo…"); setListening(true); instance.start();
  }

  async function sendMessage(text=input) {
    const message=text.trim();
    if(message.length<2 || state==="typing") return;
    setMessages(current=>[...current,{role:"user",content:message}]); setInput(""); setState("typing"); setStatusMessage("");
    try {
      const response=await fetch("/api/venom-ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message,sessionId,website:""})});
      const data:APIResponse=await response.json();
      if(!response.ok) { setState(data.code==="RATE_LIMITED"||data.code==="SESSION_LIMIT"?"limited":data.code?.includes("UNAVAILABLE")?"offline":"error"); setStatusMessage(data.error||"Não consegui responder agora."); return; }
      if(data.sessionId){setSessionId(data.sessionId);localStorage.setItem("venom-snake-session",data.sessionId);}
      if(data.reply)setMessages(current=>[...current,{role:"assistant",content:data.reply!}]);
      setRemaining(data.remaining); setState("idle");
    } catch { setState("offline"); setStatusMessage("Conexão indisponível. Tente novamente em instantes."); }
  }

  function resetConversation(){ localStorage.removeItem("venom-snake-session"); setSessionId(""); setMessages([greeting]); setInput(""); setState("idle"); setStatusMessage(""); setRemaining(undefined); }
  function continueBrief(){ const transcript=messages.filter(item=>item.role==="user").map(item=>item.content).join(" "); dialog.current?.close(); window.dispatchEvent(new CustomEvent("venom-brief",{detail:{interest:"Ainda não tenho certeza",message:`Briefing iniciado com a SNAKE: ${transcript}`}})); document.getElementById("contato")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"}); }

  return <>
    <button className={floating?"snake-float":"button ghost"} aria-haspopup="dialog" aria-label={floating?"Planejar meu projeto com a SNAKE, a consultora digital da VENOM":undefined} onClick={()=>dialog.current?.showModal()}>
      {floating?<><span className="snake-float-label">{label}</span><span className="snake-float-mark"><Image src="/images/snake-assistant.webp" alt="" width={72} height={72}/></span></>:<><Bot size={18} aria-hidden="true"/> {label}</>}
    </button>
    <dialog ref={dialog} className="snake-dialog snake-chat-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}}>
      <div className="snake-dialog-content">
        <VenomClose className="snake-close" label="Fechar SNAKE AI" onClick={()=>dialog.current?.close()} />
        <header className="snake-dialog-head"><span className="snake-symbol" aria-hidden="true"><Image src="/images/snake-assistant.webp" alt="" width={72} height={72}/></span><div><p className="eyebrow">SNAKE // VENOM AI</p><span className="snake-dialog-status"><i/> {state==="offline"?"CONEXÃO INDISPONÍVEL":state==="typing"?"PROCESSANDO CONTEXTO":"ONLINE · CONSULTORIA DIGITAL"}</span></div></header>
        <h2 id={titleId}>Planeje seu projeto com a SNAKE.</h2>
        <p id={descriptionId} className="snake-intro">A consultora digital da VENOM entende o problema, recomenda caminhos e monta um briefing para o time.</p>
        <div className="snake-conversation" aria-live="polite" aria-busy={state==="typing"}>
          {messages.map((item,index)=><div key={`${item.role}-${index}`} className={`snake-bubble ${item.role}`}><b>{item.role==="assistant"?"SNAKE":"VOCÊ"}</b><p>{item.content}</p></div>)}
          {state==="typing"&&<div className="snake-bubble assistant typing"><b>SNAKE</b><span/><span/><span/></div>}
          <div ref={chatEnd}/>
        </div>
        {messages.length===1&&<div className="snake-quick" aria-label="Sugestões de início">{quickIdeas.map(item=><button key={item} type="button" onClick={()=>sendMessage(item)}><Sparkles size={13}/>{item}</button>)}</div>}
        <form className="snake-composer" onSubmit={event=>{event.preventDefault();sendMessage();}}>
          <label className="sr-only" htmlFor={`${titleId}-input`}>Mensagem para a SNAKE</label>
          <textarea id={`${titleId}-input`} required minLength={2} maxLength={1800} rows={3} value={input} onChange={event=>setInput(event.target.value)} onKeyDown={event=>{if(event.key==="Enter"&&!event.shiftKey){event.preventDefault();sendMessage();}}} placeholder="Conte o que você quer construir…" disabled={state==="typing"}/>
          <div className="snake-composer-actions"><button type="button" className={listening?"is-listening":""} onClick={toggleVoice} aria-label={listening?"Parar gravação":"Gravar áudio"}>{listening?<Square size={16}/>:<Mic size={18}/>}<span>{listening?"Parar gravação":"Gravar áudio"}</span></button><button type="submit" disabled={state==="typing"||input.trim().length<2} aria-label="Enviar mensagem"><Send size={18}/><span>Enviar</span></button></div>
        </form>
        <div className={`snake-feedback ${state}`} role="status"><AudioLines size={15}/><span>{statusMessage||(remaining!==undefined?`${remaining} mensagens disponíveis nesta conversa.`:"Sua conversa é usada apenas para preparar o projeto.")}</span></div>
        {messages.length>2&&<div className="snake-next"><button type="button" onClick={resetConversation}><RotateCcw size={15}/> Nova conversa</button><button type="button" onClick={continueBrief}>Levar contexto para o briefing <ArrowRight size={16}/></button></div>}
      </div>
    </dialog>
  </>;
}
