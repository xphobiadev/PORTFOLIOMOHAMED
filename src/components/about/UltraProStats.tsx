"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import type { LocalizedStatV3 } from "@/lib/i18n/about-page-data";

interface UltraProStatsProps {
    stats: LocalizedStatV3[];
}

export function UltraProStats({ stats }: UltraProStatsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2, margin: "0px 0px -48px 0px" });

    return (
        <section className="relative z-10 border-y border-white/5 bg-white/[0.01] backdrop-blur-3xl">
            <div
                ref={containerRef}
                className="container-site grid min-w-0 grid-cols-2 divide-x divide-y divide-white/5 lg:grid-cols-6 lg:divide-y-0"
            >
                {stats.map((stat, i) => (
                    <StatCounter
                        key={stat.id || i}
                        stat={stat}
                        start={isInView}
                        index={i}
                    />
                ))}
            </div>
        </section>
    );
}

function StatCounter({ stat, start, index }: { stat: LocalizedStatV3; start: boolean; index: number }) {
    const valueRef = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (start && !hasAnimated && valueRef.current) {
            const endValue = stat.value;

            gsap.to(valueRef.current, {
                innerHTML: endValue,
                duration: 2.5,
                ease: "power2.out",
                delay: index * 0.1,
                snap: { innerHTML: 1 },
                onUpdate: function () {
                    if (valueRef.current) {
                        valueRef.current.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toString();
                    }
                }
            });

            setHasAnimated(true);
        }
    }, [start, hasAnimated, stat.value, index]);

    return (
        <div className="group relative flex min-w-0 flex-col items-center justify-center p-5 transition-all duration-500 hover:bg-white/[0.03] sm:p-8 lg:p-12">
            <div className="relative font-display text-3xl font-bold tabular-nums tracking-normal text-white transition-all duration-500 group-hover:text-mb-gold group-hover:scale-110 sm:text-5xl lg:text-6xl">
                <span ref={valueRef}>0</span>
                <span className="gold-text-shimmer ml-1">{stat.suffix}</span>
            </div>
            <p className="mt-3 max-w-full break-words text-center text-[9px] font-bold uppercase tracking-[0.18em] text-white/30 transition-colors duration-500 group-hover:text-white/60 sm:mt-4 sm:text-[10px] sm:tracking-[0.3em]">
                {stat.label}
            </p>
        </div>
    );
}
