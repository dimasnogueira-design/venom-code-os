"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { IconButton } from "@/components/ui/icon-button";

const links = [["#servicos", "Serviços"], ["#cases", "Cases"], ["#processo", "Processo"], ["#snake", "SNAKE"], ["#contato", "Iniciar projeto"]] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const triggerNode = trigger.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () => Array.from(surface.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    requestAnimationFrame(() => focusable()[0]?.focus());
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); return; }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", keydown);
      requestAnimationFrame(() => triggerNode?.focus({ preventScroll: true }));
    };
  }, [close, open]);

  return <div className="mobile-menu">
    <IconButton ref={trigger} className="mobile-menu-trigger" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls={menuId} label={open ? "Fechar menu" : "Abrir menu"}>
      {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
    </IconButton>
    {open && <div ref={surface} className="mobile-menu-surface" id={menuId} role="dialog" aria-modal="true" aria-label="Menu principal">
      <p>VENOM CODE <span>{"// MENU"}</span></p>
      <nav aria-label="Navegação principal no celular">
        {links.map(([href, label], index) => <a key={href} onClick={close} href={href}><i>{String(index + 1).padStart(2, "0")}</i><span>{label}</span></a>)}
      </nav>
      <small>STRATEGY · DESIGN · CODE · AI</small>
    </div>}
  </div>;
}
