import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "/Users/layonduarte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import AxeBuilder from "@axe-core/playwright";
const browser = await chromium.launch({
  headless: true,
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const context = await browser.newContext({
  permissions: ["clipboard-read", "clipboard-write"],
  reducedMotion: "reduce",
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const base = process.env.TEST_BASE_URL || "http://localhost:4173";
const out = "../review/interactions";
await fs.mkdir(out, { recursive: true });
const routes = [
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
const a11y = [];
const links = new Set();
for (const width of [390, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of routes) {
    await page.goto(base + route);
    await page.evaluate(() => document.fonts.ready);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    a11y.push({
      width,
      route,
      violations: audit.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
    for (const href of await page
      .locator("a")
      .evaluateAll((as) => as.map((a) => a.getAttribute("href"))))
      if (href?.startsWith("/")) links.add(href);
    for (const href of await page
      .locator('a[href^="#"]')
      .evaluateAll((as) => as.map((a) => a.getAttribute("href"))))
      assert.ok(await page.locator(href).count(), `anchor ${href} on ${route}`);
  }
}
await fs.writeFile(`${out}/accessibility.json`, JSON.stringify(a11y, null, 2));
for (const href of links) {
  const res = await page.request.get(base + href);
  assert.equal(res.status(), 200, href);
}
await page.setViewportSize({ width: 320, height: 640 });
await page.goto(base);
await page.getByRole("button", { name: /^Menu/ }).click();
assert.equal(
  await page.locator("#mobile-menu").evaluate((el) => el.open),
  true,
);
for (let i = 0; i < 20; i++) {
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    true,
  );
}
await page.screenshot({ path: `${out}/menu-320.png` });
await page.keyboard.press("Escape");
assert.equal(
  await page.locator("#mobile-menu").evaluate((el) => el.open),
  false,
);
assert.ok(
  await page
    .getByRole("button", { name: /^Menu/ })
    .evaluate((el) => el === document.activeElement),
);
await page.locator(".faq-list summary").first().focus();
await page.keyboard.press("Enter");
assert.ok(
  await page
    .locator(".faq-list details")
    .first()
    .evaluate((el) => el.open),
);
await page.goto(base + "/portfolio?vertente=musica");
await page.waitForFunction(
  () => document.querySelectorAll(".portfolio-grid figure").length === 3,
);
await page.getByRole("button", { name: "Buffet", exact: true }).click();
assert.equal(await page.locator(".portfolio-grid figure").count(), 2);
await page
  .getByRole("button", { name: /Ampliar fotografia/ })
  .first()
  .click();
assert.equal(
  await page.locator(".photo-dialog").evaluate((el) => el.open),
  true,
);
await page.screenshot({ path: `${out}/photo-modal-320.png` });
await page.keyboard.press("Escape");
assert.equal(
  await page.locator(".photo-dialog").evaluate((el) => el.open),
  false,
);
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base + "/contato?vertente=musica");
await page.waitForFunction(
  () => document.querySelector('input[value="Música"]').checked,
);
await page.getByRole("button", { name: "Continuar", exact: false }).click();
assert.ok(await page.locator("#tipo-error").isVisible());
assert.ok(await page.locator("#cidade-error").isVisible());
await page
  .getByRole("button", { name: "Quero a experiência completa" })
  .click();
assert.equal(await page.locator("input[name=vertentes]:checked").count(), 4);
await page.getByLabel("Tipo de evento").selectOption("Casamento");
await page.getByLabel("Cidade").fill("Belo Horizonte");
await page.getByLabel("Data do evento").fill("2020-01-01");
await page.getByRole("button", { name: "Continuar", exact: false }).click();
assert.ok(await page.locator("#data-error").isVisible());
await page.getByLabel("Data do evento").fill("2027-04-21");
await page.getByLabel("Quantidade de convidados").fill("150");
await page.getByRole("button", { name: "Continuar", exact: false }).click();
await page
  .getByRole("button", { name: "Preparar meu resumo", exact: false })
  .click();
assert.ok(await page.locator("#nome-error").isVisible());
assert.ok(await page.locator("#telefone-error").isVisible());
assert.ok(await page.locator("#consentimento-error").isVisible());
await page.screenshot({ path: `${out}/form-errors-390.png`, fullPage: true });
await page.getByLabel("Nome", { exact: false }).fill("Cliente de teste");
await page.getByLabel("Telefone com DDD").fill("(31) 99999-9999");
await page.getByLabel("E-mail (opcional)").fill("teste@example.com");
await page.getByLabel("Local do evento (opcional)").fill("Local de teste");
await page.getByLabel("Preferências (opcional)").fill("Música instrumental");
await page
  .getByLabel("Outras informações (opcional)")
  .fill("Teste de funcionamento, sem envio.");
await page.getByRole("checkbox", { name: /Concordo/ }).check();
await page
  .getByRole("button", { name: "Preparar meu resumo", exact: false })
  .click();
const summary = await page.getByLabel("Resumo do pedido").inputValue();
assert.match(summary, /Música, Buffet, Decoração, Cerimonial/);
assert.match(summary, /21\/04\/2027/);
assert.match(summary, /Música instrumental/);
assert.match(summary, /teste@example.com/);
assert.equal(
  await page
    .getByRole("link", { name: /2. Abrir atendimento/ })
    .getAttribute("href"),
  "https://grupotoccanteoficial.github.io/Link.toccante/",
);
await page.getByRole("button", { name: /1. Copiar resumo/ }).click();
assert.equal(
  await page.evaluate(() => navigator.clipboard.readText()),
  summary,
);
await page.screenshot({ path: `${out}/form-summary-390.png`, fullPage: true });
const formAxe = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
  .analyze();
a11y.push({
  width: 390,
  route: "form-summary",
  violations: formAxe.violations,
});
await page.getByRole("button", { name: /Editar meus dados/ }).click();
assert.equal(
  await page.getByLabel("Nome", { exact: false }).inputValue(),
  "Cliente de teste",
);
await page.getByRole("button", { name: /Voltar/ }).click();
assert.equal(await page.locator("input[name=vertentes]:checked").count(), 4);
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(base);
await page.locator(".branch-menu summary").focus();
await page.keyboard.press("Enter");
assert.ok(await page.locator(".branch-menu").evaluate((el) => el.open));
await page
  .getByRole("navigation", { name: "Navegação principal" })
  .getByRole("link", { name: "Cerimonial", exact: true })
  .click();
await page.waitForURL("**/cerimonial");
assert.ok(await page.locator("h1").textContent());
assert.deepEqual(errors, []);
await fs.writeFile(`${out}/accessibility.json`, JSON.stringify(a11y, null, 2));
const failures = a11y.filter((x) => x.violations.length);
console.log(
  JSON.stringify(
    {
      routes: routes.length,
      links: links.size,
      keyboard: "passed",
      forms: "passed",
      clipboard: "passed",
      portfolio: "passed",
      errors,
      a11y: failures,
    },
    null,
    2,
  ),
);
await browser.close();
assert.equal(failures.length, 0, "Axe violations");
