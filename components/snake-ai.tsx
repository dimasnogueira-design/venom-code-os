"use client";

import { Bot, ArrowRight, Mic, Square, Send, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { VenomClose } from "@/components/ui/venom-close";

type VoiceEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type VoiceRecognition = { lang:string; continuous:boolean; interimResults:boolean; start:()=>void; stop:()=>void; onresult:((event:VoiceEvent)=>void)|null; onerror:(()=>void)|null; onend:(()=>void)|null };
type VoiceRecognitionConstructor = new () => VoiceRecognition;
type ChatMessage = { role:"user"|"assistant"; content:string };
type APIResponse = { sessionId?:string; reply?:string; error?:string; code?:string; remaining?:number };

const quickIdeas = ["Quero um site","Quero vender online","Quero automatizar algo","Tenho outra ideia"];
const greeting:ChatMessage = { role:"assistant", content:"Me conta o que você quer construir. Pode explicar do seu jeito." };

export function SnakeAI({ label = "SNAKE AI", floating = false, identityIcon = false }: { label?: string; floating?: boolean; identityIcon?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const conversation = useRef<HTMLDivElement>(null);
  const chatEnd = useRef<HTMLDivElement>(null);
  const composerInput = useRef<HTMLTextAreaElement>(null);
  const shouldFollowConversation = useRef(true);
  const titleId = useId();
  const descriptionId = useId();
  const [messages,setMessages] = useState<ChatMessage[]>([greeting]);
  const [input,setInput] = useState("");
  const [sessionId,setSessionId] = useState("");
  const [state,setState] = useState<"idle"|"typing"|"error"|"limited"|"offline">("idle");
  const [statusMessage,setStatusMessage] = useState("");
  const [,setRemaining] = useState<number>();
  const [listening,setListening] = useState(false);
  const recognition = useRef<VoiceRecognition | null>(null);

  useEffect(()=>{
    setSessionId(localStorage.getItem("venom-snake-session") || "");
    return ()=>recognition.current?.stop();
  },[]);
  useEffect(()=>{
    const field=composerInput.current;
    if(!field)return;
    field.style.height="auto";
    field.style.height=`${Math.min(field.scrollHeight,112)}px`;
  },[input]);
  useEffect(()=>{
    if(!dialog.current?.open||!shouldFollowConversation.current)return;
    const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(()=>chatEnd.current?.scrollIntoView({behavior:reduceMotion?"auto":"smooth",block:"nearest"}));
  },[messages,state]);

  function toggleVoice() {
    if (listening) { recognition.current?.stop(); return; }
    const voiceWindow = window as typeof window & { SpeechRecognition?:VoiceRecognitionConstructor; webkitSpeechRecognition?:VoiceRecognitionConstructor };
    const Recognition = voiceWindow.SpeechRecognition || voiceWindow.webkitSpeechRecognition;
    if (!Recognition) { setStatusMessage("O áudio não está disponível aqui. Você pode continuar digitando normalmente."); return; }
    const instance = new Recognition(); recognition.current = instance;
    instance.lang="pt-BR"; instance.continuous=false; instance.interimResults=false;
    instance.onresult=event=>{ const transcript=event.results[event.results.length-1]?.[0]?.transcript?.trim(); if(transcript)setInput(previous=>previous?`${previous} ${transcript}`:transcript); setStatusMessage("Áudio convertido. Revise e envie quando estiver pronto."); };
    instance.onerror=()=>{ setListening(false); setStatusMessage("Não consegui ouvir agora. Você pode continuar digitando normalmente."); };
    instance.onend=()=>setListening(false);
    setStatusMessage("Ouvindo…"); setListening(true); instance.start();
  }

  async function sendMessage(text=input) {
    const message=text.trim();
    if(message.length<2 || state==="typing") return;
    shouldFollowConversation.current=true;
    setMessages(current=>[...current,{role:"user",content:message}]); setInput(""); setState("typing"); setStatusMessage("");
    try {
      const response=await fetch("/api/venom-ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message,sessionId,website:""})});
      const data:APIResponse=await response.json();
      if(!response.ok) { setState(data.code==="RATE_LIMITED"||data.code==="SESSION_LIMIT"?"limited":data.code?.includes("UNAVAILABLE")?"offline":"error"); setStatusMessage("Não consegui responder agora. Tente novamente em alguns segundos."); return; }
      if(data.sessionId){setSessionId(data.sessionId);localStorage.setItem("venom-snake-session",data.sessionId);}
      if(data.reply)setMessages(current=>[...current,{role:"assistant",content:data.reply!}]);
      track("snake_message_answered",{entry:floating?"floating":"inline",firstMessage:messages.length===1});
      setRemaining(data.remaining); setState("idle");
    } catch { setState("offline"); setStatusMessage("Não consegui responder agora. Tente novamente em alguns segundos."); }
  }

  function resetConversation(){ localStorage.removeItem("venom-snake-session"); setSessionId(""); setMessages([greeting]); setInput(""); setState("idle"); setStatusMessage(""); setRemaining(undefined); }
  function continueBrief(){ const transcript=messages.filter(item=>item.role==="user").map(item=>item.content).join(" "); track("snake_briefing_started",{entry:floating?"floating":"inline"}); dialog.current?.close(); window.dispatchEvent(new CustomEvent("venom-brief",{detail:{interest:"Ainda não tenho certeza",message:`Briefing iniciado com a SNAKE: ${transcript}`}})); document.getElementById("contato")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"}); }

  return <>
    <button className={floating?"snake-float":"button ghost"} aria-haspopup="dialog" aria-label={floating?"Falar com a SNAKE, a IA da Venom Code":undefined} onClick={()=>{track("snake_opened",{entry:floating?"floating":"inline"});shouldFollowConversation.current=true;dialog.current?.showModal();requestAnimationFrame(()=>composerInput.current?.focus());}}>
      {floating?<><span className="snake-float-label">{label}</span><span className="snake-float-mark"><Image src="/images/snake-assistant.webp" alt="" width={72} height={72}/></span></>:<>{identityIcon?<span className="snake-inline-mark" aria-hidden="true"><Image src="/images/snake-assistant.webp" alt="" width={22} height={22}/></span>:<Bot size={18} aria-hidden="true"/>} {label}</>}
    </button>
    <dialog ref={dialog} className="snake-dialog snake-chat-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}}>
      <div className="snake-dialog-content">
        <header className="snake-dialog-head"><span className="snake-symbol" aria-hidden="true"><Image src="/images/snake-assistant.webp" alt="" width={52} height={52}/></span><div className="snake-dialog-identity"><strong>SNAKE</strong><span className="snake-dialog-status"><i/> {state==="offline"?"Indisponível agora":"IA da Venom Code"}</span></div><VenomClose className="snake-close" label="Fechar conversa com a SNAKE" onClick={()=>dialog.current?.close()} /></header>
        <div className="snake-dialog-intro"><h2 id={titleId}>Fale com a <em>SNAKE.</em></h2><p id={descriptionId}>Conte sua ideia. Ela organiza o resto.</p></div>
        <div ref={conversation} className="snake-conversation" aria-live="polite" aria-busy={state==="typing"} onScroll={event=>{const node=event.currentTarget;shouldFollowConversation.current=node.scrollHeight-node.scrollTop-node.clientHeight<72;}}>
          {messages.map((item,index)=><div key={`${item.role}-${index}`} className={`snake-message-row ${item.role}`}>{item.role==="assistant"&&<span className="snake-message-avatar" aria-hidden="true"><Image src="/images/snake-assistant.webp" alt="" width={34} height={34}/></span>}<div className={`snake-bubble ${item.role}`}><p>{item.content}</p></div></div>)}
          {messages.length===1&&<div className="snake-quick" aria-label="Sugestões de início">{quickIdeas.map(item=><button key={item} type="button" onClick={()=>sendMessage(item)}>{item}</button>)}</div>}
          {state==="typing"&&<div className="snake-message-row assistant"><span className="snake-message-avatar" aria-hidden="true"><Image src="/images/snake-assistant.webp" alt="" width={34} height={34}/></span><div className="snake-bubble assistant typing" aria-label="SNAKE está digitando"><span/><span/><span/></div></div>}
          {statusMessage&&<p className={`snake-feedback ${state}`} role="status">{statusMessage}</p>}
          {messages.length>2&&<div className="snake-next"><button type="button" onClick={resetConversation}><RotateCcw size={14}/> Nova conversa</button><button type="button" onClick={continueBrief}>Falar com a equipe <ArrowRight size={15}/></button></div>}
          <div ref={chatEnd}/>
        </div>
        <form className="snake-composer" onSubmit={event=>{event.preventDefault();sendMessage();}}>
          <button type="button" className={`snake-composer-mic ${listening?"is-listening":""}`} onClick={toggleVoice} aria-label={listening?"Parar captura de áudio":"Usar microfone"}>{listening?<Square size={17}/>:<Mic size={19}/>}</button>
          <textarea ref={composerInput} id={`${titleId}-input`} aria-label="Mensagem para a SNAKE" required minLength={2} maxLength={1800} rows={1} value={input} onChange={event=>setInput(event.target.value)} onKeyDown={event=>{if(event.key==="Enter"&&!event.shiftKey){event.preventDefault();sendMessage();}}} placeholder={listening?"Ouvindo…":"Digite uma mensagem…"} disabled={state==="typing"}/>
          <button type="submit" className="snake-composer-send" disabled={state==="typing"||input.trim().length<2} aria-label="Enviar mensagem"><Send size={20}/></button>
        </form>
      </div>
    </dialog>
  </>;
}
