"use client";

import { motion } from "framer-motion";

interface WorksHeroProps {
    label: string;
    titleWords: string[];
    lastWord: string;
    subtitle: string;
}

export function WorksHero({ label, titleWords, lastWord, subtitle }: WorksHeroProps) {
    return (
        <section className="relative overflow-hidden pt-36 pb-14 sm:pt-40 lg:pt-44 lg:pb-20">
            <div className="container-site relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl"
                >
                    <div className="mb-6 flex items-center gap-4">
                        <span className="h-px w-10 bg-mb-gold/70" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-mb-gold">
                            {label}
                        </span>
                    </div>

                    <h1 className="mb-8 max-w-[9ch] break-words font-display text-[clamp(3.6rem,11vw,8.5rem)] font-bold uppercase leading-[0.86] tracking-normal text-white sm:max-w-none">
                        {titleWords.join(" ")}
                        {lastWord && (
                            <>
                                <br />
                                <span className="gold-text">{lastWord}</span>
                            </>
                        )}
                    </h1>

                    <div className="max-w-xl border-l border-mb-gold/[0.35] pl-5 sm:pl-7">
                        <p className="text-base font-light leading-7 text-white/[0.62] sm:text-lg md:text-xl">
                            {subtitle}
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/[0.08]" />
            <div className="pointer-events-none absolute right-0 top-20 z-0 hidden select-none text-right opacity-[0.025] lg:block">
                <span className="font-display text-[18vw] font-bold uppercase leading-none">WORKS</span>
            </div>
        </section>
    );
}

export function WorksStatsStrip({ stats }: { stats: any[] }) {
    return (
        <section className="border-y border-white/[0.08] bg-white/[0.015]">
            <div className="container-site grid gap-px bg-white/[0.06] sm:grid-cols-3">
                {stats.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="group bg-mb-bg px-5 py-6 transition-colors hover:bg-white/[0.025] sm:px-6 lg:px-8"
                    >
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/[0.35] transition-colors group-hover:text-mb-gold/60">
                            {item.label}
                        </p>
                        <p className="font-display text-3xl font-bold uppercase leading-none text-white sm:text-4xl lg:text-5xl tabular-nums">
                            {item.value}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
