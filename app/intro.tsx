"use client";
import { useEffect, useRef, useState } from "react";

/** Abertura com o logo motion: exibida uma vez por sessão, pode ser pulada. */
export default function Intro() {
  const [state, setState] = useState<"playing" | "leaving" | "done">("playing");
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("tg-intro") === "1";
      sessionStorage.setItem("tg-intro", "1");
    } catch {
      /* armazenamento indisponível: a abertura apenas toca normalmente */
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skip = requestAnimationFrame(() => setState("done"));
      return () => cancelAnimationFrame(skip);
    }
    video.current?.play().catch(() => setState("leaving"));
    const limit = window.setTimeout(() => setState("leaving"), 5200);
    return () => window.clearTimeout(limit);
  }, []);
  useEffect(() => {
    if (state !== "leaving") return;
    const end = window.setTimeout(() => setState("done"), 900);
    return () => window.clearTimeout(end);
  }, [state]);
  if (state === "done") return null;
  return (
    <div
      className={`intro${state === "leaving" ? " is-leaving" : ""}`}
      onClick={() => setState("leaving")}
      aria-hidden="true"
    >
      <video
        ref={video}
        muted
        playsInline
        autoPlay
        preload="auto"
        onTimeUpdate={(e) => {
          if (e.currentTarget.currentTime > 4.3) setState("leaving");
        }}
        onEnded={() => setState("leaving")}
        onError={() => setState("leaving")}
      >
        <source src="/media/abertura-grupo-toccante.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
