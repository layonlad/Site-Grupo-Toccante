import Link from "./link";
import { BranchIndex, CTA, FAQ, Frame, Shell } from "./components";
import { branches, portfolio } from "./content";
import { BrandLoop } from "./film";
import HeroCollage from "./hero-collage";
import Intro from "./intro";

const featured = [
  ["cerimonial-lapela", "arch", "4 / 5"],
  ["buffet-coxinhas-sorriso", "soft", "1 / 1"],
  ["musical-violao", "arch", "4 / 5"],
  ["decoracao-mesa-bolo-lirios", "soft", "5 / 4"],
] as const;
const principles = [
  [
    "Escuta atenta",
    "Suas preferências orientam as escolhas, do repertório à recepção.",
  ],
  [
    "Planejamento em conjunto",
    "Música, gastronomia, ambientes e cronograma são pensados em diálogo.",
  ],
  [
    "Presença no dia",
    "As equipes acompanham o cortejo, recebem os convidados e cuidam do ritmo da celebração.",
  ],
];

export default function Home() {
  return (
    <Shell page="inicio">
      <Intro />
      <section className="hero" aria-labelledby="home-title">
        <div className="container hero-grid">
          <div className="hero-copy hero-enter">
            <p className="eyebrow">Casamentos e eventos</p>
            <h1 id="home-title">
              A emoção
              <br />
              <em>por inteiro.</em>
            </h1>
            <p className="hero-intro">
              Música, buffet, decoração e cerimonial para celebrar a sua
              história.
            </p>
            <div className="actions">
              <Link prefetch={false} className="button" href="/contato">
                Planejar meu evento
              </Link>
              <Link prefetch={false} className="text-link" href="/portfolio">
                Ver portfólio
              </Link>
            </div>
          </div>
          <HeroCollage />
        </div>
      </section>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy}>
              {branches.map((b) => (
                <span key={b.key}>{b.label}</span>
              ))}
              <span>Celebrar com significado</span>
            </div>
          ))}
        </div>
      </div>
      <section className="section house-intro">
        <div className="container">
          <div className="house-panel" data-reveal="zoom">
            <div className="house-film">
              <BrandLoop label="Animação da marca Grupo Toccante." />
            </div>
            <div className="house-story">
              <p className="eyebrow">O Grupo Toccante</p>
              <h2>O cuidado em cada detalhe.</h2>
              <p className="house-lead">
                Da primeira conversa à chegada dos convidados, reunimos quem
                toca, quem prepara a mesa, quem compõe os ambientes e quem
                conduz a cerimônia.
              </p>
              <p>
                Sensibilidade, excelência, amor e respeito orientam nossa forma
                de servir.
              </p>
              <div className="actions">
                <Link
                  prefetch={false}
                  className="button button-gold"
                  href="/quem-somos"
                >
                  Nossa história
                </Link>
                <Link prefetch={false} className="text-link" href="/equipe">
                  Conheça a equipe
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section chapters" id="vertentes">
        <div className="container">
          <div className="section-heading is-center" data-reveal="">
            <p className="eyebrow">Nossas vertentes</p>
            <h2>As quatro vertentes.</h2>
            <p className="lead">Escolha a área que deseja conhecer.</p>
          </div>
          <BranchIndex />
        </div>
      </section>
      <section className="section collection">
        <div className="container">
          <div className="section-heading-row" data-reveal="">
            <div>
              <p className="eyebrow">Portfólio</p>
              <h2>Da cerimônia à mesa.</h2>
            </div>
            <Link
              prefetch={false}
              className="button button-outline"
              href="/portfolio"
            >
              Ver todos os registros
            </Link>
          </div>
          <div className="collection-grid" data-reveal-group="">
            {featured.map(([name, shape, ratio]) => {
              const item = portfolio.find((p) => p.image === name)!;
              return (
                <a
                  className="collection-work"
                  href={`/portfolio?vertente=${item.branch}`}
                  key={name}
                >
                  <Frame
                    name={item.image}
                    alt={item.alt}
                    shape={shape}
                    ratio={ratio}
                    reveal={false}
                    sizes="(max-width: 650px) 92vw, (max-width: 1000px) 46vw, 300px"
                  />
                  <h3>{item.title}</h3>
                  <p>{branches.find((b) => b.key === item.branch)?.name}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section experience-section">
        <div className="container">
          <div className="experience-panel">
            <div className="experience-copy" data-reveal="">
              <p className="eyebrow">Experiência Completa Toccante</p>
              <h2>
                Quando tudo conversa, <em>você vive o momento.</em>
              </h2>
              <p className="lead">
                Quatro vertentes em um planejamento integrado. Do primeiro
                encontro aos últimos acordes.
              </p>
              <Link prefetch={false} className="button" href="/contato">
                Construir minha experiência
              </Link>
            </div>
            <ul className="principles" data-reveal-group="">
              {principles.map(([title, text], index) => (
                <li key={title}>
                  <span aria-hidden="true">0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <FAQ />
      <CTA />
    </Shell>
  );
}
