"use client";

import { useEffect } from "react";
import gsap from "gsap";

export function HomeAnimations() {
    useEffect(() => {
        const ctx = gsap.context(() => {
            const run = () => {
                const lines = document.querySelectorAll<HTMLElement>(".hero-line");
                if (!lines.length) return;
                gsap.from(lines, {
                    y: 28,
                    opacity: 0,
                    stagger: 0.08,
                    duration: 0.75,
                    ease: "power2.out"
                });
            };
            requestAnimationFrame(() => requestAnimationFrame(run));
        });

        return () => ctx.revert();
    }, []);

    return null;
}
