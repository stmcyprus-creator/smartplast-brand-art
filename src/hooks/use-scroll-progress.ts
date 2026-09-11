import { useEffect, useRef } from "react";

/**
 * Tracks how far an element has travelled through the viewport.
 * Returns a ref holding a 0..1 value (0 = element entering, 1 = fully passed).
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = rect.height + window.innerHeight;
      const p = (window.innerHeight - rect.top) / travel;
      progress.current = Math.min(Math.max(p, 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress };
}
