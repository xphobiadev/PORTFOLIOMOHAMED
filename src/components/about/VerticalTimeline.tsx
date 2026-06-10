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
            className="relative z-10 w-full bg-[#0a0a0a] py-32 sm:py-48 overflow-hidden"
            id="timeline"
        >
            {/* Background elements */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-mb-gold/5 blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-white/5 blur-[100px]" />
            </div>

            <div className="container-site relative z-10">
                {/* Header */}
                <div className="mb-32 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 flex items-center gap-4"
                    >
                        <span className="h-[1px] w-12 bg-mb-gold/60" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-mb-gold">
                            {aboutUi.timelineKicker}
                        </span>
                        <span className="h-[1px] w-12 bg-mb-gold/60" />
                    </motion.div>
                    <h2 className="font-display text-5xl font-bold uppercase tracking-[-0.04em] sm:text-7xl md:text-9xl">
                        <span className="text-white">{aboutUi.timelineTitle1}</span>
                        <span className="mx-6 font-light text-white/10 italic">/</span>
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
                    <div className="space-y-32 md:space-y-0">
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
                                            <span className={`pointer-events-none absolute -top-12 font-display text-[12vw] font-bold tracking-tighter text-white/[0.02] transition-all duration-1000 group-hover:text-mb-gold/[0.05] group-hover:scale-110 select-none ${
                                                isEven ? "right-0" : "left-0"
                                            }`}>
                                                {item.year.substring(0, 4)}
                                            </span>

                                            <div className="relative z-10 pt-12">
                                                <div className={`mb-4 flex items-center gap-4 ${isEven ? "justify-end" : "justify-start"}`}>
                                                    {!isEven && <span className="h-1.5 w-1.5 rounded-full bg-mb-gold" />}
                                                    <p className="font-mono text-xs font-bold tracking-[0.4em] text-mb-gold/60 uppercase">
                                                        {item.year}
                                                    </p>
                                                    {isEven && <span className="h-1.5 w-1.5 rounded-full bg-mb-gold" />}
                                                </div>
                                                <h3 className="mb-6 font-display text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl group-hover:text-mb-gold transition-colors duration-500">
                                                    {item.title}
                                                </h3>
                                                <p className="text-lg font-light leading-relaxed text-white/40 sm:text-xl group-hover:text-white/70 transition-colors duration-500">
                                                    {item.description}
                                                </p>
                                                
                                                {item.is_milestone && (
                                                    <div className={`mt-8 flex ${isEven ? "justify-end" : "justify-start"}`}>
                                                        <span className="rounded-full border border-mb-gold/20 bg-mb-gold/5 px-6 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-mb-gold backdrop-blur-md shadow-[0_0_20px_rgba(200,162,74,0.1)]">
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
                        <div className="relative flex flex-col items-center pt-32">
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-20 w-[1px] bg-gradient-to-b from-mb-gold to-transparent hidden md:block" />
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.02] px-16 py-10 text-center backdrop-blur-3xl group transition-all duration-700 hover:border-mb-gold/30 hover:shadow-[0_0_80px_rgba(200,162,74,0.1)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-mb-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <h3 className="relative z-10 font-display text-4xl font-bold md:text-7xl text-white group-hover:gold-text-shimmer transition-all duration-700">{aboutUi.endYear}</h3>
                                <p className="relative z-10 mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-mb-gold/60">
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
