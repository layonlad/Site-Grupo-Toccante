"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { branches, navigation, site, faqs, type Branch } from "./content";
import { useEditorialMotion } from "./editorial-motion";
import { photographs } from "./photographs";

export function Photo({
  name,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 700px) 100vw, 50vw",
}: {
  name: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
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
    />
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
      aria-current={page === href.slice(1) ? "page" : undefined}
    >
      {label}
    </a>
  );
  return (
    <header className="site-header">
      <div className="container header-inner">
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
            Pedir uma proposta <span aria-hidden="true">↗</span>
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
              Fechar <span aria-hidden="true">×</span>
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
              Pedir uma proposta ↗
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
  useEditorialMotion(main, page);
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
      <a
        className="floating-contact"
        href={site.attendance}
        aria-label="Abrir atendimento oficial pelo WhatsApp"
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
      </a>
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
          <a href={site.attendance}>Atendimento pelo WhatsApp ↗</a>
          {site.socials.map(([label, handle]) => (
            <a
              key={handle}
              href={`https://www.instagram.com/${handle}/`}
              aria-label={`Instagram ${label}`}
            >
              @{handle}
            </a>
          ))}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Grupo Toccante</p>
        <Link prefetch={false} href="/privacidade">Privacidade</Link>
        <a href="#conteudo">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
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
}: {
  eyebrow: string;
  title: string;
  text?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className={`page-heading${image ? " photo-masthead" : ""}`}>
      <div className="container masthead-grid">
        <div className="masthead-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {text && <p className="lead">{text}</p>}
        </div>
        {image && (
          <div className="masthead-image">
            <Photo
              name={image}
              alt={imageAlt}
              priority
              sizes="(max-width: 650px) 100vw, 40vw"
            />
          </div>
        )}
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
    <section className="section">
      <div className="container faq-layout">
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          title="Vamos começar com clareza."
        />
        <div className="faq-list">
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
    <section className={`cta-section${branch ? ` theme-${branch.key}` : ""}`}>
      <div className="container cta-inner">
        <div>
          <p className="eyebrow">Orçamento</p>
          <h2>Vamos planejar sua celebração?</h2>
          <p>
            Conte o que você imagina. Cuidamos das próximas escolhas juntos.
          </p>
        </div>
        <a
          className="button button-light"
          href={branch ? `/contato?vertente=${branch.key}` : "/contato"}
        >
          Pedir uma proposta <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
export function BranchIndex() {
  const [active, setActive] = useState<Branch>(branches[0]);
  return (
    <div className="branch-index">
      <div className="index-plate" data-branch={active.key} aria-hidden="true">
        <Photo
          key={active.key}
          name={active.image}
          alt=""
          sizes="(max-width: 700px) 1px, 42vw"
        />
      </div>
      <div className="index-list">
        {branches.map((b) => (
          <a
            key={b.key}
            href={`/${b.key}`}
            className={`index-link theme-${b.key}`}
            onFocus={() => setActive(b)}
            onPointerEnter={(e) => {
              if (e.pointerType !== "touch") setActive(b);
            }}
          >
            <div className="index-thumb">
              <Photo name={b.image} alt="" sizes="90px" />
            </div>
            <div>
              <h3>{b.label}</h3>
              <p>{b.description}</p>
            </div>
            <span className="index-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
