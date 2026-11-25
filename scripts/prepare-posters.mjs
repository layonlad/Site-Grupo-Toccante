// Copia os MP4 gerados por prepare-videos.swift para public/media, converte as
// capas para WebP e gera app/video-media.json.
// Uso: node scripts/prepare-posters.mjs <pasta de saída do prepare-videos>
import { createRequire } from "node:module";
import { copyFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const sharp = createRequire(
  root + "/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/",
)("sharp");
const src = path.resolve(process.argv[2]);
const media = path.join(root, "public/media");
const LIMIT = 95_000_000; // o GitHub recusa arquivos acima de 100 MB
const manifest = {};
for (const file of readdirSync(src)
  .filter((f) => f.endsWith(".mp4"))
  .sort()) {
  const name = file.slice(0, -4);
  const bytes = statSync(path.join(src, file)).size;
  if (bytes > LIMIT) throw new Error(`${file} passa do limite do GitHub`);
  copyFileSync(path.join(src, file), path.join(media, file));
  const { width, height } = await sharp(path.join(src, `${name}-poster.jpg`))
    .resize({ width: 960 })
    .webp({ quality: 84, effort: 6 })
    .toFile(path.join(media, `${name}-capa.webp`));
  manifest[name] = {
    src: `/media/${file}`,
    poster: `/media/${name}-capa.webp`,
    width,
    height,
    bytes,
  };
}
writeFileSync(
  path.join(root, "app/video-media.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(Object.keys(manifest).length, "vídeos");
