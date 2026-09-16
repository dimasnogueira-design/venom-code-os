"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu"><button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X /> : <Menu />}</button>{open && <nav><a onClick={() => setOpen(false)} href="#servicos">Serviços</a><a onClick={() => setOpen(false)} href="#cases">Cases</a><a onClick={() => setOpen(false)} href="#processo">Processo</a><a onClick={() => setOpen(false)} href="#contato">Iniciar projeto</a></nav>}</div>;
}

