"use client";
import Link from "./link";
import { useEffect, useState } from "react";
import {
  BranchIndex,
  CTA,
  FAQ,
  Frame,
  PageHeading,
  SectionHeading,
  Shell,
} from "./components";
import { branches, people, portfolio, site, type Branch } from "./content";
import ContactForm from "./contact-form";
import Film, { FilmGrid } from "./film";
import {
  branchFilms,
  couplePhotos,
  teamGroups,
  testimonials,
  type Testimonial,
} from "./gallery";
import PhotoGallery from "./photo-gallery";
import { photographs } from "./photographs";
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
  const films = branchFilms[b.key];
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
      {films && (
        <section className="section" aria-labelledby="videos-title">
          <div className="container">
            <div className="section-heading is-center" data-reveal="">
              <p className="eyebrow">{b.name}</p>
              <h2 id="videos-title">O momento em vídeo.</h2>
            </div>
            <FilmGrid items={films} />
          </div>
        </section>
      )}
      {b.key !== "cerimonial" && (
        <section className="section">
          <div className="container split-layout">
            <Frame
              name={b.teamImage}
              shape={b.key === "decoracao" ? "arch" : "soft"}
              ratio={b.key === "decoracao" ? "4 / 5" : undefined}
              sizes="(max-width: 767px) 92vw, 46vw"
              alt={b.teamAlt}
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
        image="decoracao-cerimonia-lago"
        imageAlt="Cadeiras e flores em um deck com vista para o lago."
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
        image="equipe-cerimonial-grupo"
        imageAlt="Quatro profissionais do Cerimonial Toccante sorriem juntas."
        shape="soft"
        ratio="5 / 4"
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
      {teamGroups.map((group) => (
        <section
          className="section team-group"
          key={group.key}
          aria-labelledby={`equipe-${group.key}`}
        >
          <div className="container">
            <div className="section-heading is-center" data-reveal="">
              <p className="eyebrow">Nossa equipe</p>
              <h2 id={`equipe-${group.key}`}>{group.title}</h2>
              {group.text && <p className="lead">{group.text}</p>}
            </div>
            {group.rows.map((row) => {
              const ratios = row.map((photo) => {
                const item = photographs[photo.image]!;
                return item.width / item.height;
              });
              const total = ratios.reduce((sum, ratio) => sum + ratio, 0);
              return (
                <div
                  className="team-row"
                  key={row[0].image}
                  data-reveal-group=""
                  style={{ maxWidth: `${(total * 28).toFixed(1)}rem` }}
                >
                  {row.map((photo, i) => (
                    <figure
                      key={photo.image}
                      className={ratios[i] > 1 ? "is-wide" : undefined}
                      style={{ flexGrow: ratios[i] }}
                    >
                      <Frame
                        name={photo.image}
                        alt={photo.alt}
                        reveal={false}
                        sizes={`(max-width: 640px) 92vw, ${Math.round(
                          (ratios[i] / total) * Math.min(1280, total * 448),
                        )}px`}
                      />
                      {photo.caption && (
                        <figcaption>{photo.caption}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <section className="section">
        <div className="container">
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
function Couples() {
  return (
    <Shell page="noivos">
      <PageHeading
        image="noivos-noiva-buque"
        imageAlt="Noiva de vestido de renda sorri com o buquê sob a luz do entardecer."
        focus="50% 20%"
        eyebrow="Noivos"
        title="Histórias que tivemos a alegria de celebrar."
        text="Retratos de quem viveu o seu dia ao lado do Grupo Toccante."
      />
      <section className="section portfolio-section">
        <div className="container">
          <PhotoGallery
            items={couplePhotos}
            className="couple-grid"
            captions={false}
            sizes="(max-width:640px) 46vw, (max-width:1100px) 31vw, 400px"
          />
          <p className="section-link">
            <Link prefetch={false} className="button" href="/depoimentos">
              Ler os depoimentos
            </Link>
          </p>
        </div>
      </section>
      <CTA />
    </Shell>
  );
}
function TestimonialCard({ item }: { item: Testimonial }) {
  const media = Boolean(item.photo || item.video);
  return (
    <article
      className={`testimonial${item.quote ? " has-quote" : ""}${media ? " has-media" : ""}${item.video ? "" : " is-dark"}`}
      data-reveal=""
    >
      {media && (
        <div className="testimonial-media">
          {item.photo && (
            <Frame
              name={item.photo.image}
              alt={item.photo.alt}
              ratio={item.photo.ratio}
              reveal={false}
              sizes={
                item.video
                  ? "(max-width: 640px) 46vw, 300px"
                  : "(max-width: 860px) 88vw, 560px"
              }
            />
          )}
          {item.video && (
            <Film name={item.video.video} label={item.video.alt} />
          )}
        </div>
      )}
      <div className="testimonial-copy">
        <p className="eyebrow">
          {item.quote ? "Depoimento" : "Depoimento em vídeo"}
        </p>
        <h2>{item.couple}</h2>
        {item.quote && (
          <blockquote>
            {item.quote.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </blockquote>
        )}
      </div>
    </article>
  );
}
function Testimonials() {
  return (
    <Shell page="depoimentos">
      <PageHeading
        image="depoimento-felipe-samara"
        imageAlt="Felipe e Samara em retrato no dia do casamento."
        focus="50% 22%"
        eyebrow="Depoimentos"
        title="O que fica depois da festa."
        text="Palavras e vídeos de casais que celebraram com o Grupo Toccante."
      />
      <section className="section">
        <div className="container testimonial-list">
          {testimonials.map((item) => (
            <TestimonialCard item={item} key={item.couple} />
          ))}
        </div>
      </section>
      <CTA />
    </Shell>
  );
}
function Portfolio({ initialBranch }: { initialBranch?: string }) {
  const [filter, setFilter] = useState(initialBranch ?? "todos");
  const shown =
    filter === "todos"
      ? portfolio
      : portfolio.filter((p) => p.branch === filter);
  return (
    <Shell page="portfolio">
      <PageHeading
        image="buffet-frios-camadas"
        imageAlt="Suporte de madeira com frutas e frios em uma mesa de recepção."
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
          <PhotoGallery
            items={shown}
            className="portfolio-grid"
            eyebrow={(item) =>
              branches.find(
                (b) =>
                  b.key ===
                  portfolio.find((p) => p.image === item.image)?.branch,
              )?.name
            }
          />
        </div>
      </section>
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
  // Nas páginas estáticas o servidor não conhece a consulta: lê da URL.
  const [chosen, setChosen] = useState(initialBranch);
  useEffect(() => {
    function readBranch() {
      const key = new URLSearchParams(window.location.search).get("vertente");
      setChosen(branches.find((branch) => branch.key === key)?.key);
    }
    readBranch();
  }, []);
  const b = branches.find((b) => b.key === page);
  if (b) return <BranchPage branch={b} />;
  switch (page) {
    case "inicio":
      return <Home />;
    case "quem-somos":
      return <About />;
    case "equipe":
      return <Team />;
    case "noivos":
      return <Couples />;
    case "depoimentos":
      return <Testimonials />;
    case "portfolio":
      return <Portfolio key={chosen} initialBranch={chosen} />;
    case "contato":
      return <Contact key={chosen} initialBranch={chosen} />;
    case "privacidade":
      return <Privacy />;
    default:
      return <MissingPage />;
  }
}
