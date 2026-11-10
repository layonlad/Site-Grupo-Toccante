import test from "node:test";
import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://localhost:4173";
const pages = [
  "/",
  "/quem-somos",
  "/musica",
  "/buffet",
  "/decoracao",
  "/cerimonial",
  "/equipe",
  "/portfolio",
  "/contato",
  "/privacidade",
];
test("all routes render unique titles, descriptions, one heading and verified identity", async () => {
  const titles = new Set();
  for (const path of pages) {
    const res = await fetch(base + path);
    assert.equal(res.status, 200, path);
    const html = await res.text();
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert.ok(title, path);
    assert.ok(!titles.has(title), `duplicate title ${path}`);
    titles.add(title);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, path);
    assert.match(html, /<meta name="description"/);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /Grupo Toccante/);
    assert.doesNotMatch(
      html,
      /\[Adicionar|Sugestão provisória|Your site is taking shape/,
    );
    assert.doesNotMatch(html, /5531983858509|grupotoccante@gmail.com/);
  }
});
test("missing route returns a real 404 with recovery navigation", async () => {
  const res = await fetch(base + "/pagina-inexistente");
  assert.equal(res.status, 404);
  assert.match(await res.text(), /Voltar ao início/);
});
test("brand, self-hosted fonts and responsive hero assets are served", async () => {
  for (const path of [
    "/brand.svg",
    "/fonts/EBGaramond.woff2",
    "/fonts/Lato-Regular.woff2",
    "/fonts/Lato-Bold.woff2",
    "/media/decoracao-mesa-bolo-843.webp",
    "/robots.txt",
    "/sitemap.xml",
  ])
    assert.equal((await fetch(base + path)).status, 200, path);
});
