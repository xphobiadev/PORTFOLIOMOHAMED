"use client";

import type { LocalizedSpecialization } from "@/lib/i18n/about-page-data";
import type { AboutUiCopy } from "@/lib/i18n/about-ui";
import { Camera, Palette, Film, Music, Layout, Code } from "lucide-react";
import { motion } from "framer-motion";

const ICONS: Record<string, React.ReactNode> = {
    camera: <Camera size={24} />,
    palette: <Palette size={24} />,
    film: <Film size={24} />,
    music: <Music size={24} />,
    layout: <Layout size={24} />,
    code: <Code size={24} />
};

interface AboutSpecializationsSectionProps {
    specializations: LocalizedSpecialization[];
    aboutUi: AboutUiCopy;
}

export function AboutSpecializationsSection({ specializations, aboutUi }: AboutSpecializationsSectionProps) {
    return (
        <section className="relative z-10 bg-[#070707] py-20 sm:py-24 lg:py-40">
            <div className="container-site min-w-0">
                <div className="mb-16 sm:mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-8 flex max-w-full items-center gap-3 sm:gap-4"
                    >
                        <span className="h-[1px] w-8 shrink-0 bg-mb-gold/60 sm:w-12" />
                        <span className="min-w-0 break-words text-[10px] font-bold uppercase tracking-[0.22em] text-mb-gold sm:tracking-[0.5em]">
                            {aboutUi.specsTitleLine1}
                        </span>
                    </motion.div>
                    
                    <h2 className="max-w-full break-words font-display text-4xl font-bold uppercase tracking-normal text-white sm:text-7xl md:text-8xl lg:text-9xl">
                        <span className="gold-text-shimmer italic">{aboutUi.specsTitleGold}</span>
                    </h2>
                    <p className="mt-8 max-w-2xl border-l border-white/10 pl-5 text-base font-light leading-relaxed text-white/40 sm:mt-10 sm:pl-8 sm:text-xl">{aboutUi.specsIntro}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                    {specializations.map((spec, index) => (
                        <motion.div
                            key={spec.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative overflow-hidden rounded-[28px] border border-white/5 bg-white/[0.01] p-6 backdrop-blur-3xl transition-all duration-700 hover:border-mb-gold/30 hover:shadow-[0_0_80px_rgba(200,162,74,0.1)] sm:rounded-[40px] sm:p-10"
                        >
                            {/* Anamorphic Flare Effect */}
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-mb-gold/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                            <div
                                className="absolute right-0 top-0 p-6 opacity-5 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-20 sm:p-10"
                                style={{ color: spec.color || "#fff" }}
                            >
                                {ICONS[spec.icon] || <Palette size={100} />}
                            </div>

                            <div className="relative z-10">
                                <div
                                    className="mb-10 flex h-20 w-20 items-center justify-center rounded-[24px] bg-white/5 border border-white/5 shadow-xl transition-all duration-700 group-hover:border-mb-gold/40 group-hover:bg-mb-gold/10"
                                    style={{ color: spec.color || "#c9a45c" }}
                                >
                                    {ICONS[spec.icon] || <Palette size={32} />}
                                </div>

                                <h3 className="mb-8 break-words font-display text-2xl font-bold uppercase tracking-normal text-white transition-colors duration-500 group-hover:text-mb-gold sm:text-3xl">{spec.title}</h3>

                                <ul className="flex flex-wrap gap-3">
                                    {spec.items.map((item, i) => (
                                        <li
                                            key={i}
                                            className="max-w-full break-words rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50 transition-all duration-500 group-hover:bg-white/10 group-hover:text-white sm:px-5 sm:tracking-widest"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="absolute -bottom-10 -left-10 hidden h-32 w-32 rounded-full bg-mb-gold/5 opacity-0 blur-[50px] transition-opacity duration-1000 group-hover:opacity-100 sm:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
