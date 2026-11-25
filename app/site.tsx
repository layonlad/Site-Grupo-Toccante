"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  BranchIndex,
  CTA,
  FAQ,
  Frame,
  PageHeading,
  Photo,
  SectionHeading,
  Shell,
} from "./components";
import { branches, people, portfolio, site, type Branch } from "./content";
import ContactForm from "./contact-form";
import MusicalMedia from "./musical-media";
import WhatsAppLink from "./whatsapp-link";

import Home from "./home";

const serviceTitles: Record<string, string> = {
  cerimonial: "Organização para celebrar com presença.",
  musica: "Cada momento, uma intenção.",
  buffet: "Sabores que fazem parte da memória.",
  decoracao: "Ambientes que contam a sua história.",
};
const heroFocus: Record<string, string> = {
  musica: "50% 10%",
  cerimonial: "50% 6%",
  buffet: "50% 60%",
  decoracao: "50% 45%",
};
function BranchPage({ branch: b }: { branch: Branch }) {
  const few = b.gallery.length <= 3;
  return (
    <Shell page={b.key}>
      <section className="branch-hero">
        <div className="container">
          <div className={`branch-panel theme-${b.key}`}>
            <div className="branch-hero-copy hero-enter">
              <p className="eyebrow">{b.name}</p>
              <h1>{b.headline}</h1>
              <p className="lead">{b.description}</p>
              <div className="actions">
                <a className="button" href={`/contato?vertente=${b.key}`}>
                  Pedir uma proposta
                </a>
                <a
                  className="text-link"
                  href={
                    b.key === "musica"
                      ? "#midia-musical"
                      : b.gallery.length > 0
                        ? "#galeria"
                        : "#servicos"
                  }
                >
                  {b.key === "musica" ? "Fotos e vídeos" : "Ver fotos"}
                </a>
              </div>
            </div>
            <div className="chapter-cover hero-enter-photo">
              <Frame
                name={b.image}
                alt={b.alt}
                shape="arch"
                ratio="4 / 5"
                focus={heroFocus[b.key]}
                priority
                reveal={false}
                parallax={0.04}
                sizes="(max-width: 760px) 78vw, 440px"
              />
              <span className="chapter-number" aria-hidden="true">
                {b.number}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section id="servicos" className="section">
        <div className="container">
          <div className="section-heading-row" data-reveal="">
            <div className="section-heading">
              <p className="eyebrow">O que fazemos</p>
              <h2>{serviceTitles[b.key]}</h2>
            </div>
            <p>{b.intro}</p>
          </div>
          <div className="service-grid" data-reveal-group="">
            {b.services.map(([title, text], i) => (
              <article key={title}>
                <span aria-hidden="true">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section process-section">
        <div className="container">
          <div className="process-panel">
            <SectionHeading
              center
              eyebrow="Da conversa à celebração"
              title="O cuidado começa antes."
            />
            <ol className="process-grid" data-reveal-group="">
              {b.steps.map(([title, text], i) => (
                <li key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      {b.key === "musica" ? (
        <MusicalMedia originals={b.gallery} />
      ) : (
        b.gallery.length > 0 && (
          <section className="section" id="galeria">
            <div className="container">
              <div className="section-heading-row" data-reveal="">
                <div className="section-heading">
                  <p className="eyebrow">
                    {b.key === "cerimonial"
                      ? "Toccante Cerimonial"
                      : "Acontece de verdade"}
                  </p>
                  <h2>
                    {b.key === "cerimonial"
                      ? "Nos bastidores da celebração."
                      : "Um olhar para o nosso trabalho."}
                  </h2>
                </div>
                <a
                  className="button button-outline"
                  href={`/portfolio?vertente=${b.key}`}
                >
                  Ver portfólio
                </a>
              </div>
              <div
                className={`masonry branch-gallery${few ? " is-few" : ""}`}
                data-reveal-group=""
              >
                {b.gallery.map((name) => {
                  const item = portfolio.find((p) => p.image === name);
                  return (
                    <figure key={name}>
                      <Frame
                        name={name}
                        alt={item?.alt || b.alt}
                        reveal={false}
                        ratio={few ? "4 / 3" : undefined}
                        sizes="(max-width: 549px) 46vw, (max-width: 1100px) 31vw, 290px"
                      />
                      {item?.title && <figcaption>{item.title}</figcaption>}
                    </figure>
                  );
                })}
              </div>
            </div>
          </section>
        )
      )}
      {b.key !== "cerimonial" && (
        <section className="section">
          <div className="container split-layout">
            <Frame
              name={b.teamImage}
              shape={b.teamImage.includes("equipe") ? "soft" : "arch"}
              ratio={b.teamImage.includes("equipe") ? undefined : "4 / 5"}
              sizes="(max-width: 767px) 92vw, 46vw"
              alt={
                b.teamImage.includes("equipe")
                  ? `Equipe ${b.name}`
                  : b.key === "musica"
                    ? "Saxofonista durante apresentação"
                    : "Arranjo de flores brancas na cerimônia"
              }
            />
            <div data-reveal="">
              <div className="section-heading">
                <p className="eyebrow">
                  {b.key === "decoracao"
                    ? "O cuidado na composição"
                    : "Pessoas e cuidado"}
                </p>
                <h2>{b.teamTitle}</h2>
                <p className="lead">{b.teamText}</p>
              </div>
              <Link prefetch={false} className="text-link" href="/equipe">
                Conheça o grupo
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
        image="decoracao-mesa-bolo"
        imageAlt="Mesa de bolo sob flores e folhagens suspensas."
        focus="50% 50%"
        eyebrow="Nossa essência"
        title="Um grupo. Muitas formas de tocar uma história."
        text="O Grupo Toccante reúne Música, Buffet, Decoração e Cerimonial com sensibilidade, organização e propósito."
      />
      <section className="section">
        <div className="container story-film">
          <div data-reveal="">
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
              As pessoas por trás do grupo
            </Link>
          </div>
          <figure className="institutional-film" data-reveal="zoom">
            <video
              playsInline
              muted
              loop
              autoPlay
              preload="metadata"
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
      <section className="section">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Nossa forma de servir"
            title="Cuidado que se revela na prática."
          />
          <div className="values-grid" data-reveal-group="">
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
            center
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
        shape="soft"
        ratio="1280 / 580"
        eyebrow="Nossa equipe"
        title="O cuidado tem pessoas por trás."
        text="Profissionais que conectam planejamento, sensibilidade e presença em cada celebração."
      />
      <section className="section team-intro">
        <div className="container">
          <div className="people-grid">
            {people.map((p) => (
              <article key={p.name} data-reveal="">
                <p className="eyebrow">{p.role}</p>
                <h2>{p.name}</h2>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Trabalho em conjunto"
            title="Cada especialidade faz parte do todo."
          />
          <div className="team-sectors" data-reveal-group="">
            {[
              {
                image: "buffet-salgados-tabua",
                name: "Buffet",
                alt: "Profissional do Buffet Toccante serve tábuas de salgados.",
                focus: "50% 10%",
                text: "Cozinha, serviço e coordenação, com atenção à experiência de receber.",
              },
              {
                image: "musical-quarteto",
                name: "Musical",
                alt: "Quatro músicos do Grupo Toccante diante de um arco de flores.",
                focus: "50% 70%",
                text: "Vozes e instrumentos em sintonia com os momentos da cerimônia.",
              },
              {
                image: "cerimonial-retrato-equipe",
                name: "Cerimonial",
                alt: "Profissional do Grupo Toccante em uniforme do cerimonial ao ar livre.",
                focus: "50% 20%",
                text: "Planejamento, acolhimento e acompanhamento dos bastidores.",
              },
            ].map((t) => (
              <article key={t.name}>
                <Frame
                  name={t.image}
                  shape="arch"
                  ratio="4 / 5"
                  focus={t.focus}
                  reveal={false}
                  alt={t.alt}
                  sizes="(max-width: 767px) 80vw, 340px"
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
        image="buffet-frios-camadas"
        imageAlt="Suporte de bambu com frutas e frios em uma mesa de recepção."
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
          <div className="masonry portfolio-grid">
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
                    sizes="(max-width:650px) 46vw, (max-width:1100px) 31vw, 290px"
                  />
                  <span className="expand-photo" aria-hidden="true">
                    Ampliar
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
        focus="50% 22%"
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
              <li>Revise o resumo do seu pedido.</li>
              <li>
                Envie pelo WhatsApp: você fala com um especialista da nossa
                equipe.
              </li>
            </ol>
            <WhatsAppLink className="text-link">
              Prefiro conversar diretamente
            </WhatsAppLink>
            <hr />
            <p className="small-text">
              Também atendemos por e-mail:{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              Instagram:{" "}
              <a href={site.instagram.url}>@{site.instagram.handle}</a>
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
            Ao clicar em enviar, abrimos o WhatsApp de um especialista da
            equipe, com o resumo já escrito. A mensagem só é enviada quando você
            confirma o envio no WhatsApp. Para distribuir os atendimentos, o
            navegador guarda apenas um número de posição na fila; nenhum dado
            pessoal é guardado.
          </p>
          <h2>Outros serviços</h2>
          <p>
            O WhatsApp tem funcionamento e práticas próprios. Consulte as
            informações disponibilizadas por ele antes de compartilhar dados. O
            acesso e os registros técnicos de hospedagem seguem as configurações
            da plataforma que hospeda este site.
          </p>
          <h2>O que informar</h2>
          <p>
            Compartilhe apenas os dados necessários ao orçamento. Evite incluir
            documentos, dados de pagamento ou informações pessoais de convidados
            no campo de observações.
          </p>
          <h2>Dúvidas sobre o atendimento</h2>
          <p>
            Para esclarecer o uso das informações após o envio, escreva para{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
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
        <div className="container masthead-panel is-plain">
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
              Falar com a equipe
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
