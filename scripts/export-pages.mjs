// Gera a versão estática do GitHub Pages em dist/pages a partir de
// `vinext build`: salva cada rota em HTML e aplica o prefixo do repositório
// nas páginas, nos estilos e nos scripts.
// Uso: node_modules/.bin/vinext build && node scripts/export-pages.mjs
import { spawn } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const PREFIX = "/Site-Grupo-Toccante";
const PORT = 4188;
const client = path.join(root, "dist/client");
const out = path.join(root, "dist/pages");
const routes = [
  "quem-somos",
  "musica",
  "buffet",
  "decoracao",
  "cerimonial",
  "equipe",
  "noivos",
  "depoimentos",
  "portfolio",
  "contato",
  "privacidade",
];
const route = routes.join("|");
const FILES =
  /(?<![\w./-])\/(?=(?:media|_next|fonts|assets)\/|(?:brand|favicon)\.svg|brand-mark\.webp|icon-64\.png|apple-touch-icon\.png)/g;
const prefixFiles = (text) => text.replace(FILES, `${PREFIX}/`);
// Dados do React embutidos na página. Linhas de texto ("f:T59b,...") declaram
// o próprio tamanho em bytes, que muda com o prefixo e precisa ser refeito.
function prefixFlight(html) {
  const push = /\.rsc\.push\(("(?:[^"\\]|\\.)*")\)/g;
  const parts = [...html.matchAll(push)].map((m) => JSON.parse(m[1]));
  if (!parts.length) return html;
  let source = Buffer.from(parts.join(""), "utf8");
  let result = "";
  const row = /(?:^|\n)[0-9a-f]+:T([0-9a-f]+),/;
  for (;;) {
    const text = source.toString("utf8");
    const match = row.exec(text);
    if (!match) {
      result += prefixFiles(text);
      break;
    }
    const before = text.slice(0, match.index);
    const start = Buffer.byteLength(
      text.slice(0, match.index + match[0].length),
    );
    const size = parseInt(match[1], 16);
    const body = prefixFiles(
      source.subarray(start, start + size).toString("utf8"),
    );
    result +=
      prefixFiles(before) +
      match[0].replace(
        `T${match[1]},`,
        `T${Buffer.byteLength(body).toString(16)},`,
      ) +
      body;
    source = source.subarray(start + size);
  }
  const encoded = JSON.stringify(result).replace(
    /[<>&]/g,
    (c) => `\\u${c.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
  let first = true;
  return html.replace(push, () => {
    const value = first ? encoded : '""';
    first = false;
    return `.rsc.push(${value})`;
  });
}
// Atributos href do HTML: rotas internas e a página inicial.
const prefixHtml = (html) => {
  const flight = prefixFlight(html);
  // Só o HTML fora dos dados embutidos recebe a troca direta.
  return flight
    .split(/(<script>[^]*?<\/script>)/)
    .map((part) =>
      part.includes(".rsc.push(")
        ? part
        : prefixFiles(part)
            .replace(
              new RegExp(`href="/(?=(?:${route})?(?:[?#][^"]*)?")`, "g"),
              `href="${PREFIX}/`,
            )
            // Endereço que o navegador compara ao iniciar: precisa do prefixo.
            .replace(
              new RegExp(`(nav:)\\{"pathname":"/(?=${route})`, "g"),
              `$1{"pathname":"${PREFIX}/`,
            ),
    )
    .join("");
};
// Textos do JavaScript compilado: rotas fixas, rotas montadas e início.
const prefixSite = (js) =>
  prefixFiles(js)
    .replace(
      new RegExp("([`\"'])/(?=(?:" + route + ")(?:[`\"'?#]))", "g"),
      `$1${PREFIX}/`,
    )
    .replace(/(href:)([`"'])\/(?=\2)/g, `$1$2${PREFIX}/`)
    .replace(/`\/(?=\$\{[\w.]+\.key\})/g, `\`${PREFIX}/`);

if (!existsSync(client)) throw new Error("Rode o build antes");
rmSync(out, { recursive: true, force: true });
cpSync(client, out, { recursive: true });
rmSync(path.join(out, "_headers"), { force: true });
writeFileSync(path.join(out, ".nojekyll"), "");

const chunks = path.join(out, "_next/static/chunks");
for (const file of readdirSync(chunks).filter((f) => f.endsWith(".js"))) {
  const full = path.join(chunks, file);
  let js = readFileSync(full, "utf8");
  js = file.startsWith("site-") ? prefixSite(js) : prefixFiles(js);
  // Pré-carregamento de módulos do Vite.
  js = js.replace(
    /(=`modulepreload`,\w+=function\(\w+\)\{return)`\/`/,
    `$1\`${PREFIX}/\``,
  );
  writeFileSync(full, js);
}
const css = path.join(out, "_next/static/css");
for (const file of readdirSync(css)) {
  const full = path.join(css, file);
  writeFileSync(full, prefixFiles(readFileSync(full, "utf8")));
}

const busy = await fetch(`http://localhost:${PORT}`).then(
  () => true,
  () => false,
);
if (busy) throw new Error(`A porta ${PORT} já está em uso por outro servidor`);
const server = spawn(
  process.execPath,
  [
    path.join(root, "node_modules/vinext/dist/cli.js"),
    "start",
    "--port",
    String(PORT),
  ],
  { cwd: root, stdio: "ignore" },
);
const base = `http://localhost:${PORT}`;
try {
  for (let i = 0; i < 60; i += 1) {
    if (
      await fetch(base).then(
        () => true,
        () => false,
      )
    )
      break;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  async function save(url, target, status = 200) {
    const response = await fetch(base + url);
    if (response.status !== status)
      throw new Error(`${url} respondeu ${response.status}`);
    mkdirSync(path.dirname(path.join(out, target)), { recursive: true });
    writeFileSync(path.join(out, target), prefixHtml(await response.text()));
  }
  await save("/", "index.html");
  for (const name of routes) await save(`/${name}`, `${name}/index.html`);
  await save("/pagina-inexistente", "404.html", 404);
} finally {
  server.kill();
}
// Toda página deve apontar para arquivos que existem na exportação.
for (const name of ["", ...routes, "404.html"]) {
  const file = name.endsWith(".html") ? name : path.join(name, "index.html");
  const html = readFileSync(path.join(out, file), "utf8");
  for (const [, asset] of html.matchAll(
    /\/Site-Grupo-Toccante\/((?:_next|media|fonts)\/[\w./-]+\.\w+)/g,
  ))
    if (!existsSync(path.join(out, asset)))
      throw new Error(`${file} aponta para ${asset}, que não existe`);
}
console.log(`dist/pages pronto: ${routes.length + 2} páginas`);
