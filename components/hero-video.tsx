"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function HeroVideo({ header, children }: { header: ReactNode; children: ReactNode }) {
  // A usable static hero is rendered even without JavaScript.
  const [phase, setPhase] = useState<"static" | "intro" | "ready">("static");
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const finishRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (motion.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "") || window.location.hash || window.scrollY > 80) return;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(startup);
      clearTimeout(deadline);
      video.pause();
      setPhase("ready");
    };
    finishRef.current = finish;
    const playing = () => { clearTimeout(startup); };
    const preference = () => { if (motion.matches) finish(); };
    const visibility = () => { if (document.hidden) finish(); };
    const scroll = () => { if (window.scrollY > 80) finish(); };
    video.addEventListener("ended", finish);
    video.addEventListener("error", finish);
    video.addEventListener("playing", playing);
    motion.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("scroll", scroll, { passive: true });
    const startup = setTimeout(finish, 3000);
    const deadline = setTimeout(finish, 15000);
    setPhase("intro");
    video.muted = true;
    video.src = "/media/hero-01-video.mp4";
    void video.play().catch(finish);
    return () => {
      finished = true;
      clearTimeout(startup);
      clearTimeout(deadline);
      video.removeEventListener("ended", finish);
      video.removeEventListener("error", finish);
      video.removeEventListener("playing", playing);
      motion.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("scroll", scroll);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  useEffect(() => {
    if (phase !== "ready") return;
    const release = setTimeout(() => {
      const video = videoRef.current;
      video?.removeAttribute("src");
      video?.load();
    }, 500);
    return () => clearTimeout(release);
  }, [phase]);

  const intro = phase === "intro";
  function skip() {
    finishRef.current();
    requestAnimationFrame(() => contentRef.current?.focus({ preventScroll: true }));
  }
  return <div className="hero-experience" data-phase={phase}>
    <div className="hero-navigation" inert={intro}>{header}</div>
    <section className="hero" id="top" aria-label="VENOM CODE">
      <div className="hero-media" aria-hidden="true">
        <picture>
          <source media="(max-width: 900px)" srcSet="/media/hero-01-poster-mobile.webp" />
          <Image className="hero-poster" src="/media/hero-01-poster.webp" alt="" fill priority unoptimized sizes="100vw" />
        </picture>
        <video ref={videoRef} muted playsInline preload="none" poster="/media/hero-01-poster.webp" tabIndex={-1} disablePictureInPicture />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div ref={contentRef} className="hero-content shell" tabIndex={-1} inert={intro}>{children}</div>
      {intro && <button className="intro-skip" onClick={skip}>Pular intro <span aria-hidden="true">↗</span></button>}
      <a className="hero-index" href="#servicos" aria-label="Conhecer os serviços"><span>EXPLORE</span><i /></a>
    </section>
  </div>;
}
