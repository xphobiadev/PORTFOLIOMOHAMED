"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import type { LocalizedTimelineItem } from "@/lib/i18n/about-page-data";
import type { AboutUiCopy } from "@/lib/i18n/about-ui";

interface VerticalTimelineProps {
    items: LocalizedTimelineItem[];
    aboutUi: AboutUiCopy;
}

export function VerticalTimeline({ items, aboutUi }: VerticalTimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!lineRef.current) return;

        // Animate the central line growth
        gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 80%",
                    scrub: true,
                },
            }
        );

        // Animate cards entry
        const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
        cards.forEach((card) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 50, filter: "blur(10px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, [items]);

    return (
        <section
            ref={containerRef}
            className="relative z-10 w-full overflow-hidden bg-[#0a0a0a] py-24 sm:py-48"
            id="timeline"
        >
            {/* Background elements */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-mb-gold/5 blur-[90px] sm:h-[600px] sm:w-[600px] sm:blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/5 blur-[80px] sm:h-[400px] sm:w-[400px] sm:blur-[100px]" />
            </div>

            <div className="container-site relative z-10">
                {/* Header */}
                <div className="mb-20 flex flex-col items-center text-center sm:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 flex max-w-full items-center justify-center gap-3 sm:gap-4"
                    >
                        <span className="h-[1px] w-8 shrink-0 bg-mb-gold/60 sm:w-12" />
                        <span className="min-w-0 break-words text-[10px] font-bold uppercase tracking-[0.22em] text-mb-gold sm:tracking-[0.5em]">
                            {aboutUi.timelineKicker}
                        </span>
                        <span className="h-[1px] w-8 shrink-0 bg-mb-gold/60 sm:w-12" />
                    </motion.div>
                    <h2 className="max-w-full break-words font-display text-4xl font-bold uppercase tracking-normal sm:text-7xl md:text-8xl lg:text-9xl">
                        <span className="text-white">{aboutUi.timelineTitle1}</span>
                        <span className="mx-2 font-light text-white/10 italic sm:mx-6">/</span>
                        <span className="gold-text-shimmer italic">{aboutUi.timelineTitle2}</span>
                    </h2>
                </div>

                {/* Vertical Timeline Container */}
                <div className="relative mx-auto max-w-6xl">
                    {/* Central Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/5 hidden md:block">
                        <div
                            ref={lineRef}
                            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-mb-gold/0 via-mb-gold/40 to-mb-gold/0 origin-top"
                        />
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-20 md:space-y-0">
                        {items.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div
                                    key={item.id || index}
                                    className={`timeline-card relative flex flex-col items-center md:flex-row md:justify-between ${
                                        isEven ? "md:flex-row-reverse" : ""
                                    } md:min-h-[300px]`}
                                >
                                    {/* Central Dot */}
                                    <div className="absolute left-1/2 top-0 -translate-x-1/2 z-20 hidden md:block">
                                        <div className={`h-5 w-5 rounded-full border-2 transition-all duration-700 ${item.is_milestone ? "border-mb-gold bg-mb-gold shadow-[0_0_30px_rgba(200,162,74,0.6)] scale-125" : "border-white/10 bg-[#0a0a0a] group-hover:border-mb-gold/50"}`} />
                                        {item.is_milestone && (
                                            <div className="absolute inset-0 animate-ping rounded-full bg-mb-gold/30" />
                                        )}
                                    </div>

                                    {/* Content Side */}
                                    <div className={`w-full md:w-[46%] ${isEven ? "md:text-right" : "md:text-left"}`}>
                                        <div className="relative group">
                                            {/* Floating Year Background */}
                                            <span className={`pointer-events-none absolute -top-8 font-display text-7xl font-bold tracking-normal text-white/[0.02] transition-all duration-1000 group-hover:text-mb-gold/[0.05] group-hover:scale-110 select-none sm:-top-12 sm:text-9xl ${
                                                isEven ? "right-0" : "left-0"
                                            }`}>
                                                {item.year.substring(0, 4)}
                                            </span>

                                            <div className="relative z-10 pt-10 sm:pt-12">
                                                <div className={`mb-4 flex items-center gap-3 sm:gap-4 ${isEven ? "justify-start md:justify-end" : "justify-start"}`}>
                                                    {!isEven && <span className="h-1.5 w-1.5 rounded-full bg-mb-gold" />}
                                                    <p className="break-words font-mono text-xs font-bold uppercase tracking-[0.22em] text-mb-gold/60 sm:tracking-[0.4em]">
                                                        {item.year}
                                                    </p>
                                                    {isEven && <span className="h-1.5 w-1.5 rounded-full bg-mb-gold" />}
                                                </div>
                                                <h3 className="mb-6 break-words font-display text-3xl font-bold uppercase leading-tight tracking-normal transition-colors duration-500 group-hover:text-mb-gold sm:text-4xl lg:text-5xl">
                                                    {item.title}
                                                </h3>
                                                <p className="text-base font-light leading-relaxed text-white/40 transition-colors duration-500 group-hover:text-white/70 sm:text-xl">
                                                    {item.description}
                                                </p>
                                                
                                                {item.is_milestone && (
                                                    <div className={`mt-8 flex ${isEven ? "justify-start md:justify-end" : "justify-start"}`}>
                                                        <span className="max-w-full rounded-full border border-mb-gold/20 bg-mb-gold/5 px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-mb-gold shadow-[0_0_20px_rgba(200,162,74,0.1)] backdrop-blur-md sm:px-6 sm:tracking-[0.3em]">
                                                            {aboutUi.milestoneBadge}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Empty Side (Desktop only) */}
                                    <div className="hidden md:block md:w-[46%]" />
                                </div>
                            );
                        })}

                        {/* End Marker */}
                        <div className="relative flex flex-col items-center pt-20 sm:pt-32">
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-20 w-[1px] bg-gradient-to-b from-mb-gold to-transparent hidden md:block" />
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="group relative max-w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] px-6 py-8 text-center backdrop-blur-3xl transition-all duration-700 hover:border-mb-gold/30 hover:shadow-[0_0_80px_rgba(200,162,74,0.1)] sm:rounded-[40px] sm:px-16 sm:py-10"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-mb-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <h3 className="relative z-10 break-words font-display text-4xl font-bold text-white transition-all duration-700 group-hover:gold-text-shimmer md:text-7xl">{aboutUi.endYear}</h3>
                                <p className="relative z-10 mt-4 break-words font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-mb-gold/60 sm:tracking-[0.5em]">
                                    {aboutUi.endSubtitle}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
