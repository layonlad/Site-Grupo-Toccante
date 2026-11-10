"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  BranchIndex,
  CTA,
  FAQ,
  PageHeading,
  Photo,
  SectionHeading,
  Shell,
} from "./components";
import { branches, people, portfolio, site, type Branch } from "./content";
import ContactForm from "./contact-form";
import MusicalMedia from "./musical-media";

import Home from "./home";

function BranchPage({ branch: b }: { branch: Branch }) {
  return (
    <Shell page={b.key}>
      <section className={`branch-hero theme-${b.key}`}>
        <div className="container branch-hero-grid">
          <div className="branch-hero-copy">
            <p className="eyebrow">{b.name}</p>
            <h1>{b.headline}</h1>
            <p className="lead">{b.description}</p>
            <div className="actions">
              <a className="button" href={`/contato?vertente=${b.key}`}>
                Pedir uma proposta ↗
              </a>
              <a
                className="text-link"
                href={
                  b.key === "musica"
                    ? "#midia-musical"
                    : b.key === "cerimonial"
                      ? "#galeria"
                      : "#servicos"
                }
              >
                {b.key === "musica"
                  ? "Fotos e vídeos ↓"
                  : b.key === "cerimonial"
                    ? "Ver fotos ↓"
                    : "Explore a vertente ↓"}
              </a>
            </div>
          </div>
          <div className="chapter-cover">
            <Photo name={b.image} alt={b.alt} priority />
          </div>
        </div>
      </section>
      <section id="servicos" className="section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="O que fazemos"
              title={
                b.key === "cerimonial"
                  ? "Organização para celebrar com presença."
                  : b.key === "musica"
                    ? "Cada momento, uma intenção."
                    : b.key === "buffet"
                      ? "Sabores que fazem parte da memória."
                      : "Ambientes que contam a sua história."
              }
            />
            <p>{b.intro}</p>
          </div>
          <div className="service-grid">
            {b.services.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-soft process-section">
        <div className="container process-layout">
          <SectionHeading
            eyebrow="Da conversa à celebração"
            title="O cuidado começa antes."
          />
          <ol className="process-grid">
            {b.steps.map(([title, text], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {b.key === "musica" ? (
        <MusicalMedia originals={b.gallery} />
      ) : (
        b.gallery.length > 0 && (
          <section className="section" id="galeria">
            <div className="container">
              <div className="section-heading-row">
                <SectionHeading
                  eyebrow={
                    b.key === "cerimonial"
                      ? "Toccante Cerimonial"
                      : "Acontece de verdade"
                  }
                  title={
                    b.key === "cerimonial"
                      ? "Nos bastidores da celebração."
                      : "Um olhar para o nosso trabalho."
                  }
                />
                <a className="text-link" href={`/portfolio?vertente=${b.key}`}>
                  Ver portfólio ↗
                </a>
              </div>
              <div
                className={`branch-gallery count-${b.gallery.length}${b.key === "cerimonial" ? " cerimonial-gallery" : ""}`}
              >
                {b.gallery.map((name) => {
                  const item = portfolio.find((p) => p.image === name);
                  return (
                    <figure key={name}>
                      <Photo
                        name={name}
                        alt={item?.alt || b.alt}
                        sizes="(max-width: 549px) 100vw, (max-width: 900px) 50vw, 33vw"
                      />
                      {b.key === "cerimonial" && (
                        <figcaption>{item?.title}</figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </div>
          </section>
        )
      )}
      {b.key !== "cerimonial" && (
        <section className="section section-soft">
          <div className="container split-layout">
            <Photo
              className={b.teamImage.includes("equipe") ? "team-photo" : ""}
              name={b.teamImage}
              alt={
                b.teamImage.includes("equipe")
                  ? `Equipe ${b.name}`
                  : b.key === "musica"
                    ? "Saxofonista durante apresentação"
                    : "Arranjo de flores brancas na cerimônia"
              }
            />
            <div>
              <SectionHeading
                eyebrow={
                  b.key === "decoracao"
                    ? "O cuidado na composição"
                    : "Pessoas e cuidado"
                }
                title={b.teamTitle}
                text={b.teamText}
              />
              <Link prefetch={false} className="text-link" href="/equipe">
                Conheça o grupo ↗
              </Link>
            </div>
          </div>
        </section>
      )}
      <FAQ items={b.faq} />
      <CTA branch={b} />
    </Shell>
  );
}
function About() {
  return (
    <Shell page="quem-somos">
      <PageHeading
        image="decoracao-flores-corredor"
        imageAlt="Flores brancas junto aos bancos da cerimônia."
        eyebrow="Nossa essência"
        title="Um grupo. Muitas formas de tocar uma história."
        text="O Grupo Toccante reúne Música, Buffet, Decoração e Cerimonial com sensibilidade, organização e propósito."
      />
      <section className="section">
        <div className="container story-film">
          <div>
            <SectionHeading
              eyebrow="O que nos move"
              title="Celebrar também é uma forma de cuidar."
            />
            <p>
              Nossa atuação é guiada por princípios cristãos e pelo compromisso
              de servir com excelência, amor e respeito. Ética e sensibilidade
              fazem parte da maneira como acolhemos cada história.
            </p>
            <p>
              A integração das quatro vertentes aproxima as escolhas, o
              planejamento e as equipes. Tudo para acompanhar a celebração com
              atenção aos detalhes e às pessoas.
            </p>
            <Link prefetch={false} className="text-link" href="/equipe">
              As pessoas por trás do grupo ↗
            </Link>
          </div>
          <figure className="institutional-film">
            <video
              controls
              playsInline
              muted
              preload="none"
              poster="/media/abertura-grupo-toccante.webp"
              width="1920"
              height="1080"
              aria-label="Abertura institucional. Animação silenciosa da marca Grupo Toccante."
            >
              <source
                src="/media/abertura-grupo-toccante.mp4"
                type="video/mp4"
              />
              <a href="/media/abertura-grupo-toccante.mp4">
                Abrir o vídeo da marca
              </a>
            </video>
            <figcaption>Abertura institucional do Grupo Toccante</figcaption>
          </figure>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Nossa forma de servir"
            title="Cuidado que se revela na prática."
          />
          <div className="values-grid">
            {[
              [
                "Sensibilidade",
                "Escutar e respeitar o que torna cada celebração única.",
              ],
              [
                "Excelência",
                "Planejar e executar com responsabilidade e atenção.",
              ],
              ["Respeito", "Servir com amor, ética e cuidado com as pessoas."],
            ].map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Quatro vertentes"
            title="Uma experiência conectada."
          />
          <BranchIndex />
        </div>
      </section>
      <CTA />
    </Shell>
  );
}
function Team() {
  return (
    <Shell page="equipe">
      <PageHeading
        image="equipe-buffet"
        imageAlt="Equipe do buffet reunida no salão do evento."
        eyebrow="Nossa equipe"
        title="O cuidado tem pessoas por trás."
        text="Profissionais que conectam planejamento, sensibilidade e presença em cada celebração."
      />
      <section className="section team-intro">
        <div className="container">
          <div className="people-grid">
            {people.map((p) => (
              <article key={p.name}>
                <p className="eyebrow">{p.role}</p>
                <h2>{p.name}</h2>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Trabalho em conjunto"
            title="Cada especialidade faz parte do todo."
          />
          <div className="team-sectors">
            {[
              {
                image: "equipe-buffet",
                name: "Buffet",
                text: "Cozinha, serviço e coordenação, com atenção à experiência de receber.",
              },
              {
                image: "musical-teclado",
                name: "Musical",
                text: "Vozes e instrumentos em sintonia com os momentos da cerimônia.",
              },
              {
                image: "cerimonial-retrato-equipe",
                name: "Cerimonial",
                alt: "Profissional do Grupo Toccante em uniforme do cerimonial ao ar livre.",
                text: "Planejamento, acolhimento e acompanhamento dos bastidores.",
              },
            ].map((t) => (
              <article key={t.name}>
                <Photo
                  name={t.image}
                  className={t.image.includes("equipe") ? "team-photo" : ""}
                  alt={t.alt || `Profissionais da vertente ${t.name}`}
                />
                <h3>{t.name}</h3>
                <p>{t.text}</p>
              </article>
            ))}
          </div>
          <p className="editorial-note">
            As equipes e a composição de cada serviço são definidas conforme a
            proposta do evento.
          </p>
        </div>
      </section>
      <CTA />
    </Shell>
  );
}
function Portfolio({ initialBranch }: { initialBranch?: string }) {
  const [filter, setFilter] = useState(initialBranch ?? "todos");
  const [selected, setSelected] = useState<(typeof portfolio)[number] | null>(
    null,
  );
  const modal = useRef<HTMLDialogElement>(null);
  const origin = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  const shown =
    filter === "todos"
      ? portfolio
      : portfolio.filter((p) => p.branch === filter);
  function close() {
    modal.current?.close();
    setSelected(null);
    document.body.style.overflow = "";
    origin.current?.focus();
  }
  return (
    <Shell page="portfolio">
      <PageHeading
        image="buffet-doces"
        imageAlt="Detalhe de uma bandeja de doces de casamento."
        eyebrow="Nosso portfólio"
        title="Momentos reais. Detalhes que permanecem."
        text="Um olhar para a música, os sabores, os ambientes e as pessoas que participam das nossas celebrações."
      />
      <section className="section portfolio-section">
        <div className="container">
          <div
            className="filter-list"
            role="group"
            aria-label="Filtrar portfólio"
          >
            {[["todos", "Todos"], ...branches.map((b) => [b.key, b.label])].map(
              ([key, label]) => (
                <button
                  aria-pressed={filter === key}
                  onClick={() => setFilter(key)}
                  key={key}
                >
                  {label}
                </button>
              ),
            )}
          </div>
          <p className="result-count" aria-live="polite">
            {shown.length === 0
              ? "Ainda não há fotografias nesta vertente."
              : `${shown.length} registros ${filter === "todos" ? "no portfólio" : "de " + branches.find((b) => b.key === filter)?.label}`}
          </p>
          <div className="portfolio-grid">
            {shown.map((p) => (
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
                  <Photo
                    name={p.image}
                    alt={p.alt}
                    sizes="(max-width:650px) 100vw, (max-width:1000px) 50vw, 33vw"
                  />
                  <span className="expand-photo" aria-hidden="true">
                    Ampliar ↗
                  </span>
                </button>
                <figcaption>
                  <p className="eyebrow">
                    {branches.find((b) => b.key === p.branch)?.name}
                  </p>
                  <h2>{p.title}</h2>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
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
          Fechar ×
        </button>
        {selected && (
          <figure>
            <Photo
              name={selected.image}
              alt={selected.alt}
              priority
              sizes="90vw"
            />
            <figcaption>{selected.title}</figcaption>
          </figure>
        )}
      </dialog>
      <CTA />
    </Shell>
  );
}
function Contact({ initialBranch }: { initialBranch?: string }) {
  return (
    <Shell page="contato">
      <PageHeading
        image="cerimonial-orientacao"
        imageAlt="Cerimonialista com a prancheta conversa na entrada do evento."
        eyebrow="Contato e orçamento"
        title="Toda celebração começa com uma conversa."
        text="Conte um pouco sobre o seu evento. Vamos preparar juntos as próximas escolhas."
      />
      <section className="section contact-section">
        <div className="container contact-layout">
          <ContactForm initialBranch={initialBranch} />
          <aside className="contact-aside">
            <p className="eyebrow">Atendimento Toccante</p>
            <h2>Vamos encontrar o melhor caminho.</h2>
            <p>
              Selecione uma ou mais vertentes. Não precisa ter todos os detalhes
              definidos para começar.
            </p>
            <ol>
              <li>Conte o que já está planejando.</li>
              <li>Revise e copie seu resumo.</li>
              <li>
                Abra o atendimento e envie pelo WhatsApp ao especialista
                indicado.
              </li>
            </ol>
            <a className="text-link" href={site.attendance}>
              Prefiro conversar diretamente ↗
            </a>
            <hr />
            <p className="small-text">
              O atendimento oficial encaminha você a um especialista da equipe.
              O formulário não envia mensagens automaticamente.
            </p>
          </aside>
        </div>
      </section>
    </Shell>
  );
}
function Privacy() {
  return (
    <Shell page="privacidade">
      <PageHeading
        eyebrow="Privacidade"
        title="Seus dados, com clareza."
        text="Como funciona o formulário de orçamento deste site."
      />
      <section className="section">
        <div className="container reading-column">
          <h2>Enquanto você preenche</h2>
          <p>
            Nome, telefone, e-mail opcional e informações do evento são usados
            para montar o resumo da sua solicitação. Os dados do formulário
            ficam somente nesta página enquanto ela está aberta. Este formulário
            não os envia a um banco de dados, não os inclui no endereço da
            página e não os grava no armazenamento do navegador.
          </p>
          <h2>Ao continuar o atendimento</h2>
          <p>
            Você pode copiar o resumo para a área de transferência e abrir a
            página oficial de atendimento. O especialista é indicado pelo canal
            de atendimento. A mensagem só é enviada quando você a cola e
            confirma o envio no WhatsApp.
          </p>
          <h2>Outros serviços</h2>
          <p>
            A página de atendimento e o WhatsApp têm funcionamento e práticas
            próprios. Consulte as informações disponibilizadas nesses serviços
            antes de compartilhar dados. O acesso e os registros técnicos de
            hospedagem seguem as configurações da plataforma que hospeda este
            site.
          </p>
          <h2>O que informar</h2>
          <p>
            Compartilhe apenas os dados necessários ao orçamento. Evite incluir
            documentos, dados de pagamento ou informações pessoais de convidados
            no campo de observações.
          </p>
          <h2>Dúvidas sobre o atendimento</h2>
          <p>
            Para esclarecer o uso das informações após o envio, fale com a
            equipe pelo{" "}
            <a href={site.attendance}>canal oficial de atendimento</a>.
          </p>
        </div>
      </section>
    </Shell>
  );
}
export function MissingPage() {
  return (
    <Shell page="404">
      <section className="section missing-page">
        <div className="container">
          <p className="eyebrow">Página não encontrada · 404</p>
          <h1>Vamos encontrar o caminho de volta.</h1>
          <p>
            Esta página não está disponível. Conheça as quatro vertentes ou
            converse com a equipe.
          </p>
          <div className="actions">
            <Link prefetch={false} className="button" href="/">
              Voltar ao início
            </Link>
            <Link prefetch={false} className="text-link" href="/contato">
              Falar com a equipe ↗
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
export default function Site({
  page,
  initialBranch,
}: {
  page: string;
  initialBranch?: string;
}) {
  const b = branches.find((b) => b.key === page);
  if (b) return <BranchPage branch={b} />;
  switch (page) {
    case "inicio":
      return <Home />;
    case "quem-somos":
      return <About />;
    case "equipe":
      return <Team />;
    case "portfolio":
      return <Portfolio initialBranch={initialBranch} />;
    case "contato":
      return <Contact initialBranch={initialBranch} />;
    case "privacidade":
      return <Privacy />;
    default:
      return <MissingPage />;
  }
}
