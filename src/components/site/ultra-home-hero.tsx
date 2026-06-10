"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

interface UltraHomeHeroProps {
    h: any;
    ui: any;
}

export function UltraHomeHero({ h, ui }: UltraHomeHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <section ref={containerRef} className="relative min-h-[100svh] w-full overflow-hidden bg-black">
            <motion.div style={{ y: smoothY, opacity, scale }} className="absolute inset-0 z-0">
                {h.background_url ? (
                    <div className="relative h-full w-full">
                        {h.background_url.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video
                                src={h.background_url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full object-cover brightness-[0.58] contrast-[1.08]"
                            />
                        ) : (
                            <img
                                src={h.background_url}
                                className="h-full w-full object-cover brightness-[0.58] contrast-[1.08]"
                                alt=""
                            />
                        )}
                    </div>
                ) : (
                    <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(200,162,74,0.16),transparent_42%),linear-gradient(135deg,#050505,#151515)]" />
                )}
            </motion.div>

            <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/72 to-black/20" />
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-mb-bg via-transparent to-black/30" />
            <div className="absolute inset-0 z-[2] bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:100%_6px] opacity-40" />

            <div className="container-site relative z-10 flex min-h-[100svh] items-end pb-28 pt-36 sm:pb-32 lg:pb-36">
                <div className="max-w-6xl">
                    <div className="mb-7 flex flex-wrap items-center gap-4">
                        <span className="inline-flex h-9 items-center gap-2 border border-mb-gold/30 bg-mb-gold/10 px-4 text-[10px] font-bold uppercase tracking-[0.34em] text-mb-gold">
                            <Sparkles size={13} />
                            {h.title_1 || "CRAFTING"}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-white/38">
                            {ui.heroMeta}
                        </span>
                    </div>

                    <h1 className="font-display text-[clamp(3.1rem,11vw,11rem)] font-bold leading-[0.84] uppercase text-white">
                        <span className="block">{h.title_2 || "DESIGN"}</span>
                        <span className="block italic gold-text-shimmer">{h.title_3 || "VISIONS"}</span>
                    </h1>

                    <div className="mt-10 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,620px)_1fr] lg:items-end">
                        <p className="border-l border-mb-gold/35 pl-6 text-base font-light leading-8 text-white/68 md:text-xl md:leading-9">
                            {h.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4 lg:justify-end">
                            <a href={h.cta_primary_url} className="btn-gold group">
                                <span>{h.cta_primary_label}</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a href={h.cta_secondary_url} className="btn-ghost group">
                                <Play className="h-3 w-3 fill-current transition-transform group-hover:scale-110" />
                                <span>{h.cta_secondary_label}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-[12] border-t border-white/10 bg-black/78 px-4 py-4 backdrop-blur-xl sm:px-10">
                <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4">
                    <div className="flex min-w-0 gap-4 text-[8px] font-bold uppercase tracking-[0.2em] text-white/32 sm:gap-10 sm:text-[9px] sm:tracking-[0.3em]">
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-mb-gold animate-pulse shrink-0" />
                            <span className="truncate">{ui.liveReel}</span>
                        </div>
                        <div className="hidden sm:block">{ui.heroBase}</div>
                    </div>

                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="hidden flex-col items-center gap-1 sm:flex"
                    >
                        <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/40">{ui.scroll}</span>
                        <div className="h-4 w-[1px] bg-gradient-to-b from-mb-gold/60 to-transparent" />
                    </motion.div>

                    <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20 text-right">
                        {ui.filmmaker}<br/>
                        <span className="text-white/40 font-bold">{ui.creativeDirection}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
