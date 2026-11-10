"use client";
import { useEffect, type RefObject } from "react";

/** Layout and navigation remain usable before the animation module loads. */
export function useEditorialMotion(
  main: RefObject<HTMLElement | null>,
  page: string,
) {
  useEffect(() => {
    const root = main.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let generation = 0;
    let clear: (() => void) | undefined;
    function refresh() {
      const current = ++generation;
      clear?.();
      clear = undefined;
      if (preference.matches || !root) return;
      const scope = root;
      void import("gsap")
        .then(({ gsap }) => {
          if (generation !== current) return;
          const context = gsap.context(() => {}, scope);
          const observer = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                observer.unobserve(entry.target);
                if (entry.target.contains(document.activeElement)) continue;
                context.add(() => {
                  const photo = entry.target.matches(
                    ".work-frame, .chapter-cover, .masthead-image",
                  );
                  gsap.fromTo(
                    entry.target,
                    photo
                      ? { clipPath: "inset(0% 0% 8% 0%)", opacity: 0.8 }
                      : { y: 13, opacity: 0.8 },
                    {
                      ...(photo
                        ? { clipPath: "inset(0% 0% 0% 0%)" }
                        : { y: 0 }),
                      opacity: 1,
                      duration: 0.55,
                      ease: "power2.out",
                      clearProps: photo
                        ? "clipPath,opacity"
                        : "transform,opacity",
                    },
                  );
                });
              }
            },
            { threshold: 0.09 },
          );
          scope
            .querySelectorAll(
              ".section-heading, .section-heading-row, .house-story, .cta-inner, .work-frame, .chapter-cover, .masthead-image, .branch-hero-copy",
            )
            .forEach((el) => observer.observe(el));
          const scene = scope.querySelector<HTMLElement>(".cinema-scene");
          let frame = 0;
          let visible = false;
          function update() {
            frame = 0;
            if (!scene || !visible) return;
            const top = scene.parentElement?.getBoundingClientRect().top ?? 0;
            scene.style.setProperty(
              "--drift",
              Math.min(24, Math.max(0, -top * 0.055)) + "px",
            );
          }
          function scroll() {
            if (visible && !frame) frame = requestAnimationFrame(update);
          }
          const visibility = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) scroll();
          });
          if (scene) {
            visibility.observe(scene);
            window.addEventListener("scroll", scroll, { passive: true });
          }
          clear = () => {
            observer.disconnect();
            visibility.disconnect();
            window.removeEventListener("scroll", scroll);
            cancelAnimationFrame(frame);
            scene?.style.removeProperty("--drift");
            context.revert();
          };
        })
        .catch(() => {
          /* Static presentation is fully visible. */
        });
    }
    refresh();
    preference.addEventListener("change", refresh);
    return () => {
      ++generation;
      clear?.();
      preference.removeEventListener("change", refresh);
    };
  }, [main, page]);
}
