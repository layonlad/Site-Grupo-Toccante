// Recorta as capturas (remove setas, contadores e marcas da interface do Instagram),
// aplica um realce leve e gera versões WebP responsivas + app/new-media.json.
// Uso: node scripts/prepare-new-media.mjs <pasta "Grupo Toccante"> [poster.jpg]
import { createRequire } from "node:module";
import { writeFileSync, statSync } from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const require = createRequire(
  root + "/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/",
);
const sharp = require("sharp");
const src = path.resolve(process.argv[2] ?? "..");
const poster = process.argv[3];
const B = "Buffet/",
  P = "Colado 2026-11-10 às ";
const jobs = [
  ["buffet-frios-camadas", B + P + "16.48.13.png", [60, 0, 970, 1440]],
  ["buffet-mesa-frios", B + P + "16.50.47.png", [0, 0, 1410, 1410]],
  ["buffet-pratos-quentes", B + P + "16.51.47.png", [0, 0, 1115, 1208]],
  ["buffet-salgados-tabua", B + P + "16.52.44.png", [90, 14, 1045, 1450]],
  ["buffet-ilha-gastronomica", B + "IMG_4342.jpeg", null],
  ["buffet-mesa-posta", B + "IMG_4343.jpeg", [0, 0, 1179, 1115]],
  ["buffet-panelas", B + "IMG_4344.jpeg", [460, 0, 719, 918]],
  ["buffet-petiscos", B + "IMG_4345.jpeg", [0, 130, 1179, 1218]],
  ["buffet-doces-nozes", B + "IMG_4346.jpeg", [0, 125, 1179, 1285]],
  ["musical-quarteto", "Musical/" + P + "16.49.02.png", [0, 0, 1040, 1300]],
];
if (poster) jobs.push(["musical-apresentacao-poster", poster, null]);
const manifest = {};
for (const [name, file, crop] of jobs) {
  const input = path.isAbsolute(file) ? file : path.join(src, file);
  let base = sharp(input).rotate();
  if (crop)
    base = base.extract({
      left: crop[0],
      top: crop[1],
      width: crop[2],
      height: crop[3],
    });
  const buf = await base
    .modulate({ saturation: 1.05, brightness: 1.01 })
    .toBuffer();
  const meta = await sharp(buf).metadata();
  const widths = [
    ...new Set([480, 900, 1200].map((w) => Math.min(w, meta.width))),
  ];
  const files = [];
  for (const w of widths) {
    const out = path.join(root, "public/media", `${name}-${w}.webp`);
    const info = await sharp(buf)
      .resize({ width: w })
      .sharpen({ sigma: 0.5 })
      .webp({ quality: 82, effort: 6 })
      .toFile(out);
    files.push({
      src: `/media/${name}-${w}.webp`,
      width: w,
      height: info.height,
      bytes: statSync(out).size,
    });
  }
  manifest[name] = { width: meta.width, height: meta.height, files };
}
writeFileSync(
  path.join(root, "app/new-media.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(
  Object.entries(manifest)
    .map(
      ([k, v]) =>
        `${k} ${v.width}x${v.height} ${v.files.map((f) => Math.round(f.bytes / 1024) + "k").join("/")}`,
    )
    .join("\n"),
);
