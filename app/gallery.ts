/**
 * Fotos e vídeos publicados a partir das pastas do projeto. A divisão segue as
 * pastas: Buffet, Decoração, Musical, Fotos Equipe, Noivos e Depoimentos.
 * Exportação: scripts/prepare-folder-media.mjs e scripts/prepare-videos.swift.
 */
export type Shot = { image: string; title: string; alt: string };
const shot = (image: string, title: string, alt: string): Shot => ({
  image,
  title,
  alt,
});

export const buffetPhotos: Shot[] = [
  shot(
    "buffet-coxinhas-sorriso",
    "Recepção com coxinhas",
    "Profissional do Buffet Toccante sorri com uma travessa de coxinhas e molho.",
  ),
  shot(
    "buffet-ilha-rustica",
    "Ilha gastronômica rústica",
    "Carroça de madeira com panelas de ferro, samambaias e lanternas.",
  ),
  shot(
    "buffet-mesa-frios",
    "Mesa de frios",
    "Mesa de frios com espetinhos, morangos e queijos sobre suportes de madeira.",
  ),
  shot(
    "buffet-mesa-antepastos",
    "Antepastos e flores",
    "Pote de vidro com azeitonas entre pequenos vasos de flores e petiscos.",
  ),
  shot(
    "buffet-tortinhas-bandeja",
    "Tortinhas da recepção",
    "Travessa branca com tortinhas assadas em volta de uma cumbuca de molho.",
  ),
  shot(
    "buffet-frios-camadas",
    "Frios e frutas em camadas",
    "Suporte de madeira em três níveis com kiwi, damascos, salame e azeitonas.",
  ),
  shot(
    "buffet-espetinhos",
    "Espetinhos empanados",
    "Espetinhos empanados em volta do molho, com a mesa do buffet iluminada por velas ao fundo.",
  ),
  shot(
    "buffet-pratos-quentes",
    "Pratos quentes",
    "Mesa com paella enfeitada com ovos, panelas de pedra e biscoitos salgados.",
  ),
  shot(
    "buffet-coxinhas-bandeja",
    "Coxinhas com molho",
    "Travessa de coxinhas com molho à frente do avental do Buffet Toccante.",
  ),
  shot(
    "buffet-mesa-recepcao",
    "Mesa da recepção",
    "Mesa comprida de madeira com frios, pratos e flores diante de cortinas claras.",
  ),
  shot(
    "buffet-ilha-samambaia",
    "Comida mineira à mesa",
    "Panelas de ferro com arroz colorido e acompanhamentos ao lado de uma samambaia.",
  ),
  shot(
    "buffet-mesa-posta",
    "Mesa posta com flores",
    "Mesa de madeira com arranjos de rosas e lírios, sousplats de palha e guardanapos brancos.",
  ),
  shot(
    "buffet-panelas-ferro",
    "Panelas de ferro",
    "Panelas de ferro servidas sobre uma mesa de madeira rústica.",
  ),
  shot(
    "buffet-coxinhas-servico",
    "O serviço que acolhe",
    "Profissional do Buffet Toccante apresenta uma travessa de coxinhas.",
  ),
  shot(
    "buffet-salgados-tabua",
    "Salgados na tábua",
    "Tábuas de madeira com salgados variados e molhos servidas em bandeja.",
  ),
  shot(
    "buffet-mesa-frios-flores",
    "Frios entre flores",
    "Tábuas de frios e queijos entre vasos de flores na mesa da recepção.",
  ),
  shot(
    "buffet-tortinhas-detalhe",
    "Tortinhas em detalhe",
    "Detalhe de tortinhas douradas ao lado de uma cumbuca de molho.",
  ),
  shot(
    "buffet-ilha-gastronomica",
    "Ilha gastronômica ao ar livre",
    "Cozinheiros servem pratos quentes em uma ilha decorada com velas e flores.",
  ),
  shot(
    "buffet-doces-nozes",
    "Doces finos com nozes",
    "Bandeja de cristal com doces de chocolate cobertos por nozes douradas.",
  ),
  shot(
    "buffet-ilha-panelas",
    "Sabores da ilha",
    "Vista da ilha gastronômica com panelas de ferro, pratos e folhagens.",
  ),
  shot(
    "buffet-petiscos",
    "Petiscos na tábua",
    "Tábua de madeira com pastéis assados, mini sanduíches e frango.",
  ),
  shot(
    "buffet-coxinhas-apresentacao",
    "Coxinhas da casa",
    "Profissional de uniforme preto segura uma travessa de coxinhas com molho.",
  ),
  shot(
    "buffet-panelas",
    "Serviço em panelas de pedra",
    "Panelas de pedra e réchaud de inox dispostos sobre uma mesa rústica.",
  ),
];

export const decoracaoPhotos: Shot[] = [
  shot(
    "decoracao-girassois-jardim",
    "Girassóis no jardim",
    "Mesas de madeira com arranjos de girassóis sob uma árvore iluminada.",
  ),
  shot(
    "decoracao-cerimonia-lago",
    "Cerimônia à beira do lago",
    "Cadeiras de madeira e flores em um deck com vista para o lago.",
  ),
  shot(
    "decoracao-bolo-rosas",
    "Bolo com rosas",
    "Bolo branco de quatro andares com rosas alaranjadas e flores suspensas.",
  ),
  shot(
    "decoracao-capela-arco",
    "Arco de flores na capela",
    "Porta de capela emoldurada por um arco de flores e girassóis.",
  ),
  shot(
    "decoracao-mesa-bolo-lirios",
    "Mesa do bolo com lírios",
    "Mesa de vidro com bolo e grandes arranjos de flores brancas.",
  ),
  shot(
    "decoracao-quinze-anos-borboleta",
    "Quinze anos em flores",
    "Bolo de quinze anos entre flores rosadas e uma borboleta iluminada.",
  ),
  shot(
    "decoracao-altar-igreja",
    "Flores no altar",
    "Noivos se abraçam no altar de uma igreja com arranjos brancos.",
  ),
  shot(
    "decoracao-capela-noite",
    "Caminho até a capela",
    "Corredor de flores no gramado conduz a uma capela iluminada à noite.",
  ),
  shot(
    "decoracao-bolo-floral",
    "Bolo entre flores",
    "Bolo branco de quatro andares decorado com flores claras.",
  ),
  shot(
    "decoracao-quinze-anos-doces",
    "Doces e flores lilases",
    "Doces em forminhas lilases sobre a mesa, com flores e borboleta iluminada.",
  ),
  shot(
    "decoracao-mesa-bolo-ampla",
    "Mesa do bolo",
    "Mesa do bolo com doces e arranjos altos de flores brancas.",
  ),
  shot(
    "decoracao-noivos-bolo",
    "Os noivos e o bolo",
    "Noivos sorriem ao lado do bolo e das flores brancas.",
  ),
  shot(
    "decoracao-quinze-anos-mesa",
    "Mesa de quinze anos",
    "Três mesas de madeira com bolo, flores rosadas e lustre ao centro.",
  ),
  shot(
    "decoracao-doces-flores-brancas",
    "Doces entre flores brancas",
    "Bandejas de doces diante de arranjos de lírios e rosas brancas.",
  ),
  shot(
    "decoracao-capela-luzes",
    "Luzes no gramado",
    "Varal de luzes sobre o gramado com a capela ao fundo.",
  ),
  shot(
    "decoracao-bombons",
    "Bombons finos",
    "Bombons em bandejas de cristal sobre uma mesa de vidro.",
  ),
  shot(
    "decoracao-bolo-entre-flores",
    "O bolo em destaque",
    "Bolo branco visto entre flores em primeiro plano.",
  ),
  shot(
    "decoracao-quinze-anos-bolo",
    "Bolo de quinze anos",
    "Bolo branco com topo de quinze anos ao lado de flores rosadas.",
  ),
  shot(
    "decoracao-girassois-montagem",
    "O cuidado na montagem",
    "Profissional ajusta as luzes acima da mesa do bolo com girassóis.",
  ),
  shot(
    "decoracao-chocolates",
    "Chocolates com laço",
    "Chocolates decorados com laços em um prato de cristal.",
  ),
  shot(
    "decoracao-mesa-bolo-branca",
    "Salão em branco e verde",
    "Mesa do bolo com vasos dourados e grandes arranjos brancos.",
  ),
  shot(
    "decoracao-centro-mesa",
    "Centro de mesa",
    "Arranjo de flores brancas e rosadas sobre toalha adamascada.",
  ),
  shot(
    "decoracao-docinhos-castanhas",
    "Docinhos com castanhas",
    "Docinhos em forminhas brancas cobertos por castanhas.",
  ),
  shot(
    "decoracao-quinze-anos-lustre",
    "Celebração sob o lustre",
    "Mesas com flores rosadas e bolo de quinze anos sob um lustre.",
  ),
  shot(
    "decoracao-docinhos-bandeja",
    "Docinhos na bandeja",
    "Docinhos claros enfileirados em uma bandeja de cristal.",
  ),
  shot(
    "decoracao-fotos-familia",
    "Memórias de família",
    "Fotografias de família e um vaso de flores sobre uma mesa de vidro.",
  ),
  shot(
    "decoracao-mesa-cafe",
    "Mesa de café",
    "Mesa de café com biscoitos, orquídeas brancas e garrafas térmicas.",
  ),
];

export const musicalPhotos: Shot[] = [
  shot(
    "musical-violino-violoncelo",
    "Violino e violoncelo",
    "Violinista e violoncelista tocam em um gramado com montanhas ao fundo.",
  ),
  shot(
    "musical-duo-vozes",
    "Duo de vozes",
    "Cantora e cantor se apresentam ao microfone em um jardim.",
  ),
  shot(
    "musical-formacao-entardecer",
    "Formação ao entardecer",
    "Teclado, violoncelo, violino e flauta em formação no jardim ao pôr do sol.",
  ),
  shot(
    "musical-violao",
    "Violão na cerimônia",
    "Violonista de camisa branca toca ao ar livre.",
  ),
  shot(
    "musical-violino-a-sombra",
    "Violino à sombra",
    "Violinista sentado sob uma árvore com o violino nas mãos.",
  ),
  shot(
    "musical-tecnico-som",
    "Técnico de Som",
    "Mão ajusta os controles de uma mesa de som durante o evento.",
  ),
  shot(
    "musical-quarteto",
    "Quarteto em cerimônia",
    "Quatro músicos do Grupo Toccante, com voz, violão, teclado e violino, diante de um arco de flores.",
  ),
];

/** Equipe: cada linha mantém a proporção original das fotos. */
export type TeamPhoto = { image: string; alt: string; caption?: string };
export const teamGroups: {
  key: string;
  title: string;
  text?: string;
  rows: TeamPhoto[][];
}[] = [
  {
    key: "proprietarios",
    title: "Proprietários",
    rows: [
      [
        {
          image: "equipe-ceo",
          alt: "Retrato do CEO do Grupo Toccante.",
          caption: "CEO – Grupo Toccante",
        },
        {
          image: "equipe-socios",
          alt: "Os dois sócios do Grupo Toccante em retrato de estúdio.",
          caption: "Sócios",
        },
      ],
    ],
  },
  {
    key: "buffet",
    title: "Toccante Buffet",
    text: "Cozinha, serviço e coordenação, com atenção à experiência de receber.",
    rows: [
      [
        {
          image: "equipe-chef",
          alt: "Chef de cozinha do Buffet Toccante de braços cruzados.",
          caption: "Chef de Cozinha",
        },
        {
          image: "equipe-cozinha",
          alt: "Três profissionais da cozinha do Buffet Toccante.",
          caption: "Equipe Cozinha",
        },
        {
          image: "equipe-buffet-utensilios",
          alt: "Três profissionais da cozinha com utensílios nas mãos.",
        },
      ],
    ],
  },
  {
    key: "musica",
    title: "Toccante Musical",
    text: "Vozes e instrumentos em sintonia com os momentos da cerimônia.",
    rows: [
      [
        {
          image: "equipe-musical-grupo",
          alt: "Cinco músicos com violão, violino, teclado e duas vozes.",
        },
        {
          image: "equipe-musical-formacao",
          alt: "Formação do Toccante Musical em retrato de estúdio.",
        },
        {
          image: "equipe-musical-teclado",
          alt: "Tecladista do Toccante Musical ao teclado.",
        },
      ],
    ],
  },
  {
    key: "decoracao",
    title: "Toccante Decoração",
    text: "Flores, composições e ambientes que acolhem a celebração.",
    rows: [
      [
        {
          image: "equipe-decoracao-buque",
          alt: "Profissional da Decoração Toccante segura um buquê de flores brancas.",
        },
        {
          image: "equipe-decoracao-uniforme",
          alt: "Profissional de costas com o uniforme da Decoração Toccante e flores na mão.",
        },
      ],
    ],
  },
  {
    key: "cerimonial",
    title: "Toccante Cerimonial",
    text: "Planejamento, acolhimento e acompanhamento dos bastidores.",
    rows: [
      [
        {
          image: "equipe-cerimonial-grupo",
          alt: "Quatro profissionais do Cerimonial Toccante sorriem juntas.",
        },
        {
          image: "equipe-cerimonial-uniforme",
          alt: "Equipe do Cerimonial Toccante com o nome bordado no uniforme.",
        },
      ],
      [
        {
          image: "equipe-raiane",
          alt: "Raiane sorri com um tablet e uma caneta nas mãos.",
          caption: "Raiane",
        },
        {
          image: "equipe-cerimonial-1",
          alt: "Profissional do Cerimonial Toccante de braços cruzados.",
        },
        {
          image: "equipe-cerimonial-2",
          alt: "Profissional do Cerimonial Toccante em retrato de estúdio.",
        },
        {
          image: "equipe-cerimonial-3",
          alt: "Profissional do Cerimonial Toccante com as mãos unidas.",
        },
        {
          image: "equipe-cerimonial-4",
          alt: "Profissional do Cerimonial Toccante sorri de braços cruzados.",
        },
      ],
    ],
  },
];

export const couplePhotos: Shot[] = [
  shot(
    "noivos-noiva-buque",
    "O sorriso da noiva",
    "Noiva de vestido de renda sorri com o buquê sob a luz do entardecer.",
  ),
  shot(
    "noivos-altar",
    "Diante do altar",
    "Noivos vistos de costas no altar, com o véu estendido pelo corredor.",
  ),
  shot(
    "noivos-noiva-sorriso",
    "Emoção ao ar livre",
    "Noiva sorri de olhos fechados durante a cerimônia ao ar livre.",
  ),
  shot(
    "noivos-noivo-pajem",
    "Noivo e pajem",
    "Noivo e um menino, ambos de paletó branco, apoiados em uma árvore.",
  ),
  shot(
    "noivos-noiva-lago",
    "A noiva e o lago",
    "Noiva de olhos fechados diante do lago em retrato preto e branco.",
  ),
  shot(
    "noivos-silhueta",
    "Silhueta do casal",
    "Silhueta de um casal próximo em contraluz.",
  ),
];

/** Vídeos: os arquivos e as capas estão em public/media (app/video-media.json). */
export type FilmItem = {
  video: string;
  title: string;
  text?: string;
  alt: string;
};
export const musicalFilms: FilmItem[] = [
  {
    video: "musical-video-3",
    title: "A música de uma celebração.",
    text: "Flauta, conjunto e os momentos dos noivos.",
    alt: "Vídeo com flautista, conjunto musical e cenas de um casamento.",
  },
  {
    video: "musical-video-2",
    title: "Cordas em detalhe.",
    text: "Violoncelo e violino em tons de preto e branco.",
    alt: "Vídeo com detalhes de violoncelo e violino.",
  },
  {
    video: "musical-video-4",
    title: "Violino e violoncelo à beira do lago.",
    text: "O duo em apresentação ao ar livre.",
    alt: "Vídeo de violinista e violoncelista tocando junto a um lago.",
  },
  {
    video: "musical-video-1",
    title: "A música em uma cerimônia ao ar livre.",
    text: "Um registro da equipe em um casamento, da preparação do espaço ao momento dos noivos.",
    alt: "Vídeo do Toccante Musical em um casamento ao ar livre.",
  },
];
export const branchFilms: Partial<Record<string, FilmItem[]>> = {
  buffet: [
    {
      video: "buffet-video",
      title: "O preparo à mesa.",
      alt: "Vídeo de profissional do Buffet Toccante servindo frios e torradas.",
    },
  ],
  decoracao: [
    {
      video: "decoracao-video-1",
      title: "A montagem das luzes.",
      alt: "Vídeo de profissional ajustando as luzes sobre a mesa do bolo.",
    },
    {
      video: "decoracao-video-2",
      title: "Girassóis e luz.",
      alt: "Vídeo da mesa do bolo com girassóis e varal de luzes.",
    },
  ],
};

/** Depoimentos: mensagens transcritas como foram recebidas. */
export type Testimonial = {
  couple: string;
  quote?: string[];
  photo?: { image: string; alt: string; ratio?: string };
  video?: { video: string; alt: string };
};
export const testimonials: Testimonial[] = [
  {
    couple: "Felipe e Samara",
    quote: [
      "Mas passando para agradecer ao serviço prestado",
      "Vocês foram cruciais para esse dia",
      "Impecável em tudo",
      "Comida, bebidas, decoração",
      "Tudo perfeito",
      "Nós iremos indicar vocês em toda oportunidade que tivermos",
      "Pode ter certeza",
      "Estamos muito gratos por vocês meus queridos",
      "De coração mesmo!!! ❤️❤️",
    ],
    photo: {
      image: "depoimento-felipe-samara",
      alt: "Felipe e Samara em retrato no dia do casamento.",
      ratio: "9 / 16",
    },
    video: {
      video: "depoimento-felipe-samara",
      alt: "Vídeo do casamento de Felipe e Samara.",
    },
  },
  {
    couple: "Karen e João",
    video: {
      video: "depoimento-karen-joao",
      alt: "Depoimento em vídeo de Karen e João.",
    },
  },
  {
    couple: "Laís e Lucas",
    video: {
      video: "depoimento-lais-lucas",
      alt: "Depoimento em vídeo de Laís e Lucas.",
    },
  },
  {
    couple: "Fabíola e Robson",
    photo: {
      image: "depoimento-fabiola-robson",
      alt: "Fabíola e Robson sorriem de mãos dadas durante a cerimônia.",
    },
    quote: [
      "Raiane, eu não poderia deixar de te agradecer por tudo ❤️",
      "Você não simplesmente decorou o nosso casamento... você conseguiu transformar cada detalhe em algo que tinha a minha cara, exatamente do jeitinho que eu sonhei. 🥹✨",
      "Quando eu cheguei e vi tudo pronto, meu coração ficou tão feliz! Cada detalhe, cada escolha, cada cantinho estava lindo e mostrava o carinho e o cuidado que você teve para tornar aquele dia especial.",
      "Obrigada por ter entendido meus gostos, meus sonhos e até aquelas ideias que às vezes nem eu sabia explicar direito 😂❤️. Você conseguiu colocar tudo no lugar e deixar nosso casamento ainda mais lindo do que eu imaginava.",
      "Foi muito especial poder contar com você nesse momento tão importante das nossas vidas. Vou guardar para sempre a lembrança de entrar naquele espaço e ver tudo tão lindo, feito com tanto carinho.",
      "Obrigada, Raiane, por ter deixado o nosso dia com a minha cara e com o nosso coração. ❤️✨",
      "Você fez parte de um dos dias mais felizes da nossa história, e eu sou muito grata por isso! 🥹🌷",
    ],
  },
];
