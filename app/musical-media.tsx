"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Frame, SectionHeading } from "./components";
import { portfolio } from "./content";

const newPhotos = [
  [
    "musical-quarteto",
    "Quarteto em cerimônia",
    "Quatro músicos do Grupo Toccante, com voz, violão, teclado e violino, diante de um arco de flores.",
  ],
  [
    "musical-violino-ao-ar-livre",
    "Violino ao ar livre",
    "Violinista movimenta o arco durante uma apresentação ao ar livre.",
  ],
  [
    "musical-voz-jardim",
    "Voz no jardim",
    "Cantora de vestido rosa canta ao microfone em um jardim.",
  ],
  [
    "musical-teclado-ao-ar-livre",
    "Teclado ao ar livre",
    "Tecladista de camisa branca toca ao ar livre.",
  ],
  [
    "musical-flauta",
    "Flauta transversal",
    "Flautista toca junto ao microfone em uma apresentação externa.",
  ],
  [
    "musical-voz-e-violino",
    "Voz e violino",
    "Cantora ao microfone com acompanhamento de violino ao fundo.",
  ],
  [
    "musical-formacao-externa",
    "Cordas em conjunto",
    "Violinista sentada com outros músicos e estantes de partitura ao ar livre.",
  ],
] as const;

const tabs = ["fotos", "videos"] as const;
type Tab = (typeof tabs)[number];

export default function MusicalMedia({
  originals,
}: {
  originals: readonly string[];
}) {
  const [active, setActive] = useState<Tab>("fotos");
  const buttons = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({});
  useEffect(() => {
    function readTab() {
      setActive(window.location.hash === "#videos" ? "videos" : "fotos");
    }
    readTab();
    window.addEventListener("hashchange", readTab);
    return () => window.removeEventListener("hashchange", readTab);
  }, []);

  function select(tab: Tab, focus = false) {
    setActive(tab);
    window.history.replaceState(window.history.state, "", `#${tab}`);
    if (focus) buttons.current[tab]?.focus();
  }
  function navigate(event: KeyboardEvent<HTMLButtonElement>, tab: Tab) {
    let next: Tab;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowLeft":
        next = tab === "fotos" ? "videos" : "fotos";
        break;
      case "Home":
        next = "fotos";
        break;
      case "End":
        next = "videos";
        break;
      default:
        return;
    }
    event.preventDefault();
    select(next, true);
  }
  const existing = originals.flatMap((name) => {
    const record = portfolio.find((item) => item.image === name);
    return record ? [[name, record.title, record.alt] as const] : [];
  });
  return (
    <section id="midia-musical" className="section music-media">
      <div className="container">
        <SectionHeading
          center
          eyebrow="Toccante Musical"
          title="Apresentações musicais"
        />
        <div
          className="filter-list music-tabs"
          role="tablist"
          aria-label="Mídia musical"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              ref={(el) => {
                buttons.current[tab] = el;
              }}
              id={tab}
              role="tab"
              type="button"
              aria-selected={active === tab}
              aria-controls={`painel-${tab}`}
              tabIndex={active === tab ? 0 : -1}
              onClick={() => select(tab)}
              onKeyDown={(event) => navigate(event, tab)}
            >
              {tab === "fotos" ? "Fotos" : "Vídeos"}
            </button>
          ))}
        </div>
        <div
          id="painel-fotos"
          role="tabpanel"
          aria-labelledby="fotos"
          hidden={active !== "fotos"}
          tabIndex={0}
        >
          <div className="masonry music-gallery" data-reveal-group="">
            {[
              ...newPhotos,
              ...existing.filter(([n]) => n !== "musical-quarteto"),
            ].map(([name, title, alt]) => (
              <figure key={name}>
                <Frame
                  name={name}
                  alt={alt}
                  reveal={false}
                  sizes="(max-width: 549px) 46vw, (max-width: 1100px) 31vw, 290px"
                />
                <figcaption>{title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div
          id="painel-videos"
          role="tabpanel"
          aria-labelledby="videos"
          hidden={active !== "videos"}
          tabIndex={0}
        >
          <figure className="music-video">
            <div className="frame frame-soft">
              {/* O vídeo original não possui arquivo de legendas. */}
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                controls
                playsInline
                preload="none"
                poster="/media/musical-apresentacao-poster-900.webp"
                width="720"
                height="1280"
                aria-label="Vídeo do Toccante Musical em um casamento ao ar livre."
              >
                <source
                  src="/media/musical-apresentacao.mp4"
                  type="video/mp4"
                />
                <a href="/media/musical-apresentacao.mp4">Abrir o vídeo</a>
              </video>
            </div>
            <figcaption>
              <p className="eyebrow">Toccante Musical</p>
              <h3>A música em uma cerimônia ao ar livre.</h3>
              <p>
                Um registro da equipe em um casamento, da preparação do espaço
                ao momento dos noivos.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
