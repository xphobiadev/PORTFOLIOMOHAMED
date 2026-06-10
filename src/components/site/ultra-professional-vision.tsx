"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Locale } from "@/types/i18n";
import { getIcon } from "@/lib/icons";

interface UltraProfessionalVisionProps {
    sc: any;
    stats: any[];
    services: any[];
    locale: Locale;
}

export function UltraProfessionalVision({ sc, stats, services, locale }: UltraProfessionalVisionProps) {
    const copy = {
        vision: locale === "en" ? "THE VISION" : "LA VISION",
        transformFallback: locale === "en" ? "TRANSFORMING" : "TRANSFORMER",
        ideasInto: locale === "en" ? "IDEAS INTO" : "LES IDÉES EN",
        reality: locale === "en" ? "REALITY" : "RÉALITÉ",
        subtitle:
            locale === "en"
                ? "Every frame is a story waiting to be told. My approach blends technical precision with artistic soul."
                : "Chaque image porte une histoire. Mon approche mêle précision technique et sens artistique.",
        expertiseIndex: locale === "en" ? "EXPERTISE INDEX" : "INDEX D'EXPERTISE",
        standards:
            locale === "en"
                ? "ALL PRODUCTIONS COMPLETED TO INDUSTRY STANDARDS"
                : "PRODUCTIONS LIVRÉES AUX STANDARDS PROFESSIONNELS",
        side: locale === "en" ? "PROFESSIONAL SERVICES" : "SERVICES PROFESSIONNELS",
    };

    return (
        <section className="py-24 lg:py-32 relative overflow-hidden bg-mb-bg border-y border-white/5">
            <div className="container-site">
                <div className="grid lg:grid-cols-[1fr_500px] gap-24 items-start">
                    {/* Left Column: Vision & Narrative */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-mb-gold mb-10 block">
                                {sc.section_label || copy.vision}
                            </span>
                            
                            <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.9] mb-16 text-white">
                                {sc.section_title || copy.transformFallback} <br/>
                                <span className="text-white/10">{copy.ideasInto}</span> <br/>
                                <span className="gold-text-shimmer">{copy.reality}</span>
                            </h2>

                            <div className="max-w-xl">
                                <p className="text-xl md:text-2xl font-light leading-relaxed text-white/50 mb-16 border-l-2 border-mb-gold/20 pl-10">
                                    {sc.section_subtitle || copy.subtitle}
                                </p>
                            </div>

                            {/* Integrated Stats as Production Figures */}
                            <div className="grid grid-cols-2 gap-12 pt-16 border-t border-white/5">
                                {stats.map((stat) => {
                                    const Icon = getIcon(stat.icon);
                                    return (
                                        <div key={stat.id} className="group">
                                            <div className="flex items-center gap-4 mb-4">
                                                <Icon size={16} className="text-mb-gold/40 group-hover:text-mb-gold transition-colors" />
                                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">{stat.label}</span>
                                            </div>
                                            <div className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter tabular-nums">
                                                {stat.value}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Expertise Index */}
                    <div className="lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="p-12 rounded-[50px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl relative overflow-hidden"
                        >
                            <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-white/20 mb-12 flex items-center gap-4">
                                <span className="h-[1px] w-8 bg-white/10" />
                                {copy.expertiseIndex}
                            </h3>

                            <div className="space-y-4">
                                {services.map((service, i) => (
                                    <div 
                                        key={service.id}
                                        className="group relative flex items-center justify-between p-6 rounded-3xl transition-all duration-500 hover:bg-white/[0.03] hover:translate-x-2"
                                    >
                                        <div className="flex items-center gap-6">
                                            <span className="text-xs font-display text-mb-gold/40 group-hover:text-mb-gold transition-colors tabular-nums">0{i + 1}</span>
                                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">{service.title}</h4>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <Zap size={14} className="text-mb-gold" />
                                        </div>
                                        
                                        {/* Hover Line */}
                                        <div className="absolute left-6 right-6 bottom-0 h-[1px] bg-white/5 scale-x-100 group-hover:scale-x-0 transition-transform origin-left duration-500" />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 pt-10 border-t border-white/5 text-center">
                                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">
                                    {copy.standards}
                                </p>
                            </div>
                            
                            {/* Ambient Glow */}
                            <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-mb-gold/5 blur-[100px] rounded-full" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Side Indicators */}
            <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden xl:block">
                <span className="text-[8px] font-bold uppercase tracking-[0.8em] text-white/10 vertical-text">{copy.side}</span>
            </div>
        </section>
    );
}
