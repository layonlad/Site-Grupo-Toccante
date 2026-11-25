"use client";
import type { Slide } from "./gallery";
import { PlayToggle, Slides, useRotation } from "./slides";

/** Carrossel em arco, com pausa e escolha da foto. */
export default function Carousel({
  slides,
  label,
}: {
  slides: readonly Slide[];
  label: string;
}) {
  const { tick, setTick, playing, setPlaying, ready, setReady, hold } =
    useRotation(4500);
  const current = tick % slides.length;
  return (
    <div
      className="carousel"
      role="group"
      aria-roledescription="carrossel"
      aria-label={label}
      {...hold}
    >
      <div className="frame frame-arch carousel-stage">
        <Slides
          slides={slides}
          current={current}
          loaded={ready ? slides.length : 1}
          sizes="(max-width: 760px) 100vw, 520px"
        />
      </div>
      <div className="carousel-controls">
        <PlayToggle playing={playing} onToggle={() => setPlaying(!playing)} />
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            className="carousel-dot"
            aria-label={`Foto ${index + 1} de ${slides.length}`}
            aria-current={index === current ? "true" : undefined}
            onClick={() => {
              setReady(true);
              setTick(index);
            }}
          />
        ))}
      </div>
    </div>
  );
}
