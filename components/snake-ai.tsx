"use client";

import { AudioLines, Bot, X, ArrowRight, Mic, Square, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type VoiceEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type VoiceRecognition = {
  lang: string; continuous: boolean; interimResults: boolean;
  start: () => void; stop: () => void;
  onresult: ((event: VoiceEvent) => void) | null;
  onerror: (() => void) | null; onend: (() => void) | null;
};
type VoiceRecognitionConstructor = new () => VoiceRecognition;

const quickIdeas = ["Quero vender online","Preciso automatizar minha operação","Tenho uma ideia de sistema"];

export function SnakeAI({ label = "SNAKE AI", floating = false }: { label?: string; floating?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [idea,setIdea] = useState("");
  const [interest,setInterest] = useState("Ainda não tenho certeza");
  const [listening,setListening] = useState(false);
  const [voiceMessage,setVoiceMessage] = useState("");
  const recognition = useRef<VoiceRecognition | null>(null);
  useEffect(()=>()=>recognition.current?.stop(),[]);
  function toggleVoice() {
    if (listening) { recognition.current?.stop(); return; }
    const voiceWindow = window as typeof window & { SpeechRecognition?:VoiceRecognitionConstructor; webkitSpeechRecognition?:VoiceRecognitionConstructor };
    const Recognition = voiceWindow.SpeechRecognition || voiceWindow.webkitSpeechRecognition;
    if (!Recognition) { setVoiceMessage("Entrada por voz não está disponível neste navegador."); return; }
    const instance = new Recognition();
    recognition.current = instance;
    instance.lang = "pt-BR"; instance.continuous = false; instance.interimResults = false;
    instance.onresult = event => {
      const transcript = event.results[event.results.length - 1]?.[0]?.transcript?.trim();
      if (transcript) setIdea(previous => previous ? `${previous} ${transcript}` : transcript);
      setVoiceMessage("Áudio convertido em texto. Você pode revisar antes de continuar.");
    };
    instance.onerror = () => { setListening(false); setVoiceMessage("Não consegui ouvir. Verifique a permissão do microfone e tente novamente."); };
    instance.onend = () => setListening(false);
    setVoiceMessage("Ouvindo… fale sobre o seu projeto."); setListening(true); instance.start();
  }
  function continueBrief(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dialog.current?.close();
    window.dispatchEvent(new CustomEvent("venom-brief",{detail:{interest,message:`Ideia inicial (briefing guiado): ${idea.trim()}`}}));
    document.getElementById("contato")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
    document.querySelector<HTMLInputElement>('[name="name"]')?.focus({preventScroll:true});
  }
  return <>
    <button className={floating ? "snake-float" : "button ghost"} aria-haspopup="dialog" aria-label={floating ? "Falar com a SNAKE AI" : undefined} onClick={() => dialog.current?.showModal()}>
      {floating ? <><span className="snake-float-label">{label}</span><span className="snake-float-mark"><Image src="/images/snake-assistant.webp" alt="" width={72} height={72} /></span></> : <><Bot size={18} aria-hidden="true" /> {label}</>}
    </button>
    <dialog ref={dialog} className="snake-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="snake-dialog-content">
        <button className="snake-close" aria-label="Fechar SNAKE AI" onClick={() => dialog.current?.close()}><X size={22} /></button>
        <div className="snake-dialog-head"><span className="snake-symbol" aria-hidden="true"><Image src="/images/snake-assistant.webp" alt="" width={72} height={72} /></span><div><p className="eyebrow">SNAKE // VENOM AI</p><span className="snake-dialog-status"><i/> ONLINE · MODO GUIADO</span></div></div>
        <h2 id={titleId}>Transforme o problema em um ponto de partida.</h2>
        <p id={descriptionId}>Escreva ou fale sobre o que você quer construir. A SNAKE organiza o contexto e prepara o próximo passo com o time.</p>
        <div className="snake-quick" aria-label="Sugestões de briefing">{quickIdeas.map(item=><button key={item} type="button" onClick={()=>setIdea(item)}><Sparkles size={13}/>{item}</button>)}</div>
        <form className="snake-brief-form" onSubmit={continueBrief}>
          <label>O que você quer construir?<textarea required minLength={10} maxLength={2000} rows={5} value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Conte o problema, a ideia ou o resultado que você busca..." /></label>
          <div className="snake-voice"><button type="button" className={listening?"is-listening":""} onClick={toggleVoice}>{listening?<Square size={16}/>:<Mic size={18}/>} {listening?"Parar gravação":"Falar por áudio"}</button><span><AudioLines size={16}/>{voiceMessage||"Sua fala será convertida em texto para você revisar."}</span></div>
          <label>Qual caminho parece mais próximo?<select value={interest} onChange={e=>setInterest(e.target.value)}>{["Ainda não tenho certeza","Site ou landing page","E-commerce","Sistema sob medida","Automação e IA","Branding e identidade","Performance e crescimento"].map(i=><option key={i}>{i}</option>)}</select></label>
          <button className="button primary" type="submit">Continuar meu briefing <ArrowRight size={18} aria-hidden="true" /></button>
          <small>Você revisa e envia seus dados no próximo passo.</small>
        </form>
      </div>
    </dialog>
  </>;
}
