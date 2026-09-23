"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { IconButton } from "@/components/ui/icon-button";

const links = [["#servicos", "Serviços"], ["#portfolio", "Portfólio"], ["#processo", "Processo"], ["#snake", "SNAKE"], ["#contato", "Iniciar projeto"]] as const;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const surface = useRef<HTMLDialogElement>(null);
  const restoreFocus = useRef(true);
  const menuId = useId();
  const menuTitleId = useId();

  const close = useCallback((restore = true) => {
    restoreFocus.current = restore;
    surface.current?.close();
    setOpen(false);
  }, []);

  const navigate = useCallback((href: string) => {
    close(false);
    if (!href.startsWith("#")) return;
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    const hadTabIndex = target.hasAttribute("tabindex");
    if (!hadTabIndex) target.tabIndex = -1;
    requestAnimationFrame(() => {
      target.focus({ preventScroll: true });
      if (!hadTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    });
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const dialog = surface.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => dialog.querySelector<HTMLAnchorElement>("a[href]")?.focus());
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(true); return; }
      if (event.key !== "Tab") return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      document.removeEventListener("keydown", keydown);
    };
  }, [close, open]);

  return <div className="mobile-menu">
    <IconButton ref={trigger} className="mobile-menu-trigger" onClick={() => { restoreFocus.current = true; setOpen(true); }} aria-expanded={open} aria-controls={menuId} label="Abrir menu">
      <Menu aria-hidden="true" />
    </IconButton>
    <dialog ref={surface} className="mobile-menu-surface" id={menuId} aria-labelledby={menuTitleId} onCancel={event => { event.preventDefault(); close(true); }} onClose={() => { setOpen(false); if (restoreFocus.current) requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true })); }}>
      <IconButton className="mobile-menu-close" onClick={() => close(true)} label="Fechar menu"><X aria-hidden="true" /></IconButton>
      <p id={menuTitleId}>VENOM CODE <span>{"// MENU"}</span></p>
      <nav aria-label="Navegação principal no celular">
        {links.map(([href, label], index) => <a key={href} onClick={() => navigate(href)} href={href}><i>{String(index + 1).padStart(2, "0")}</i><span>{label}</span></a>)}
      </nav>
      <small>STRATEGY · DESIGN · CODE · AI</small>
    </dialog>
  </div>;
}
