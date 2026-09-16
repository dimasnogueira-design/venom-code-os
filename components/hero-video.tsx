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
      <video ref={videoRef} muted playsInline preload="auto" poster="/media/venom-code-poster.png" onEnded={() => setEnded(true)} aria-label="Identidade cinematográfica VENOM CODE">
        <source src="/media/venom-code-hero-v2.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
