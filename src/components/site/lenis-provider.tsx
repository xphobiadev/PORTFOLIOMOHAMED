"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis + native scroll: smooth wheel only on large viewports with fine pointer.
 * On phones / coarse pointers we use native scrolling so ScrollTrigger and
 * touch momentum stay reliable (avoids "stuck" scrub / pin animations).
 * When Lenis runs, drive it from gsap.ticker and forward scroll to ScrollTrigger.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mqLenis = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    const teardown = () => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        lenisRef.current = null;
      }
      gsap.ticker.remove(rafLenis);
      ScrollTrigger.refresh();
    };

    const rafLenis = (time: number) => {
      lenisRef.current?.raf(time * 1000);
    };

    const setup = () => {
      teardown();

      if (!mqLenis.matches) {
        ScrollTrigger.refresh();
        return;
      }

      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        touchMultiplier: 1.5
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(rafLenis);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();
    };

    setup();
    mqLenis.addEventListener("change", setup);

    return () => {
      mqLenis.removeEventListener("change", setup);
      teardown();
    };
  }, []);

  return <>{children}</>;
}
