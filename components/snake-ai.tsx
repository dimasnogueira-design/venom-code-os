"use client";

import { Bot, X, ArrowRight } from "lucide-react";
import { useId, useRef, useState } from "react";

export function SnakeAI({ label = "SNAKE AI" }: { label?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [idea,setIdea] = useState("");
  const [interest,setInterest] = useState("Ainda não tenho certeza");
  function continueBrief(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dialog.current?.close();
    window.dispatchEvent(new CustomEvent("venom-brief",{detail:{interest,message:`Ideia inicial (briefing guiado): ${idea.trim()}`}}));
    document.getElementById("contato")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
    document.querySelector<HTMLInputElement>('[name="name"]')?.focus({preventScroll:true});
  }
  return <>
    <button className="button ghost" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><Bot size={18} aria-hidden="true" /> {label}</button>
    <dialog ref={dialog} className="snake-dialog" aria-labelledby={titleId} aria-describedby={descriptionId} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="snake-dialog-content">
        <button className="snake-close" aria-label="Fechar SNAKE AI" onClick={() => dialog.current?.close()}><X size={22} /></button>
        <Bot className="snake-symbol" size={32} aria-hidden="true" />
        <p className="eyebrow">SNAKE / BRIEFING GUIADO</p>
        <h2 id={titleId}>Sua ideia começa aqui.</h2>
        <p id={descriptionId}>A conversa com IA está em preparação. Por enquanto, este roteiro leva seu contexto ao formulário para análise do time.</p>
        <form className="snake-brief-form" onSubmit={continueBrief}>
          <label>O que você quer construir?<textarea required minLength={10} maxLength={2000} rows={4} value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Tenho uma escola de inglês e quero captar mais alunos..." /></label>
          <label>Qual caminho parece mais próximo?<select value={interest} onChange={e=>setInterest(e.target.value)}>{["Ainda não tenho certeza","Site ou landing page","E-commerce","Sistema sob medida","Automação e IA","Branding e identidade","Performance e crescimento"].map(i=><option key={i}>{i}</option>)}</select></label>
          <button className="button primary" type="submit">Continuar meu briefing <ArrowRight size={18} aria-hidden="true" /></button>
          <small>Você revisa e envia seus dados no próximo passo.</small>
        </form>
      </div>
    </dialog>
  </>;
}
