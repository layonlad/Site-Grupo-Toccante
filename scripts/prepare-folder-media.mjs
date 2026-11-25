// Exporta as fotos das pastas do projeto (Buffet, Decoração, Musical, Noivos e
// Fotos Equipe) em WebP responsivo e gera app/gallery-media.json.
// Corrige a rotação, converte para sRGB e descarta metadados (inclusive GPS).
// Não amplia, não realça e não recorta pessoas; os originais não são alterados.
// Uso: node scripts/prepare-folder-media.mjs [pasta "Grupo Toccante"]
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const require = createRequire(
  root + "/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/",
);
const sharp = require("sharp");
const src = path.resolve(process.argv[2] ?? path.join(root, ".."));
const out = path.join(root, "public/media");
const WIDTHS = [480, 960, 1600, 2400];
const QUALITY = 86;

// [nome no site, arquivo, recorte opcional de borda em px: todos os lados ou
// { top, bottom }]
const E = "Fotos Equipe/";
const P = "Colado 2026-11-25 às ";
const jobs = [
  // Buffet
  ["buffet-mesa-antepastos", "Buffet/0ddb2e48-f75e-435b-8881-b21b23f0d36c.jpg"],
  [
    "buffet-coxinhas-servico",
    "Buffet/10234bfe-b865-455d-a792-44cfdba54dd3.jpg",
  ],
  ["buffet-ilha-rustica", "Buffet/35B586C8-D952-41EC-8998-A26E76633D2F.jpg"],
  [
    "buffet-coxinhas-bandeja",
    "Buffet/46799876-CB10-4DAA-A1CD-D73FE42CF8E7.jpg",
  ],
  ["buffet-mesa-recepcao", "Buffet/58ecebac-f8a2-41ac-bda8-ffa2e7681d13.jpg"],
  [
    "buffet-tortinhas-detalhe",
    "Buffet/624A4B0B-0F12-450A-90E9-0D67539EBCA2.jpg",
  ],
  [
    "buffet-coxinhas-sorriso",
    "Buffet/6a978676-fd53-4bbe-8f43-a52cdd8bb354.jpg",
  ],
  ["buffet-ilha-samambaia", "Buffet/7EADE4A7-EDF1-4574-9902-981F1F4B7918.jpg"],
  [
    "buffet-coxinhas-apresentacao",
    "Buffet/876F212F-1126-48E6-B4F0-ADCD0BE17B12.jpg",
  ],
  ["buffet-frios-camadas", "Buffet/9ec91277-c6b4-4d59-abb6-5339ebc65e42.jpg"],
  [
    "buffet-tortinhas-bandeja",
    "Buffet/A06EAB14-65B7-4D5B-BAFA-A8E71A9CCA12.jpg",
  ],
  ["buffet-espetinhos", "Buffet/AA4568DC-235E-4575-BAD7-1381FD47DA13.jpg"],
  ["buffet-ilha-panelas", "Buffet/E7F88165-6300-46D0-AB6B-D0CA438A3827.jpg"],
  ["buffet-panelas-ferro", "Buffet/c6cf35bc-6d1b-4efb-ba7f-821675a26491.jpg"],
  [
    "buffet-mesa-frios-flores",
    "Buffet/f4a78662-c116-49d0-b72a-810fdff85cd1.jpg",
  ],
  // Decoração (as cópias comprimidas da mesma foto ficam de fora)
  [
    "decoracao-mesa-bolo-branca",
    "Decoração/04e42cf2-eb54-4ee4-a681-7e6bc135356c.jpg",
  ],
  [
    "decoracao-quinze-anos-doces",
    "Decoração/0a7db890-34a3-4a37-9926-ef016255d491.jpg",
  ],
  [
    "decoracao-doces-flores-brancas",
    "Decoração/12a8542c-73d9-4a59-b77c-6a672f3393a5.jpg",
  ],
  [
    "decoracao-docinhos-bandeja",
    "Decoração/1d170e68-1e5a-4d51-b835-98b4a2ce769e.jpg",
  ],
  [
    "decoracao-altar-igreja",
    "Decoração/336b7b9a-b487-4085-8d04-4de2b58e565c.jpg",
  ],
  [
    "decoracao-mesa-bolo-lirios",
    "Decoração/4066e49a-0fd8-46de-9578-75c3dd0fada5.jpg",
  ],
  [
    "decoracao-centro-mesa",
    "Decoração/42407361-f233-4f88-8eb3-af888b63851c.jpg",
  ],
  [
    "decoracao-quinze-anos-lustre",
    "Decoração/64ae1f61-1c6e-4ab9-ae83-46471f864c1c.jpg",
  ],
  [
    "decoracao-chocolates",
    "Decoração/65e515c8-40b7-4dfe-b63f-16a1c47487ad.jpg",
  ],
  [
    "decoracao-bolo-floral",
    "Decoração/819b89d2-1652-4006-8554-634eb6838b44.jpg",
  ],
  [
    "decoracao-bolo-entre-flores",
    "Decoração/87dc219c-1d2e-4ff8-9a83-2a5f02357a96.jpg",
  ],
  [
    "decoracao-noivos-bolo",
    "Decoração/8dc9624f-9979-44d0-822b-db9e7b46f8c1.jpg",
  ],
  ["decoracao-bombons", "Decoração/90369fe9-78ba-40e6-a5e7-a49a42f642af.jpg"],
  [
    "decoracao-fotos-familia",
    "Decoração/98daa70b-b005-4bdf-a2f9-e73c1ff398d9.jpg",
  ],
  [
    "decoracao-capela-noite",
    "Decoração/9a3a7f28-7fb7-40c3-a5c0-2ad7b9158682.jpg",
  ],
  [
    "decoracao-mesa-bolo-ampla",
    "Decoração/9d30e0b7-b49d-4c74-b8d8-5fc6bbf10c59.jpg",
  ],
  ["decoracao-girassois-montagem", "Decoração/IMG_0399.jpeg"],
  ["decoracao-girassois-jardim", "Decoração/IMG_0408.jpeg"],
  [
    "decoracao-bolo-rosas",
    "Decoração/a0057782-411d-4900-a634-eb1b9cba0bec.jpg",
  ],
  [
    "decoracao-capela-luzes",
    "Decoração/a692123d-59c5-41cc-b2a8-98c3d7c1bef9.jpg",
  ],
  [
    "decoracao-cerimonia-lago",
    "Decoração/aea50c48-4990-4c8e-a55a-aeea7884cdfc.jpg",
  ],
  [
    "decoracao-capela-arco",
    "Decoração/be5793d0-c78c-442f-a916-700e94ed0d98.jpg",
  ],
  [
    "decoracao-docinhos-castanhas",
    "Decoração/cb7c2f5a-47f1-40ef-96d1-cce3a22a52f9.jpg",
  ],
  [
    "decoracao-quinze-anos-bolo",
    "Decoração/db61a8c6-a1a7-4e58-af7c-f68475a86e39.jpg",
  ],
  [
    "decoracao-quinze-anos-mesa",
    "Decoração/de650b5a-f649-4a99-9e59-1cd43735f99b.jpg",
  ],
  ["decoracao-mesa-cafe", "Decoração/eb5f5ae4-6399-4120-b008-bf7a5fd8ba67.jpg"],
  [
    "decoracao-quinze-anos-borboleta",
    "Decoração/f69a6f96-d97b-4718-8d92-722fd5e60bfc.jpg",
  ],
  // Musical
  ["musical-formacao-entardecer", "Musical/IMG_0335.jpeg"],
  ["musical-violao", "Musical/IMG_9828.jpeg"],
  ["musical-violino-a-sombra", "Musical/IMG_9847.jpeg"],
  ["musical-duo-vozes", "Musical/aabc563f-ba9f-4566-ab95-88b464eb732e.jpg"],
  [
    "musical-violino-violoncelo",
    "Musical/daa7d736-94b2-4f0f-a3b6-904b24eb5ff1.jpg",
  ],
  ["musical-tecnico-som", "Musical/tecnico de Som.jpeg"],
  // Equipe
  ["equipe-ceo", E + "Proprietarios/CEO - Grupo Toccante.png"],
  ["equipe-socios", E + "Proprietarios/Socios.png"],
  ["equipe-chef", E + "Equipe Buffet/Chef de Cozinha.png"],
  ["equipe-cozinha", E + "Equipe Buffet/Equipe Cozinha.png"],
  ["equipe-buffet-utensilios", E + `Equipe Buffet/${P}16.27.47.png`],
  ["equipe-musical-formacao", E + `Equipe Musical/${P}16.21.35.png`],
  ["equipe-musical-grupo", E + `Equipe Musical/${P}16.28.35.png`],
  ["equipe-musical-teclado", E + `Equipe Musical/${P}16.21.04.png`],
  ["equipe-decoracao-buque", E + `Equipe Decoraçao/${P}16.23.39.png`],
  ["equipe-decoracao-uniforme", E + `Equipe Decoraçao/${P}16.23.49.png`],
  ["equipe-cerimonial-grupo", E + `Equipe Cerimonial/${P}16.26.36.png`],
  ["equipe-cerimonial-uniforme", E + `Equipe Cerimonial/${P}16.25.23.png`],
  ["equipe-raiane", E + "Equipe Cerimonial/Raiane.png"],
  ["equipe-cerimonial-1", E + `Equipe Cerimonial/${P}16.25.33.png`],
  ["equipe-cerimonial-2", E + `Equipe Cerimonial/${P}16.25.41.png`],
  ["equipe-cerimonial-3", E + `Equipe Cerimonial/${P}16.25.51.png`],
  ["equipe-cerimonial-4", E + `Equipe Cerimonial/${P}16.26.17.png`],
  // Noivos e depoimentos
  ["noivos-noiva-buque", "Noivos/IMG_0294.jpeg"],
  ["noivos-silhueta", "Noivos/IMG_3253.jpeg"],
  ["noivos-noiva-sorriso", "Noivos/IMG_3335.jpeg"],
  ["noivos-altar", "Noivos/IMG_4225.jpeg"],
  ["noivos-noiva-lago", "Noivos/IMG_9758.jpeg"],
  ["noivos-noivo-pajem", "Noivos/IMG_9807.jpeg"],
  // A borda arredondada preta faz parte da captura, não da fotografia.
  [
    "depoimento-felipe-samara",
    "Noivos/Depoimentos/Felipe e Samara/IMG_4333.jpeg",
    24,
  ],
  // Remove só os restos da interface da captura, no topo e na base.
  [
    "depoimento-fabiola-robson",
    "Noivos/Depoimentos/Fabíola e Robson/Colado 2026-11-25 às 16.55.42.heic",
    { top: 14, bottom: 37 },
  ],
];

// O macOS pode gravar acentos decompostos (NFD): resolve cada trecho do caminho.
function locate(file) {
  return file.split("/").reduce((dir, part) => {
    const found = readdirSync(dir).find(
      (entry) => entry.normalize("NFC") === part.normalize("NFC"),
    );
    if (!found) throw new Error(`Arquivo não encontrado: ${file}`);
    return path.join(dir, found);
  }, src);
}

// O sharp não lê HEIC: o sips, do macOS, converte para PNG sem perdas.
function readable(file) {
  if (!/\.heic$/i.test(file)) return file;
  const png = path.join(
    mkdtempSync(path.join(tmpdir(), "toccante-")),
    "foto.png",
  );
  execFileSync("sips", ["-s", "format", "png", file, "--out", png], {
    stdio: "ignore",
  });
  return png;
}

mkdirSync(out, { recursive: true });
const manifest = {};
for (const [name, file, border = 0] of jobs) {
  let { data, info } = await sharp(readable(locate(file)))
    .rotate()
    .flatten({ background: "#ffffff" })
    .toColourspace("srgb")
    .raw()
    .toBuffer({ resolveWithObject: true });
  const raw = {
    width: info.width,
    height: info.height,
    channels: info.channels,
  };
  let width = info.width,
    height = info.height;
  const edge =
    typeof border === "number"
      ? { top: border, bottom: border, side: border }
      : { side: 0, ...border };
  const region = border && {
    left: edge.side,
    top: edge.top,
    width: width - edge.side * 2,
    height: height - edge.top - edge.bottom,
  };
  if (region) ({ width, height } = region);
  const files = [];
  for (const w of new Set(WIDTHS.map((value) => Math.min(value, width)))) {
    const target = path.join(out, `${name}-${w}.webp`);
    let image = sharp(data, { raw });
    if (region) image = image.extract(region);
    const result = await image
      .resize({ width: w, kernel: "lanczos3" })
      .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
      .toFile(target);
    files.push({
      src: `/media/${name}-${w}.webp`,
      width: w,
      height: result.height,
      bytes: statSync(target).size,
    });
  }
  manifest[name] = { width, height, files };
  console.log(
    name,
    `${width}x${height}`,
    files.map((f) => `${f.width}:${Math.round(f.bytes / 1024)}k`).join(" "),
  );
}
if (!existsSync(path.join(root, "app"))) throw new Error("Pasta app ausente");
writeFileSync(
  path.join(root, "app/gallery-media.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(Object.keys(manifest).length, "fotos");
