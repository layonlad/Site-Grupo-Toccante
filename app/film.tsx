"use client";
import { useEffect, useRef } from "react";
import type { FilmItem } from "./gallery";
import films from "./video-media.json";

type FilmMedia = {
  src: string;
  poster: string;
  width: number;
  height: number;
};
const library: Record<string, FilmMedia | undefined> = films;

/**
 * Vídeo com capa. Só baixa quando a pessoa inicia, pausa ao sair da tela (som
 * e bateria) e interrompe outro vídeo que esteja tocando.
 */
export default function Film({
  name,
  label,
  active = true,
}: {
  name: string;
  label: string;
  active?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!active) ref.current?.pause();
  }, [active]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function onPlay() {
      document.querySelectorAll("video").forEach((other) => {
        if (other !== el && !other.muted) other.pause();
      });
    }
    el.addEventListener("play", onPlay);
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              if (
                entry &&
                !entry.isIntersecting &&
                !el.paused &&
                document.fullscreenElement !== el
              )
                el.pause();
            },
            { threshold: 0 },
          )
        : undefined;
    observer?.observe(el);
    return () => {
      el.removeEventListener("play", onPlay);
      observer?.disconnect();
    };
  }, []);
  const media = library[name];
  if (!media) return null;
  return (
    <div
      className="film-frame"
      style={{ aspectRatio: `${media.width} / ${media.height}` }}
    >
      {/* Os vídeos originais não possuem arquivo de legendas. */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        controls
        playsInline
        preload="none"
        poster={media.poster}
        width={media.width}
        height={media.height}
        aria-label={label}
      >
        <source src={media.src} type="video/mp4" />
        <a href={media.src}>Abrir o vídeo</a>
      </video>
    </div>
  );
}

export function FilmGrid({
  items,
  active,
}: {
  items: readonly FilmItem[];
  active?: boolean;
}) {
  return (
    <div className="film-grid">
      {items.map((item) => (
        <figure className="film" key={item.video}>
          <Film name={item.video} label={item.alt} active={active} />
          <figcaption>
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
