import Link from "next/link";
import { BranchIndex, CTA, FAQ, Photo, Shell } from "./components";
import { portfolio } from "./content";

const featured = ["cerimonial-lapela", "buffet-doces", "musical-violino"];
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
      <section className="cinema" aria-labelledby="home-title">
        <div className="cinema-scene">
          <Photo
            name="decoracao-mesa-bolo"
            alt="Mesa de casamento sob flores e folhagens suspensas, com o bolo ao centro."
            priority
            sizes="(max-width: 700px) 100vw, 75vw"
          />
        </div>
        <div className="container cinema-inner">
          <div className="cinema-copy">
            <p className="eyebrow">Casamentos e eventos</p>
            <h1 id="home-title">
              A emoção
              <br />
              <em>por inteiro.</em>
            </h1>
            <p className="cinema-intro">
              Música, buffet, decoração e cerimonial para celebrar a sua
              história.
            </p>
            <div className="actions">
              <Link prefetch={false} className="button" href="/contato">
                Planejar meu evento <span aria-hidden="true">↗</span>
              </Link>
              <Link prefetch={false} className="text-link" href="/portfolio">
                Ver portfólio <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="cinema-foot">
            <a href="#vertentes">
              <span aria-hidden="true">↓</span> Conheça as vertentes
            </a>
            <span>Toccante Decoração</span>
          </div>
        </div>
      </section>
      <section className="section house-intro">
        <div className="container house-grid">
          <div>
            <p className="eyebrow">O Grupo Toccante</p>
            <h2>
              O cuidado em <br />
              cada detalhe.
            </h2>
          </div>
          <div className="house-story">
            <p>
              Da primeira conversa à chegada dos convidados, reunimos quem toca,
              quem prepara a mesa, quem compõe os ambientes e quem conduz a
              cerimônia.
            </p>
            <p>
              Sensibilidade, excelência, amor e respeito orientam nossa forma de
              servir.
            </p>
            <div className="actions">
              <Link prefetch={false} className="text-link" href="/quem-somos">
                Nossa história ↗
              </Link>
              <Link prefetch={false} className="text-link" href="/equipe">
                Conheça a equipe ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section chapters" id="vertentes">
        <div className="container">
          <div className="section-heading-row">
            <h2>As quatro vertentes.</h2>
            <p>Escolha a área que deseja conhecer.</p>
          </div>
          <BranchIndex />
        </div>
      </section>
      <section className="section collection">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Portfólio</p>
              <h2>Da cerimônia à mesa.</h2>
            </div>
            <Link prefetch={false} className="text-link" href="/portfolio">
              Ver todos os registros ↗
            </Link>
          </div>
          <div className="collection-grid">
            {featured.map((name) => {
              const item = portfolio.find((p) => p.image === name)!;
              return (
                <a
                  className="collection-work"
                  href={`/portfolio?vertente=${item.branch}`}
                  key={name}
                >
                  <div className="work-frame">
                    <Photo
                      name={item.image}
                      alt={item.alt}
                      sizes="(max-width: 650px) 92vw, 40vw"
                    />
                  </div>
                  <h3>
                    {item.title} <span aria-hidden="true">↗</span>
                  </h3>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section experience-section">
        <div className="container experience-grid">
          <div>
            <p className="eyebrow">Experiência Completa Toccante</p>
            <h2>
              Quando tudo conversa,
              <br />
              <em>você vive o momento.</em>
            </h2>
            <p className="lead">
              Quatro vertentes em um planejamento integrado. Do primeiro
              encontro aos últimos acordes.
            </p>
            <Link prefetch={false} className="text-link" href="/contato">
              Construir minha experiência ↗
            </Link>
          </div>
          <ul className="principles">
            {principles.map(([title, text]) => (
              <li key={title}>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FAQ />
      <CTA />
    </Shell>
  );
}
