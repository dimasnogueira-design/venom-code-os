"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => undefined);
  }, []);

  return (
    <div className={`hero-media ${ended ? "is-ended" : ""}`}>
      <video ref={videoRef} muted playsInline preload="metadata" poster="/media/venom-code-poster.jpg" onEnded={() => setEnded(true)} aria-label="Identidade cinematográfica VENOM CODE">
        <source src="/media/venom-code-hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

