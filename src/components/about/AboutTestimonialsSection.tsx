"use client";

import type { LocalizedTestimonialV3 } from "@/lib/i18n/about-page-data";
import type { AboutUiCopy } from "@/lib/i18n/about-ui";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

interface AboutTestimonialsSectionProps {
    testimonials: LocalizedTestimonialV3[];
    aboutUi: AboutUiCopy;
}

export function AboutTestimonialsSection({ testimonials, aboutUi }: AboutTestimonialsSectionProps) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="relative z-10 border-t border-white/5 bg-[#0a0a0a] py-20 sm:py-24 lg:py-40">
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
                            {aboutUi.testimonialsLine1}
                        </span>
                    </motion.div>
                    <h2 className="max-w-full break-words font-display text-4xl font-bold uppercase tracking-normal text-white sm:text-7xl md:text-8xl lg:text-9xl">
                        {aboutUi.testimonialsLine1.split(' ')[0]} <span className="text-white/10 italic">{aboutUi.testimonialsLine2}</span>
                    </h2>
                </div>

                <div className="grid gap-6 lg:grid-cols-3 lg:gap-10">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={item.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative flex flex-col justify-between rounded-[28px] border border-white/5 bg-white/[0.01] p-6 backdrop-blur-3xl transition-all duration-700 hover:border-mb-gold/30 hover:shadow-[0_0_80px_rgba(200,162,74,0.1)] sm:rounded-[40px] sm:p-12"
                        >
                            {/* Anamorphic Flare Effect */}
                            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-mb-gold/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                            <Quote
                                size={48}
                                className="absolute right-6 top-6 text-mb-gold/10 transition-all duration-700 group-hover:scale-125 group-hover:text-mb-gold/30 sm:right-12 sm:top-12"
                            />

                            <p className="italic-none relative z-10 mt-10 break-words text-base font-light leading-relaxed text-white/50 transition-colors duration-500 group-hover:text-white/80 sm:text-xl">
                                &ldquo;{item.quote}&rdquo;
                            </p>

                            <div className="mt-10 flex min-w-0 items-center gap-4 sm:mt-16 sm:gap-6">
                                {item.avatar_url ? (
                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:border-mb-gold/40">
                                        <img src={item.avatar_url} alt={item.author} className="h-full w-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/5 font-display text-xl font-bold text-mb-gold shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:bg-mb-gold/10">
                                        {item.author.charAt(0)}
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <h4 className="mb-2 break-words text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:tracking-[0.3em]">{item.author}</h4>
                                    <p className="break-words text-[9px] font-bold uppercase tracking-[0.14em] text-mb-gold sm:tracking-[0.2em]">
                                        {item.role}
                                        {item.company && <span className="text-white/30 ml-2">| {item.company}</span>}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="absolute -bottom-10 -right-10 hidden h-32 w-32 rounded-full bg-mb-gold/5 opacity-0 blur-[50px] transition-opacity duration-1000 group-hover:opacity-100 sm:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
