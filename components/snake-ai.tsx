"use client";

import { Bot, X, ArrowRight } from "lucide-react";
import { useRef } from "react";

export function SnakeAI() {
  const dialog = useRef<HTMLDialogElement>(null);
  return <>
    <button className="button ghost" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}><Bot size={18} aria-hidden="true" /> SNAKE AI</button>
    <dialog ref={dialog} className="snake-dialog" aria-labelledby="snake-title" aria-describedby="snake-description" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="snake-dialog-content">
        <button className="snake-close" aria-label="Fechar SNAKE AI" onClick={() => dialog.current?.close()}><X size={22} /></button>
        <Bot className="snake-symbol" size={32} aria-hidden="true" />
        <p className="eyebrow">VENOM CODE · EM PREPARAÇÃO</p>
        <h2 id="snake-title">SNAKE AI</h2>
        <p id="snake-description">Nosso assistente está em desenvolvimento. Enquanto isso, conte sua ideia diretamente para o time VENOM CODE.</p>
        <a className="button primary" href="#contato" onClick={() => dialog.current?.close()}>Conversar sobre meu projeto <ArrowRight size={18} aria-hidden="true" /></a>
      </div>
    </dialog>
  </>;
}
