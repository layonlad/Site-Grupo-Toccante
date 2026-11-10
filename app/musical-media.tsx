"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Photo, SectionHeading } from "./components";
import { portfolio } from "./content";

const newPhotos = [
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
          <div className="music-gallery">
            {[...newPhotos, ...existing].map(([name, title, alt]) => (
              <figure key={name}>
                <div className="music-frame">
                  <Photo
                    name={name}
                    alt={alt}
                    sizes="(max-width: 550px) 92vw, (max-width: 900px) 45vw, 380px"
                  />
                </div>
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
          <p className="music-empty">Ainda não há vídeos publicados.</p>
        </div>
      </div>
    </section>
  );
}
