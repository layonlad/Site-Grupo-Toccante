"use client";
import Link from "./link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { branches, navigation, site, faqs, type Branch } from "./content";
import { useMotion } from "./motion";
import WhatsAppLink from "./whatsapp-link";
import { photographs } from "./photographs";

export function Photo({
  name,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 700px) 100vw, 50vw",
  focus,
}: {
  name: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  focus?: string;
}) {
  const item = photographs[name];
  if (!item) return null;
  const source = item.files[item.files.length - 1];
  return (
    <img
      className={`photo ${className}`}
      src={source.src}
      srcSet={item.files.map((f) => `${f.src} ${f.width}w`).join(", ")}
      sizes={sizes}
      width={item.width}
      height={item.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      style={focus ? { objectPosition: focus } : undefined}
    />
  );
}
/** Moldura arredondada para fotografias: arco, suave, oval ou círculo. */
export function Frame({
  name,
  alt,
  shape = "soft",
  ratio,
  className = "",
  sizes,
  priority,
  focus,
  parallax,
  reveal = true,
}: {
  name: string;
  alt: string;
  shape?: "soft" | "arch" | "oval" | "round";
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  focus?: string;
  parallax?: number;
  reveal?: boolean;
}) {
  const item = photographs[name];
  if (!item) return null;
  const style = {
    aspectRatio: ratio ?? `${item.width} / ${item.height}`,
  } as CSSProperties;
  return (
    <div
      className={`frame frame-${shape} ${className}`}
      style={style}
      data-reveal={reveal ? "" : undefined}
      data-parallax={parallax}
    >
      <Photo
        name={name}
        alt={alt}
        sizes={sizes}
        priority={priority}
        focus={focus}
      />
    </div>
  );
}
export function Brand() {
  return (
    <Link
      prefetch={false}
      className="brand"
      href="/"
      aria-label="Grupo Toccante — início"
    >
      <img src="/brand.svg" width="48" height="52" alt="" />
      <span>Grupo Toccante</span>
    </Link>
  );
}
function Header({ page }: { page: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const branchesMenu = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);
  function close() {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  }
  useEffect(() => {
    const menu = dialog.current;
    function trapTab(event: KeyboardEvent) {
      if (event.key !== "Tab" || !menu?.open) return;
      const items = menu.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      const first = items[0],
        last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    menu?.addEventListener("keydown", trapTab);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      menu?.removeEventListener("keydown", trapTab);
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const query = window.matchMedia("(min-width:1100px)");
    const onChange = () => {
      if (query.matches) {
        dialog.current?.close();
        setOpen(false);
      }
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    function outside(event: PointerEvent) {
      const menu = branchesMenu.current;
      if (
        menu?.open &&
        event.target instanceof Node &&
        !menu.contains(event.target)
      )
        menu.open = false;
    }
    function escape(event: KeyboardEvent) {
      const menu = branchesMenu.current;
      if (
        event.key === "Escape" &&
        menu?.open &&
        menu.contains(document.activeElement)
      ) {
        menu.open = false;
        menu.querySelector("summary")?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  const navLink = ([label, href]: readonly string[]) => (
    <a
      key={href}
      href={href}
      aria-current={page === href.split("/").at(-1) ? "page" : undefined}
    >
      {label}
    </a>
  );
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          <details className="branch-menu" ref={branchesMenu}>
            <summary>Nossas vertentes</summary>
            <div>{branches.map((b) => navLink([b.label, `/${b.key}`]))}</div>
          </details>
          {navigation.map(navLink)}
          <Link
            prefetch={false}
            className="button button-small"
            href="/contato"
          >
            Pedir uma proposta
          </Link>
        </nav>
        <button
          className="menu-toggle"
          ref={trigger}
          onClick={() => {
            dialog.current?.showModal();
            setOpen(true);
          }}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          Menu <span className="menu-lines" aria-hidden="true" />
        </button>
      </div>
      <dialog
        id="mobile-menu"
        className="mobile-menu"
        ref={dialog}
        aria-labelledby="menu-title"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onPointerDown={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="mobile-menu-content">
          <div className="menu-top">
            <h2 id="menu-title">Grupo Toccante</h2>
            <button
              className="close-button"
              onClick={close}
              aria-label="Fechar menu"
            >
              Fechar
            </button>
          </div>
          <nav aria-label="Navegação móvel">
            <Link
              prefetch={false}
              href="/"
              onClick={close}
              aria-current={page === "inicio" ? "page" : undefined}
            >
              Início
            </Link>
            <p className="eyebrow">Nossas vertentes</p>
            {branches.map((b) => navLink([b.name, `/${b.key}`]))}
            <div className="menu-divider" />
            {navigation.map(navLink)}
            <Link
              prefetch={false}
              className="button"
              href="/contato"
              onClick={close}
            >
              Pedir uma proposta
            </Link>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
export function Shell({
  page,
  children,
}: {
  page: string;
  children: React.ReactNode;
}) {
  const main = useRef<HTMLElement>(null);
  useMotion(main, page);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header page={page} />
      <main id="conteudo" ref={main} data-page={page} tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsAppLink
        className="floating-contact"
        label="Falar com a equipe pelo WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
          <path
            d="M20 11.5a8 8 0 0 1-8 8 9 9 0 0 1-3.5-.8L4 20l1.3-4.4a8 8 0 1 1 14.7-4.1Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        <span>WhatsApp</span>
      </WhatsAppLink>
    </>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Brand />
          <p>
            Quatro formas de cuidar.
            <br />
            Uma celebração com significado.
          </p>
        </div>
        <div>
          <h2>Conheça o grupo</h2>
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </div>
        <div>
          <h2>Nossas vertentes</h2>
          {branches.map((b) => (
            <a key={b.key} href={`/${b.key}`}>
              {b.name}
            </a>
          ))}
        </div>
        <div>
          <h2>Vamos conversar</h2>
          <WhatsAppLink>Atendimento pelo WhatsApp</WhatsAppLink>
          <a href={site.instagram.url} aria-label="Instagram do Grupo Toccante">
            @{site.instagram.handle}
          </a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Grupo Toccante</p>
        <Link prefetch={false} href="/privacidade">
          Privacidade
        </Link>
        <a href="#conteudo">Voltar ao topo</a>
      </div>
    </footer>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div
      className={`section-heading${center ? " is-center" : ""}`}
      data-reveal=""
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p className="lead">{text}</p>}
    </div>
  );
}
export function PageHeading({
  eyebrow,
  title,
  text,
  image,
  imageAlt = "",
  shape = "arch",
  ratio = "4 / 5",
  focus,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  shape?: "soft" | "arch" | "oval" | "round";
  ratio?: string;
  focus?: string;
}) {
  return (
    <section className={`page-heading${image ? " photo-masthead" : ""}`}>
      <div className="container">
        <div className="masthead-panel">
          <div className="masthead-copy hero-enter">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            {text && <p className="lead">{text}</p>}
          </div>
          {image && (
            <div className="masthead-image hero-enter-photo">
              <Frame
                name={image}
                alt={imageAlt}
                shape={shape}
                ratio={ratio}
                focus={focus}
                priority
                reveal={false}
                sizes="(max-width: 760px) 80vw, 420px"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export function FAQ({
  items = faqs,
}: {
  items?: readonly (readonly [string, string])[];
}) {
  return (
    <section className="section faq-section">
      <div className="container faq-layout">
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          title="Vamos começar com clareza."
        />
        <div className="faq-list" data-reveal-group="">
          {items.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function CTA({ branch }: { branch?: Branch }) {
  return (
    <section className="cta-section">
      <div className="container">
        <div
          className={`cta-panel${branch ? ` theme-${branch.key}` : ""}`}
          data-reveal="zoom"
        >
          <img
            className="cta-mark"
            src="/brand.svg"
            width="64"
            height="70"
            alt=""
          />
          <p className="eyebrow">Orçamento</p>
          <h2>Vamos planejar sua celebração?</h2>
          <p>
            Conte o que você imagina. Cuidamos das próximas escolhas juntos.
          </p>
          <a
            className="button button-light"
            href={branch ? `/contato?vertente=${branch.key}` : "/contato"}
          >
            Pedir uma proposta
          </a>
        </div>
      </div>
    </section>
  );
}
export function BranchIndex() {
  return (
    <div className="branch-cards" data-reveal-group="">
      {branches.map((b) => (
        <a
          key={b.key}
          href={`/${b.key}`}
          className={`branch-card theme-${b.key}`}
        >
          <span className="branch-number">{b.number}</span>
          <Frame
            name={b.image}
            alt=""
            shape="arch"
            ratio="4 / 5"
            reveal={false}
            sizes="(max-width: 640px) 70vw, (max-width: 1100px) 40vw, 260px"
          />
          <h3>{b.label}</h3>
          <p>{b.description}</p>
          <span className="pill">Conhecer</span>
        </a>
      ))}
    </div>
  );
}
