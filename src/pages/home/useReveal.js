import { useEffect, useRef } from "react";

/**
 * Scroll-reveal for the homepage sections.
 *
 * Returns a ref for a container; every descendant carrying `data-reveal` gets
 * the `is-revealed` class the first time it scrolls into view, staggered by its
 * position in the container.
 *
 * The hidden state is applied here rather than in CSS on purpose: if the
 * observer never runs — no IntersectionObserver, JS disabled mid-page — the
 * content stays visible instead of being permanently invisible.
 */
export function useReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const items = Array.from(container.querySelectorAll("[data-reveal]"));
    if (items.length === 0) return undefined;

    const reduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    if (reduced || typeof IntersectionObserver === "undefined") {
      items.forEach((item) => item.classList.add("is-revealed"));
      return undefined;
    }

    items.forEach((item) => item.classList.add("reveal-armed"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const group = Array.from(
            entry.target.parentElement?.querySelectorAll("[data-reveal]") ?? []
          );
          const delay = Math.min(group.indexOf(entry.target), 5) * 90;

          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}
