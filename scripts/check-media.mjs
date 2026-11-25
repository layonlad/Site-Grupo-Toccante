// Confere a mídia publicada: toda referência existe, nada fica sem uso, nenhum
// arquivo passa do limite do GitHub e nenhuma foto carrega metadados.
// Uso: node scripts/check-media.mjs [--limpar]
import { createRequire } from "node:module";
import {
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const sharp = createRequire(
  root + "/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/",
)("sharp");
const clean = process.argv.includes("--limpar");
const app = path.join(root, "app");
const code = readdirSync(app)
  .filter((f) => /\.tsx?$/.test(f))
  .map((f) => readFileSync(path.join(app, f), "utf8"))
  .join("\n");
const errors = [];
const keep = new Set(code.match(/\/media\/[\w.-]+/g)?.map((m) => m.slice(7)));
const known = new Set();
for (const file of [
  "media",
  "new-media",
  "music-media",
  "cerimonial-media",
  "gallery-media",
]) {
  const target = path.join(app, `${file}.json`);
  const data = JSON.parse(readFileSync(target, "utf8"));
  for (const [name, item] of Object.entries(data)) {
    const used = code.includes(`"${name}"`);
    if (used) item.files.forEach((f) => keep.add(f.src.slice(7)));
    else if (clean) delete data[name];
    else errors.push(`Sem uso: ${name} (${file}.json)`);
    known.add(name);
  }
  if (clean) writeFileSync(target, JSON.stringify(data, null, 2) + "\n");
}
for (const item of Object.values(
  JSON.parse(readFileSync(path.join(app, "video-media.json"), "utf8")),
)) {
  keep.add(item.src.slice(7));
  keep.add(item.poster.slice(7));
}
const media = path.join(root, "public/media");
const files = new Set(readdirSync(media).filter((f) => !f.startsWith(".")));
for (const f of keep) if (!files.has(f)) errors.push(`Não existe: ${f}`);
for (const f of files) {
  const full = path.join(media, f);
  if (!keep.has(f)) {
    if (clean) {
      rmSync(full);
      console.log("removido", f);
    } else errors.push(`Arquivo sem uso: ${f}`);
    continue;
  }
  if (statSync(full).size > 95_000_000) errors.push(`Acima de 95 MB: ${f}`);
  if (f.endsWith(".webp")) {
    const meta = await sharp(full).metadata();
    if (meta.exif || meta.xmp || meta.iptc) errors.push(`Metadados: ${f}`);
  }
}
for (const name of new Set(code.match(/image: "([\w-]+)"|image="([\w-]+)"/g)))
  if (!known.has(name.match(/"([\w-]+)"/)[1]))
    errors.push(`Sem manifesto: ${name}`);
console.log(`${keep.size} arquivos em uso`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
