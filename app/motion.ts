"use client";
import { useEffect, type RefObject } from "react";

/**
 * Movimento do site: revelação suave ao rolar, leve paralaxe nas molduras e
 * estado do cabeçalho. Sem JavaScript (ou com movimento reduzido) todo o
 * conteúdo permanece visível.
 */
export function useMotion(main: RefObject<HTMLElement | null>, page: string) {
  useEffect(() => {
    const root = main.current;
    if (!root) return;
    const header = document.querySelector<HTMLElement>(".site-header");
    function onHeader() {
      header?.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    onHeader();
    window.addEventListener("scroll", onHeader, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup: (() => void) | undefined;
    function start() {
      cleanup?.();
      cleanup = undefined;
      if (reduce.matches || !root) return;
      const items = new Set<HTMLElement>();
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        items.add(el);
      });
      root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((g) => {
        Array.from(g.children).forEach((child, index) => {
          const el = child as HTMLElement;
          el.style.setProperty("--d", `${Math.min(index, 8) * 90}ms`);
          items.add(el);
        });
      });
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      const limit = window.innerHeight * 0.92;
      items.forEach((el) => {
        // O que já está na tela ao carregar não é escondido: evita piscar.
        if (el.getBoundingClientRect().top < limit) return;
        el.classList.add("rv");
        observer.observe(el);
      });

      const floats = Array.from(
        root.querySelectorAll<HTMLElement>("[data-parallax]"),
      );
      let frame = 0;
      function update() {
        frame = 0;
        const mid = window.innerHeight / 2;
        for (const el of floats) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom < -200 || rect.top > window.innerHeight + 200)
            continue;
          const speed = Number(el.dataset.parallax) || 0.06;
          const offset = (rect.top + rect.height / 2 - mid) * -speed;
          el.style.setProperty("--py", `${offset.toFixed(1)}px`);
        }
      }
      function onScroll() {
        if (!frame) frame = requestAnimationFrame(update);
      }
      if (floats.length) {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
      }
      cleanup = () => {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(frame);
        items.forEach((el) => el.classList.remove("rv", "in"));
        floats.forEach((el) => el.style.removeProperty("--py"));
      };
    }
    start();
    reduce.addEventListener("change", start);
    return () => {
      cleanup?.();
      reduce.removeEventListener("change", start);
      window.removeEventListener("scroll", onHeader);
    };
  }, [main, page]);
}
