"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTextScramble } from "@/hooks/useTextScramble";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import type { LocalizedAboutHero } from "@/lib/i18n/about-page-data";

interface UltraProHeroProps {
    data: LocalizedAboutHero;
}

export function UltraProHero({ data }: UltraProHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
    const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

    const { displayText } = useTextScramble({
        text: data.tagline,
        speed: 40,
        delay: 500
    });

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen w-full items-center overflow-hidden border-b border-white/8 pb-20 pt-32"
        >
            {data.portrait_url && (
                <motion.img
                    src={data.portrait_url}
                    alt=""
                    style={{ y, opacity }}
                    className="absolute inset-y-0 right-0 hidden h-full w-[56vw] object-cover opacity-20 grayscale lg:block"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/92 to-[#070707]/55" />
            
            {/* Anamorphic Flare Effect */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-mb-gold/20 blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 pointer-events-none" />

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-1/3 overflow-hidden text-center opacity-[0.02]">
                <span className="font-display text-[25vw] font-bold uppercase leading-none select-none">VISIONARY</span>
            </div>

            <div className="container-site relative z-10 grid min-w-0 gap-20 lg:grid-cols-[1fr_480px] lg:items-center">
                <div className="z-10 flex min-w-0 flex-col items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-10 flex items-center gap-4"
                    >
                        <span className="h-[1px] w-12 bg-mb-gold/60" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-mb-gold">
                            {data.badge_text}
                        </span>
                    </motion.div>

                    <h1 className="break-words font-display text-[clamp(4rem,14vw,12rem)] font-bold uppercase leading-[0.8] tracking-[-0.04em] mb-12">
                        <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="block text-white"
                        >
                            {data.title_1}
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="block gold-text-shimmer italic"
                        >
                            {data.title_2}
                        </motion.span>
                    </h1>

                    <div className="max-w-2xl border-l border-white/10 pl-8">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="text-xl md:text-2xl font-light leading-relaxed text-white/50"
                        >
                            {data.subtitle}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="mt-8 min-h-6 font-mono text-[10px] uppercase tracking-[0.4em] text-mb-gold/40"
                    >
                        {displayText}
                    </motion.div>

                    <motion.a
                        href={data.cta_url || "#timeline"}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="group relative mt-16 inline-flex items-center gap-8 px-12 py-6 rounded-full border border-mb-gold/30 bg-mb-gold/5 text-[11px] font-bold uppercase tracking-[0.5em] text-mb-gold transition-all duration-500 hover:bg-mb-gold hover:text-black hover:scale-110"
                    >
                        {data.cta_text}
                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </motion.a>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative mx-auto aspect-[3/4] w-full"
                >
                    {/* Portrait Frame Elements */}
                    <div className="absolute -inset-8 bg-mb-gold/5 opacity-0 blur-[100px] transition-opacity duration-1000 group-hover:opacity-100 pointer-events-none" />
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-mb-gold/40 to-transparent" />
                    <div className="absolute -right-10 top-1/2 -translate-y-1/2 h-40 w-[1px] bg-gradient-to-b from-transparent via-mb-gold/40 to-transparent" />
                    
                    {/* Tech Meta Overlays */}
                    <div className="absolute -top-6 -right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-mb-gold animate-pulse" />
                            <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/60">ID: MB_CORE_01</span>
                        </div>
                    </div>

                    <div className="relative h-full w-full overflow-hidden rounded-[40px] border border-white/10 bg-[#0a0a0a] shadow-2xl transition-all duration-700 group-hover:border-mb-gold/35 group-hover:shadow-[0_0_100px_rgba(200,162,74,0.1)]">
                        {data.portrait_url ? (
                            <img
                                src={data.portrait_url}
                                alt="Mohamed Bouliani"
                                className="h-full w-full object-cover grayscale-[0.3] transition-all duration-[2000ms] ease-out group-hover:scale-110 group-hover:grayscale-0"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center font-mono text-xs text-white/10 uppercase tracking-[0.5em]">
                                [SYSTEM_SCANNING]
                            </div>
                        )}

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
