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
        <section className="relative z-10 bg-[#070707] py-20 sm:py-24 lg:py-40">
            <div className="container-site min-w-0">
                <div className="mb-16 text-center sm:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8 flex max-w-full items-center justify-center gap-3 sm:gap-4"
                    >
                        <span className="h-[1px] w-8 shrink-0 bg-mb-gold/60 sm:w-12" />
                        <span className="min-w-0 break-words text-[10px] font-bold uppercase tracking-[0.22em] text-mb-gold sm:tracking-[0.5em]">
                            {aboutUi.eduTitleBefore}
                        </span>
                        <span className="h-[1px] w-8 shrink-0 bg-mb-gold/60 sm:w-12" />
                    </motion.div>
                    <h2 className="max-w-full break-words font-display text-4xl font-bold uppercase tracking-normal text-white sm:text-7xl md:text-8xl">
                        <span className="gold-text-shimmer italic">{aboutUi.eduTitleGold}</span>
                    </h2>
                    <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-white/40 sm:mt-10 sm:text-xl">{aboutUi.eduIntro}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {education.map((edu, index) => (
                        <motion.div
                            key={edu.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group flex min-w-0 items-start gap-5 rounded-[24px] border border-white/5 bg-white/[0.01] p-5 backdrop-blur-3xl transition-all duration-700 hover:border-mb-gold/30 hover:bg-white/[0.03] hover:shadow-[0_0_50px_rgba(200,162,74,0.05)] sm:items-center sm:gap-8 sm:rounded-[32px] sm:p-8"
                        >
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-white/5 border border-white/5 transition-all duration-700 group-hover:border-mb-gold/40 group-hover:bg-mb-gold/10 group-hover:scale-110">
                                {getIcon(edu.type)}
                            </div>

                            <div className="min-w-0 flex-1">
                                <h4 className="w-full break-words font-display text-lg font-bold uppercase tracking-normal text-white transition-colors duration-500 group-hover:text-mb-gold sm:text-xl">{edu.institution}</h4>
                                <p className="mb-3 w-full break-words text-sm font-light text-white/40 transition-colors duration-500 group-hover:text-white/60">{edu.title}</p>
                                <div className="break-words font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-mb-gold/60 sm:tracking-[0.3em]">
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
