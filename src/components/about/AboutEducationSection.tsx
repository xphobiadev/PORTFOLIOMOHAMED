"use client";

import type { LocalizedEducation } from "@/lib/i18n/about-page-data";
import type { AboutUiCopy } from "@/lib/i18n/about-ui";
import { GraduationCap, Landmark, Laptop, Award } from "lucide-react";
import { motion } from "framer-motion";

interface AboutEducationSectionProps {
    education: LocalizedEducation[];
    aboutUi: AboutUiCopy;
}

export function AboutEducationSection({ education, aboutUi }: AboutEducationSectionProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case "university":
                return <Landmark size={24} className="text-mb-gold/60" />;
            case "bootcamp":
                return <Laptop size={24} className="text-mb-gold/60" />;
            case "online":
                return <GraduationCap size={24} className="text-mb-gold/60" />;
            default:
                return <Award size={24} className="text-mb-gold" />;
        }
    };

    return (
        <section className="relative z-10 bg-[#070707] py-24 lg:py-40">
            <div className="container-site min-w-0">
                <div className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8 flex items-center justify-center gap-4"
                    >
                        <span className="h-[1px] w-12 bg-mb-gold/60" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-mb-gold">
                            {aboutUi.eduTitleBefore}
                        </span>
                        <span className="h-[1px] w-12 bg-mb-gold/60" />
                    </motion.div>
                    <h2 className="font-display text-5xl font-bold uppercase tracking-[-0.04em] sm:text-7xl md:text-8xl text-white">
                        <span className="gold-text-shimmer italic">{aboutUi.eduTitleGold}</span>
                    </h2>
                    <p className="mx-auto mt-10 max-w-2xl font-light text-white/40 text-xl leading-relaxed">{aboutUi.eduIntro}</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {education.map((edu, index) => (
                        <motion.div
                            key={edu.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group flex items-center gap-8 rounded-[32px] border border-white/5 bg-white/[0.01] p-8 backdrop-blur-3xl transition-all duration-700 hover:border-mb-gold/30 hover:bg-white/[0.03] hover:shadow-[0_0_50px_rgba(200,162,74,0.05)]"
                        >
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-white/5 border border-white/5 transition-all duration-700 group-hover:border-mb-gold/40 group-hover:bg-mb-gold/10 group-hover:scale-110">
                                {getIcon(edu.type)}
                            </div>

                            <div className="min-w-0 flex-1">
                                <h4 className="w-full truncate font-display text-xl font-bold uppercase tracking-tight text-white group-hover:text-mb-gold transition-colors duration-500">{edu.institution}</h4>
                                <p className="mb-3 w-full truncate text-sm font-light text-white/40 group-hover:text-white/60 transition-colors duration-500">{edu.title}</p>
                                <div className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-mb-gold/60">
                                    {edu.year_start} {edu.year_end ? `— ${edu.year_end}` : ""}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
