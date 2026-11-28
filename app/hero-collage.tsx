"use client";
import { heroSlides } from "./gallery";
import { PlayToggle, Slides, useRotation } from "./slides";

const frames = [
  {
    slides: heroSlides.couples,
    className: "frame-arch collage-main",
    ratio: "4 / 5",
    parallax: 0.04,
    sizes: "(max-width: 760px) 55vw, 440px",
  },
  {
    slides: heroSlides.music,
    className: "frame-arch collage-side",
    ratio: "3 / 4",
    parallax: 0.1,
    sizes: "(max-width: 760px) 40vw, 260px",
  },
  {
    slides: heroSlides.ceremonial,
    className: "frame-round collage-round",
    ratio: "1 / 1",
    parallax: -0.06,
    sizes: "(max-width: 760px) 40vw, 260px",
  },
] as const;
const ring = "Música · Buffet · Decoração · Cerimonial · ";

/** Capa do início: Noivos, Música e Cerimonial trocam de foto em revezamento. */
export default function HeroCollage() {
  const { tick, playing, setPlaying, ready, hold } = useRotation(1800);
  return (
    <div
      className="hero-collage hero-enter-photo"
      role="group"
      aria-label="Fotos de noivos, música e cerimonial"
      {...hold}
    >
      {frames.map((frame, order) => {
        // A cada passo, só uma das três molduras troca de foto.
        const turn = Math.floor((tick + order) / frames.length);
        return (
          <div
            key={frame.className}
            className={`frame ${frame.className}`}
            style={{ aspectRatio: frame.ratio }}
            data-parallax={frame.parallax}
          >
            <Slides
              slides={frame.slides}
              current={turn % frame.slides.length}
              loaded={ready ? turn + 2 : 1}
              sizes={frame.sizes}
            />
          </div>
        );
      })}
      <div className="collage-seal" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <defs>
            <path
              id="seal-path"
              d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0"
            />
          </defs>
          <text>
            <textPath href="#seal-path">{ring + ring}</textPath>
          </text>
        </svg>
        <img src="/brand-mark.webp" width="48" height="52" alt="" />
      </div>
      <div className="carousel-controls collage-controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying(!playing)} />
      </div>
    </div>
  );
}
