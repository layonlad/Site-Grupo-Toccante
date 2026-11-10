import { chromium } from "/Users/layonduarte/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";
import fs from "node:fs/promises";
const stage = process.argv[2] || "before";
const out = `../review/${stage}`;
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
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
  "/pagina-inexistente",
];
const widths =
  stage === "before"
    ? [390, 1440]
    : [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920];
const report = [];
for (const width of widths) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of routes) {
    const response = await page.goto("http://localhost:4173" + route);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("h1").waitFor();
    // Full-page captures include offscreen images that Chrome normally defers.
    await page.evaluate(async () => {
      for (const image of document.images) image.loading = "eager";
      await Promise.allSettled(Array.from(document.images, (image) => image.decode()));
    });
    const dimensions = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      viewport: innerWidth,
      broken: [...document.images]
        .filter((i) => i.complete && !i.naturalWidth)
        .map((i) => i.src),
      title: document.title,
      h1: document.querySelectorAll("h1").length,
    }));
    report.push({ width, route, status: response.status(), ...dimensions });
    if ([390, 768, 1440].includes(width)) {
      await page.screenshot({
        path: `${out}/${width}-${route === "/" ? "inicio" : route.slice(1)}.png`,
        fullPage: true,
      });
    }
  }
}
await fs.writeFile(
  `${out}/report.json`,
  JSON.stringify({ report, errors }, null, 2),
);
console.log(
  JSON.stringify({
    stage,
    pages: report.length,
    overflow: report.filter((x) => x.scroll > x.viewport),
    broken: report.filter((x) => x.broken.length),
    errors,
  }),
);
await browser.close();
