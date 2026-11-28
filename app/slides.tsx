"use client";
import { useEffect, useRef, useState } from "react";
import { Photo } from "./components";
import type { Slide } from "./gallery";

/** Fotos sobrepostas; só as já alcançadas (e a próxima) são baixadas. */
export function Slides({
  slides,
  current,
  loaded,
  sizes,
}: {
  slides: readonly Slide[];
  current: number;
  /** Quantas fotos podem ser baixadas. */
  loaded: number;
  sizes: string;
}) {
  return slides.map((slide, index) => {
    const shown = index === current;
    if (!shown && index >= loaded) return null;
    return (
      <div
        key={slide.image}
        className={`carousel-slide${shown ? " is-current" : ""}${slide.studio ? " is-studio" : ""}`}
        aria-hidden={!shown}
        style={slide.studio && { background: slide.studio.backdrop }}
      >
        <div
          className="carousel-photo"
          style={
            slide.studio && {
              width: slide.studio.width,
              left: slide.studio.left,
            }
          }
        >
          <Photo
            name={slide.image}
            alt={slide.alt}
            priority={index === 0}
            focus={slide.focus}
            sizes={sizes}
          />
        </div>
      </div>
    );
  });
}

/**
 * Ritmo da troca: pausa com o mouse ou o foco em cima, com a aba oculta ou
 * pelo botão, e não anda sozinho quando a pessoa prefere menos movimento.
 */
export function useRotation(interval: number) {
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(true);
  // As demais fotos só começam a baixar depois da primeira.
  const [ready, setReady] = useState(false);
  const held = useRef(false);
  // Só começa depois que a página terminou de carregar, para que a primeira
  // foto chegue antes de qualquer outra.
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onChange() {
      setPlaying(!query.matches);
    }
    onChange();
    let timers: number[] = [];
    function afterLoad() {
      timers = [
        window.setTimeout(() => setReady(true), 1500),
        window.setTimeout(() => setStarted(true), 3500),
      ];
    }
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });
    query.addEventListener("change", onChange);
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("load", afterLoad);
      query.removeEventListener("change", onChange);
    };
  }, []);
  useEffect(() => {
    if (!playing || !started) return;
    const timer = window.setInterval(() => {
      if (!held.current && !document.hidden) setTick((value) => value + 1);
    }, interval);
    return () => window.clearInterval(timer);
  }, [playing, started, tick, interval]);
  const hold = {
    onMouseEnter: () => {
      held.current = true;
    },
    onMouseLeave: () => {
      held.current = false;
    },
    onFocus: (event: React.FocusEvent) => {
      held.current = event.target.matches(":focus-visible");
    },
    onBlur: () => {
      held.current = false;
    },
  };
  return { tick, setTick, playing, setPlaying, ready, setReady, hold };
}

export function PlayToggle({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="carousel-toggle"
      onClick={onToggle}
      aria-label={playing ? "Pausar fotos" : "Alternar fotos"}
    >
      <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
        <path
          d={playing ? "M2 1h3v10H2zM7 1h3v10H7z" : "M2 1l9 5-9 5z"}
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
