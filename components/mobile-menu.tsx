"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export function MobileMenu() {
  const [open,setOpen]=useState(false);
  const button=useRef<HTMLButtonElement>(null);
  const menuId=useId();
  useEffect(()=>{
    if(!open)return;
    const escape=(event:KeyboardEvent)=>{if(event.key==="Escape"){setOpen(false);button.current?.focus();}};
    document.addEventListener("keydown",escape);
    return()=>document.removeEventListener("keydown",escape);
  },[open]);
  return <div className="mobile-menu"><button ref={button} onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls={menuId} aria-label={open?"Fechar menu":"Abrir menu"}>{open?<X/>:<Menu/>}</button>{open&&<nav id={menuId} aria-label="Navegação principal no celular">{[["#servicos","Serviços"],["#cases","Cases"],["#processo","Processo"],["#snake","SNAKE"],["#contato","Iniciar projeto"]].map(([href,label])=><a key={href} onClick={()=>setOpen(false)} href={href}>{label}</a>)}</nav>}</div>;
}
