export const site = {
  name: "Grupo Toccante",
  origin: "https://grupo-toccante-eventos.layonlad.chatgpt.site",
  attendance: "https://grupotoccanteoficial.github.io/Link.toccante/",
  socials: [
    ["Toccante Musical", "toccantemusical"],
    ["Toccante Buffet e Decoração", "buffetdecoracaotoccante"],
    ["Toccante Cerimonial", "cerimonialtoccante"],
  ],
};
export const navigation = [
  ["Quem somos", "/quem-somos"],
  ["Portfólio", "/portfolio"],
  ["Equipe", "/equipe"],
  ["Contato", "/contato"],
];
const lapela = {
  image: "cerimonial-lapela",
  title: "O último ajuste antes do sim",
  alt: "Cerimonialista prende uma flor à lapela do noivo na igreja.",
};
const cerimonialPhotos = [
  {
    image: "cerimonial-orientacao",
    title: "Orientações na chegada",
    alt: "Cerimonialista com a prancheta do Grupo Toccante conversa com uma mulher na entrada do evento.",
  },
  {
    image: "cerimonial-lista-convidados",
    title: "Conferência da lista",
    alt: "Integrante do cerimonial confere uma lista na prancheta enquanto conversa com duas pessoas.",
  },
  lapela,
  {
    image: "cerimonial-chegada-noiva",
    title: "A chegada da noiva",
    alt: "Noiva e acompanhante junto ao carro, com uma profissional do cerimonial à frente.",
  },
  {
    image: "cerimonial-mesa-doces",
    title: "Os preparativos da recepção",
    alt: "Duas profissionais organizam os doces em bandejas douradas antes da recepção.",
  },
  {
    image: "cerimonial-retrato-equipe",
    title: "Quem recebe os convidados",
    alt: "Profissional do Grupo Toccante sorri ao ar livre com o uniforme do cerimonial.",
  },
];
export const branches = [
  {
    key: "musica",
    label: "Música",
    name: "Toccante Musical",
    number: "01",
    headline: "A sua história tem uma trilha sonora.",
    description:
      "Música ao vivo e sensibilidade para acompanhar a emoção de cada momento.",
    intro:
      "Da chegada dos convidados à cerimônia, a música dá ritmo à celebração. A formação e o repertório são alinhados com o casal para traduzir sua história.",
    image: "musical-violino-ao-ar-livre",
    alt: "Violinista do Grupo Toccante toca em uma cerimônia ao ar livre.",
    services: [
      [
        "Pré-receptivo",
        "Música ao vivo para acolher os convidados antes da cerimônia.",
      ],
      [
        "Cerimônia",
        "Repertório alinhado aos momentos e às entradas do cortejo.",
      ],
      [
        "Formação musical",
        "Instrumentos e vozes definidos conforme a proposta do evento.",
      ],
      [
        "Sonorização",
        "Equipamento de som e acompanhamento técnico previstos na proposta.",
      ],
    ],
    steps: [
      [
        "Escuta",
        "Conversamos sobre as músicas e a atmosfera que fazem sentido para vocês.",
      ],
      ["Escolhas", "Alinhamos repertório, formação e momentos da cerimônia."],
      [
        "Harmonia",
        "Músicos e cerimonial coordenam as entradas e a condução musical.",
      ],
    ],
    gallery: ["musical-teclado", "musical-violino", "musical-sax"],
    teamTitle: "Música feita por pessoas.",
    teamText:
      "Raiane Ventura é idealizadora, produtora de eventos e diretora do Grupo Musical Toccante. A equipe reúne vozes e instrumentistas para compor a formação escolhida para cada celebração.",
    teamImage: "musical-sax",
    faq: [
      [
        "Como escolhemos a formação?",
        "A formação é definida com a equipe conforme o repertório, o espaço e a proposta do evento.",
      ],
      [
        "Podemos escolher as músicas?",
        "Sim. O repertório é alinhado com o casal e com os momentos da cerimônia.",
      ],
      [
        "O som está incluído?",
        "Os materiais apresentam sonorização e acompanhamento técnico. A composição final é detalhada na proposta do seu evento.",
      ],
    ],
  },
  {
    key: "buffet",
    label: "Buffet",
    name: "Toccante Buffet",
    number: "02",
    headline: "Acolher também é servir com cuidado.",
    description:
      "Sabores, apresentação e uma equipe atenta, da cozinha à mesa.",
    intro:
      "O cardápio faz parte da experiência de receber. Com opções de coquetel, gastronomia mineira, pratos principais e doces, o buffet é planejado de acordo com a celebração.",
    image: "buffet-mesa-mineira",
    alt: "Mesa de gastronomia mineira com pratos e acompanhamentos",
    services: [
      ["Boas-vindas", "Coquetel e salgados para o início da recepção."],
      [
        "Sabores à mesa",
        "Experiência mineira, pratos principais e massas entre as opções dos materiais.",
      ],
      [
        "Doces e bolo",
        "Finalização da experiência gastronômica com apresentação cuidadosa.",
      ],
      [
        "Equipe de serviço",
        "Cozinha, apoio, garçons, coordenação e recepção conforme a proposta.",
      ],
    ],
    steps: [
      [
        "Preferências",
        "Conhecemos o estilo da recepção, a quantidade de convidados e as preferências de vocês.",
      ],
      [
        "Cardápio",
        "Definimos a composição do serviço e a estrutura necessária.",
      ],
      ["Recepção", "A equipe organiza o atendimento da cozinha ao salão."],
    ],
    gallery: ["buffet-salgados", "buffet-doces", "buffet-massas"],
    teamTitle: "Cuidado da cozinha ao salão.",
    teamText:
      "Chef, auxiliares, copeiro, garçons, coordenação e recepção compõem a estrutura apresentada nos materiais. A equipe é dimensionada na proposta do evento.",
    teamImage: "equipe-buffet",
    faq: [
      [
        "O cardápio é definido para cada evento?",
        "A composição é alinhada na proposta, considerando o formato da recepção e as preferências informadas.",
      ],
      [
        "Posso informar restrições alimentares?",
        "Sim. Informe as restrições no campo de preferências para que a equipe avalie as possibilidades antes de elaborar a proposta.",
      ],
      [
        "O que faz parte da estrutura?",
        "Os materiais apresentam equipe, utensílios e estrutura de serviço. Os itens e as quantidades são confirmados na contratação.",
      ],
    ],
  },
  {
    key: "decoracao",
    label: "Decoração",
    name: "Toccante Decoração",
    number: "03",
    headline: "Beleza que faz parte da sua história.",
    description: "Flores, composições e ambientes que acolhem a celebração.",
    intro:
      "Da cerimônia à recepção, cada ambiente participa da experiência. Flores, mesa do bolo e centros de mesa são pensados em conjunto para dar unidade à celebração.",
    image: "decoracao-mesa-bolo",
    alt: "Mesa de bolo decorada com flores coloridas, folhagens e doces",
    services: [
      [
        "Cerimônia",
        "Composição floral, passarela e mesa do celebrante conforme o projeto.",
      ],
      ["Recepção", "Ambientação dos espaços e composição dos centros de mesa."],
      [
        "Mesa do bolo",
        "Flores e elementos decorativos para reunir os detalhes da celebração.",
      ],
      [
        "Composição integrada",
        "Escolhas alinhadas entre os ambientes da cerimônia e da recepção.",
      ],
    ],
    steps: [
      ["Inspirações", "Conhecemos suas referências e o espaço da celebração."],
      [
        "Composição",
        "Alinhamos flores, elementos e ambientes previstos na proposta.",
      ],
      [
        "Ambientação",
        "Organizamos a composição dos espaços para receber o evento.",
      ],
    ],
    gallery: ["decoracao-mesa-bolo", "decoracao-flores-corredor"],
    teamTitle: "Um olhar para o conjunto.",
    teamText:
      "A decoração integra o planejamento do Grupo Toccante, em diálogo com as demais vertentes. A composição do projeto é confirmada durante o atendimento.",
    teamImage: "decoracao-flores-corredor",
    faq: [
      [
        "A decoração contempla cerimônia e recepção?",
        "Os materiais apresentam os dois ambientes. Os espaços e itens atendidos são definidos na proposta.",
      ],
      [
        "Posso levar referências?",
        "Sim. Suas preferências ajudam a orientar a conversa sobre flores, composições e atmosfera do evento.",
      ],
      [
        "As flores são sempre as mesmas?",
        "As escolhas apresentadas nos materiais pertencem a projetos específicos. A composição do seu evento será alinhada com a equipe.",
      ],
    ],
  },
  {
    key: "cerimonial",
    label: "Cerimonial",
    name: "Toccante Cerimonial",
    number: "04",
    headline: "Para viver o momento por inteiro.",
    description:
      "Planejamento, coordenação e presença em cada etapa da celebração.",
    intro:
      "Cuidar do que acontece nos bastidores permite que vocês estejam presentes no que importa. O cerimonial acompanha o planejamento, alinha fornecedores e coordena a cerimônia e a recepção.",
    image: lapela.image,
    alt: lapela.alt,
    services: [
      [
        "Antes do evento",
        "Assessoria, orientações, cronograma e alinhamento com fornecedores.",
      ],
      [
        "Cerimônia",
        "Organização do cortejo, acolhimento e sincronização com os músicos.",
      ],
      [
        "Recepção",
        "Atendimento aos convidados e coordenação dos momentos da celebração.",
      ],
      [
        "Bastidores",
        "Acompanhamento da execução, comunicação entre profissionais e suporte ao casal.",
      ],
    ],
    steps: [
      [
        "Planejamento",
        "Alinhamos prioridades, fornecedores e o cronograma da celebração.",
      ],
      [
        "Preparação",
        "Confirmamos horários, organização do espaço e detalhes com os profissionais.",
      ],
      [
        "Presença",
        "Coordenamos a cerimônia e a recepção, acompanhando cada momento.",
      ],
    ],
    gallery: cerimonialPhotos.map((photo) => photo.image),
    faq: [
      [
        "O acompanhamento começa antes do evento?",
        "O portfólio apresenta assessoria e planejamento prévio, com orientações, cronograma e contato com fornecedores. O escopo é definido no plano contratado.",
      ],
      [
        "Vocês coordenam a cerimônia e a recepção?",
        "Sim. O material apresenta atividades de organização e acompanhamento nos dois momentos, conforme a proposta.",
      ],
      [
        "Quantos profissionais acompanham o evento?",
        "A composição da equipe e o período de atendimento são definidos no plano e na proposta. Converse com a equipe para avaliar o seu evento.",
      ],
    ],
  },
] as const;
export type Branch = (typeof branches)[number];
export const faqs = [
  [
    "Posso contratar mais de uma vertente?",
    "Sim. Música, Buffet, Decoração e Cerimonial podem ser alinhados em uma proposta integrada. Selecione as áreas de interesse no formulário.",
  ],
  [
    "Como funciona a experiência completa?",
    "As quatro vertentes participam do mesmo planejamento, facilitando o alinhamento das escolhas e a coordenação entre os profissionais.",
  ],
  [
    "Como consulto disponibilidade e valores?",
    "Informe a data, a cidade e as vertentes desejadas. A equipe avalia a disponibilidade e prepara a proposta conforme os detalhes da celebração.",
  ],
  [
    "Ainda não defini todos os detalhes. Posso conversar?",
    "Sim. Você pode começar informando apenas o que já sabe. A conversa com a equipe ajuda a organizar as próximas escolhas.",
  ],
] as const;
export const people = [
  {
    name: "Raiane Ventura",
    role: "Idealizadora, produtora de eventos e diretora Musical",
    text: "Sua trajetória com eventos começou na infância, cantando em casamentos e organizando celebrações familiares. Fundou o Grupo Musical Toccante ao lado do esposo.",
  },
];
export const portfolio = [
  {
    branch: "decoracao",
    image: "decoracao-mesa-bolo",
    title: "Flores, cores e celebração",
    alt: "Mesa de bolo com arranjos florais coloridos e folhagens",
  },
  {
    branch: "musica",
    image: "musical-teclado",
    title: "Música que acompanha a emoção",
    alt: "Tecladista do Grupo Toccante tocando durante uma cerimônia",
  },
  {
    branch: "buffet",
    image: "buffet-mesa-mineira",
    title: "Sabores à mesa",
    alt: "Mesa de gastronomia mineira preparada para o serviço",
  },
  {
    branch: "musica",
    image: "musical-violino",
    title: "A delicadeza das cordas",
    alt: "Violinista tocando ao ar livre",
  },
  {
    branch: "buffet",
    image: "buffet-doces",
    title: "Um toque de doçura",
    alt: "Seleção de doces brancos e de chocolate",
  },
  {
    branch: "decoracao",
    image: "decoracao-flores-corredor",
    title: "O caminho até o sim",
    alt: "Flores brancas decorando o corredor da cerimônia",
  },
  {
    branch: "musica",
    image: "musical-sax",
    title: "Sons que dão vida ao momento",
    alt: "Saxofonista do Grupo Toccante durante uma apresentação",
  },
  ...cerimonialPhotos.map((photo) => ({ ...photo, branch: "cerimonial" })),
];
export const pageMeta: Record<
  string,
  { title: string; description: string; image?: string }
> = {
  inicio: {
    title: "Grupo Toccante | Música, Buffet, Decoração e Cerimonial",
    description:
      "Quatro formas de cuidar da sua celebração. Conheça o Grupo Toccante e planeje seu evento com música, buffet, decoração e cerimonial integrados.",
  },
  "quem-somos": {
    title: "Quem somos",
    description:
      "Conheça a essência do Grupo Toccante: sensibilidade, organização, excelência e cuidado em quatro vertentes para eventos.",
  },
  equipe: {
    title: "Nossa equipe",
    description:
      "Conheça Raiane Ventura e as equipes que participam das celebrações do Grupo Toccante.",
  },
  portfolio: {
    title: "Portfólio",
    description:
      "Fotografias de música, gastronomia, decoração e cerimonial em eventos do Grupo Toccante.",
  },
  contato: {
    title: "Contato e orçamento",
    description:
      "Conte sobre sua celebração, selecione as vertentes e prepare um resumo para conversar com a equipe do Grupo Toccante.",
  },
  privacidade: {
    title: "Privacidade",
    description:
      "Entenda como o formulário prepara seu resumo e como continuar o atendimento do Grupo Toccante.",
  },
  ...Object.fromEntries(
    branches.map((b) => [b.key, { title: b.name, description: b.description }]),
  ),
};
