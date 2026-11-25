"use client";
import { useEffect, useRef, useState } from "react";
import { Photo } from "./components";
import type { Shot } from "./gallery";

/** Mosaico de fotografias com ampliação acessível. */
export default function PhotoGallery({
  items,
  className = "",
  eyebrow,
  captions = true,
  sizes = "(max-width:650px) 46vw, (max-width:1100px) 31vw, 290px",
}: {
  items: readonly Shot[];
  className?: string;
  eyebrow?: (item: Shot) => string | undefined;
  captions?: boolean;
  sizes?: string;
}) {
  const [selected, setSelected] = useState<Shot | null>(null);
  const modal = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  function close() {
    modal.current?.close();
    setSelected(null);
    document.body.style.overflow = "";
    origin.current?.focus();
  }
  return (
    <>
      <div className={`masonry ${className}`}>
        {items.map((p) => (
          <figure key={p.image}>
            <button
              className="photo-open"
              onClick={(e) => {
                origin.current = e.currentTarget;
                setSelected(p);
                modal.current?.showModal();
                document.body.style.overflow = "hidden";
              }}
              aria-label={`Ampliar fotografia: ${p.title}`}
            >
              <Photo name={p.image} alt={p.alt} sizes={sizes} />
              <span className="expand-photo" aria-hidden="true">
                Ampliar
              </span>
            </button>
            {captions && (
              <figcaption>
                {eyebrow && <p className="eyebrow">{eyebrow(p)}</p>}
                <h2>{p.title}</h2>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      <dialog
        className="photo-dialog"
        ref={modal}
        aria-label={selected?.title || "Fotografia ampliada"}
        onCancel={close}
        onClose={() => {
          document.body.style.overflow = "";
        }}
        onPointerDown={(e) => {
          if (e.target === modal.current) close();
        }}
      >
        <button className="close-button" onClick={close}>
          Fechar
        </button>
        {selected && (
          <figure>
            <Photo
              name={selected.image}
              alt={selected.alt}
              priority
              sizes="90vw"
            />
            {captions && <figcaption>{selected.title}</figcaption>}
          </figure>
        )}
      </dialog>
    </>
  );
}
