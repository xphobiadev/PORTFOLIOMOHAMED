"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

interface UltraFeaturedWorksProps {
    projects: any[];
    ui: any;
}

export function UltraFeaturedWorks({ projects, ui }: UltraFeaturedWorksProps) {
    const containerRef = useRef(null);

    if (!projects?.length) return null;

    return (
        <section ref={containerRef} className="relative bg-mb-bg py-24 lg:py-32">
            <div className="container-site">
                {/* Section Header */}
                <div className="mb-16 flex flex-col justify-between gap-12 md:flex-row md:items-end lg:mb-24">
                    <div className="max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <span className="h-2 w-2 rounded-full bg-mb-gold" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-mb-gold">
                                {ui.selectedWorks}
                            </span>
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display text-6xl font-bold uppercase leading-[0.9] md:text-8xl"
                        >
                            {ui.selected} <span className="text-white/10 italic">{ui.productions}</span>
                        </motion.h2>
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="pb-2"
                    >
                        <Link href="/works" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.34em] text-white/42 transition-all duration-500 hover:text-mb-gold">
                            {ui.viewFullIndex}
                            <div className="h-[1px] w-12 bg-white/10 group-hover:w-20 group-hover:bg-mb-gold transition-all duration-500" />
                        </Link>
                    </motion.div>
                </div>

                {/* Grid Layout */}
                <div className="grid gap-16 lg:gap-20">
                    {projects.map((project, i) => (
                        <FeaturedProjectItem 
                            key={project.id} 
                            project={project} 
                            index={i + 1}
                            ui={ui}
                        />
                    ))}
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none">
                <span className="font-display text-[20vw] font-bold uppercase leading-none select-none">WORKS</span>
            </div>
        </section>
    );
}

function FeaturedProjectItem({ project, index, ui }: { project: any, index: number, ui: any }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    return (
        <motion.div 
            ref={ref}
            className="group relative grid gap-10 border-t border-white/8 pt-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:gap-14"
        >
            {/* Visual Container */}
            <Link href={`/works/${project.slug}`} className={`relative block aspect-[16/9] overflow-hidden rounded-lg border border-white/10 transition-all duration-700 group-hover:border-mb-gold/35 group-hover:shadow-[0_0_100px_rgba(200,162,74,0.1)] ${index % 2 === 0 ? "lg:order-2" : ""}`}>
                <motion.div style={{ scale }} className="h-full w-full">
                    {project.cover_url ? (
                        <img
                            src={project.cover_url}
                            alt={project.title}
                            className="h-full w-full object-cover grayscale-[0.35] transition-all duration-[2000ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                        />
                    ) : (
                        <div className="h-full w-full bg-mb-surface" />
                    )}
                </motion.div>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-55" />
                
                {/* Floating "View" indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100">
                    <div className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full border border-white/20 bg-black/50 backdrop-blur-xl">
                        <PlayCircle size={24} className="text-mb-gold" />
                        <span className="text-[8px] font-bold uppercase tracking-widest text-white">{ui.play}</span>
                    </div>
                </div>

                {/* Meta info on card */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6 overflow-hidden md:bottom-8 md:left-8 md:right-8">
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="text-[10px] font-bold uppercase tracking-[0.34em] text-mb-gold"
                    >
                        {project.category}
                    </motion.p>
                    <span className="font-display text-5xl font-bold leading-none text-white/12 tabular-nums">0{index}</span>
                </div>
            </Link>

            {/* Content Container */}
            <div className="space-y-8">
                <div className="mb-4 flex items-center gap-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-white/28">{ui.featuredCase}</span>
                    <div className="h-[1px] w-12 bg-white/5" />
                </div>

                <motion.div style={{ y }}>
                    <h3 className="mb-6 font-display text-4xl font-bold uppercase leading-none transition-colors duration-500 group-hover:text-mb-gold md:text-6xl">
                        {project.title}
                    </h3>
                    <p className="max-w-md text-lg font-light leading-relaxed text-white/45 transition-colors duration-500 group-hover:text-white/68">
                        {project.excerpt}
                    </p>
                </motion.div>

                <Link 
                    href={`/works/${project.slug}`} 
                    className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white/62 transition-all duration-300 hover:text-mb-gold"
                >
                    {ui.discoverMore}
                    <ArrowUpRight size={14} />
                </Link>
            </div>
        </motion.div>
    );
}
