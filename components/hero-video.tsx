"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export function HeroVideo({ header, children }: { header: ReactNode; children: ReactNode }) {
  const [phase, setPhase] = useState<"static" | "welcome" | "intro" | "boot" | "ready">("static");
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const startup = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const deadline = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const bootTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const active = useRef(false);

  const finish = useCallback((focus = false, cinematic = false) => {
    active.current = false;
    clearTimeout(startup.current);
    clearTimeout(deadline.current);
    clearTimeout(bootTimer.current);
    videoRef.current?.pause();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (cinematic && !reduce) {
      setPhase("boot");
      bootTimer.current = setTimeout(() => {
        setPhase("ready");
        if (focus) requestAnimationFrame(() => contentRef.current?.focus({ preventScroll: true }));
      }, 2800);
      return;
    }
    setPhase("ready");
    if (focus) requestAnimationFrame(() => contentRef.current?.focus({ preventScroll: true }));
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!motion.matches && !window.location.hash && window.scrollY < 80) setPhase("welcome");
    const preference = () => { if (motion.matches) finish(); };
    const visibility = () => { if (document.hidden && active.current) finish(); };
    const scroll = () => { if (window.scrollY > 80) finish(); };
    motion.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("scroll", scroll, { passive: true });
    const video = videoRef.current;
    return () => {
      active.current = false;
      clearTimeout(startup.current);
      clearTimeout(deadline.current);
      clearTimeout(bootTimer.current);
      motion.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("scroll", scroll);
      video?.pause();
    };
  }, [finish]);

  useEffect(() => {
    if (phase !== "ready") return;
    const release = setTimeout(() => {
      videoRef.current?.removeAttribute("src");
      videoRef.current?.load();
    }, 700);
    return () => clearTimeout(release);
  }, [phase]);

  function start() {
    const video = videoRef.current;
    if (!video) return;
    active.current = true;
    setMuted(false);
    setPhase("intro");
    video.src = "/media/hero-02-video.mp4";
    video.muted = false;
    video.volume = 1;
    // Call play in the click handler to retain the browser's user activation.
    void video.play().catch(() => { if (active.current) finish(true); });
    startup.current = setTimeout(() => finish(true, true), 10000);
    deadline.current = setTimeout(() => finish(true, true), 25000);
    requestAnimationFrame(() => skipRef.current?.focus({ preventScroll: true }));
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  const intro = phase === "intro";
  const welcome = phase === "welcome";
  return <div className="hero-experience" data-phase={phase}>
    <div className="hero-navigation" inert={intro || welcome}>{header}</div>
    <section className="hero" id="top" aria-label="VENOM CODE">
      <div className="hero-media" aria-hidden="true">
        <picture>
          <source media="(max-width: 900px)" srcSet="/media/hero-static-01-mobile.webp" />
          <Image className="hero-poster" src="/media/hero-static-01.webp" alt="" fill priority unoptimized sizes="100vw" />
        </picture>
        <video ref={videoRef} playsInline preload="none" poster="/media/hero-static-01.webp" tabIndex={-1} disablePictureInPicture
          onPlaying={() => clearTimeout(startup.current)}
          onEnded={() => finish(true, true)}
          onError={() => { if (active.current) finish(true, true); }} />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div ref={contentRef} className="hero-content shell" tabIndex={-1} inert={intro || welcome}>{children}</div>
      {welcome && <div className="intro-welcome shell">
        <p className="eyebrow">VENOM CODE</p>
        <h2>Presença que<br /><em>você sente.</em></h2>
        <p>Uma abertura de 10 segundos. Com som.</p>
        <button className="button primary" onClick={start}><span aria-hidden="true">▶</span> Começar experiência</button>
        <button className="intro-enter" onClick={() => finish(true, true)}>Entrar sem intro <span aria-hidden="true">↗</span></button>
      </div>}
      {intro && <div className="intro-controls">
        <button className="intro-sound" onClick={toggleSound} aria-label={muted ? "Ativar som" : "Silenciar"}>{muted ? "Som desligado" : "Som ligado"}</button>
        <button ref={skipRef} className="intro-skip" onClick={() => finish(true, true)}>Pular intro <span aria-hidden="true">↗</span></button>
      </div>}
      {phase === "boot" && <div className="venom-boot" role="status" aria-label="Inicializando a interface VENOM CODE">
        <div className="venom-boot-scan" aria-hidden="true" />
        <div className="venom-boot-log"><b>VENOM OS // INITIALIZING</b><span>01 · VISUAL CORE CONNECTED</span><span>02 · NAVIGATION ASSEMBLED</span><span>03 · SNAKE NEURAL LINK ONLINE</span><span>04 · ONE PAGE EXPERIENCE READY</span></div>
        <div className="venom-boot-mark" aria-hidden="true">VENOM<span>CODE</span></div>
        <div className="venom-boot-progress" aria-hidden="true"><i /></div>
      </div>}
      <a className="hero-index" href="#servicos" aria-label="Conhecer os serviços"><span>EXPLORE</span><i /></a>
    </section>
  </div>;
}
