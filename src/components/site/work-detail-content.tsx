"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { 
    ArrowLeft, 
    ExternalLink, 
    Music, 
    Film, 
    Image as ImageIcon,
    Layers,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    X
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { AudioPlayer } from "@/components/site/audio-player";
import { Locale } from "@/types/i18n";

interface WorkDetailContentProps {
    project: any;
    media: any[];
    locale: Locale;
    ui: any;
}

export function WorkDetailContent({ project: p, media, locale, ui }: WorkDetailContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    const images = useMemo(() => media.filter((m: any) => m.file_type === "image"), [media]);
    const videos = media.filter((m: any) => m.file_type === "video");
    const audios = media.filter((m: any) => m.file_type === "audio");
    const activeImage = activeImageIndex === null ? null : images[activeImageIndex];
    const imageCount = images.length;
    const showPreviousImage = () => {
        setActiveImageIndex((current) => {
            if (current === null || imageCount === 0) return current;
            return current === 0 ? imageCount - 1 : current - 1;
        });
    };
    const showNextImage = () => {
        setActiveImageIndex((current) => {
            if (current === null || imageCount === 0) return current;
            return current === imageCount - 1 ? 0 : current + 1;
        });
    };

    const formatDate = (date?: string) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const cleanFileName = (fileName?: string) => {
        if (!fileName) return locale === "en" ? "Project image" : "Image du projet";
        return fileName.replace(/^[a-z0-9]+_/, "");
    };

    const caseStudyBeats = [
        {
            label: locale === "en" ? "Focus" : "Axe",
            value: p.category || (locale === "en" ? "Visual storytelling" : "Narration visuelle"),
        },
        {
            label: locale === "en" ? "Approach" : "Approche",
            value: locale === "en"
                ? "Cinematic direction, precise pacing, and a polished visual language."
                : "Direction cinématographique, rythme précis et langage visuel soigné.",
        },
        {
            label: locale === "en" ? "Output" : "Livrables",
            value: locale === "en"
                ? "A complete visual piece designed for attention, clarity, and recall."
                : "Une pièce visuelle complète pensée pour l'impact, la clarté et la mémorisation.",
        },
    ];
    const copy = {
        scrollExplore: locale === "en" ? "SCROLL TO EXPLORE" : "DÉFILER POUR EXPLORER",
        details: locale === "en" ? "Details" : "Détails",
        status: locale === "en" ? "Status" : "Statut",
        completed: locale === "en" ? "Completed" : "Terminé",
        role: locale === "en" ? "Role" : "Rôle",
        creativeDirector: locale === "en" ? "Creative Director" : "Directeur créatif",
        deliverables: locale === "en" ? "Deliverables" : "Livrables",
        filmPhoto: locale === "en" ? "Film, Photo" : "Film, photo",
        motion: locale === "en" ? "MOTION" : "MOUVEMENT",
        stills: locale === "en" ? "STILLS" : "IMAGES",
        exploreMore: locale === "en" ? "Explore More" : "Explorer plus",
        nextVision: locale === "en" ? "Next Vision" : "Vision suivante",
        viewAllWorks: locale === "en" ? "View All Works" : "Voir tous les projets",
        openOriginal: locale === "en" ? "Open Original" : "Ouvrir l'original",
    };

    return (
        <div ref={containerRef} className="relative min-h-screen bg-mb-bg overflow-hidden noise">
            {/* Cinematic Hero */}
            <section className="relative flex min-h-[86svh] w-full flex-col justify-end overflow-hidden pt-24 sm:min-h-[92svh] sm:pt-36 lg:pt-40">
                <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
                    {p.cover_url ? (
                        <div className="relative h-full w-full">
                            <img
                                src={p.cover_url}
                                alt={p.title}
                                className="h-full w-full object-cover brightness-[0.5] contrast-[1.1] grayscale-[0.2]"
                            />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,7,7,0.6)_100%)]" />
                            <div className="absolute inset-0 bg-gradient-to-b from-mb-bg/60 via-transparent to-mb-bg" />
                        </div>
                    ) : (
                        <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(200,162,74,0.1),transparent)]" />
                    )}
                </motion.div>

                {/* Anamorphic Flare Effect */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-mb-gold/20 blur-[120px] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20 pointer-events-none" />

                <div className="container-site relative z-10 flex flex-1 items-center py-14 sm:py-24 lg:py-32">
                    <div className="w-full min-w-0 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link
                                href="/works"
                                className="group mb-10 inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.52] transition-colors hover:text-mb-gold sm:mb-16 sm:gap-6 sm:tracking-[0.5em] sm:text-white/40"
                            >
                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl transition-all group-hover:scale-110 group-hover:border-mb-gold/40 group-hover:bg-mb-gold/10 sm:h-12 sm:w-12">
                                    <ArrowLeft size={16} />
                                </span>
                                {ui.back}
                            </Link>

                            <div className="space-y-5 sm:space-y-7">
                                {p.category && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2, duration: 1.2 }}
                                        className="flex min-w-0 items-center gap-3 sm:gap-6"
                                    >
                                        <span className="h-[1px] w-8 shrink-0 bg-mb-gold/60 sm:w-16" />
                                        <span className="min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.28em] text-mb-gold drop-shadow-[0_0_12px_rgba(200,162,74,0.45)] sm:text-xs">
                                            {p.category}
                                        </span>
                                    </motion.div>
                                )}

                                <h1 className="w-full max-w-[calc(100vw-3rem)] break-words font-display text-[clamp(2.25rem,12.5vw,9rem)] font-bold uppercase leading-[0.94] tracking-normal text-white [overflow-wrap:anywhere] sm:max-w-[12ch] sm:leading-[0.88]">
                                    {p.title.split(' ').map((word: string, i: number, arr: any[]) => (
                                        <motion.span
                                            key={`${word}-${i}`}
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ 
                                                duration: 1.4, 
                                                delay: 0.4 + (i * 0.15), 
                                                ease: [0.16, 1, 0.3, 1] 
                                            }}
                                            className={`mr-[0.25em] inline whitespace-normal break-words align-top [overflow-wrap:anywhere] sm:inline-block sm:max-w-full ${i === arr.length - 1 ? 'gold-text-shimmer italic' : ''}`}
                                        >
                                            {word}
                                            {i < arr.length - 1 ? " " : ""}
                                        </motion.span>
                                    ))}
                                </h1>
                            </div>

                            {p.excerpt && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.5, delay: 1.2 }}
                                    className="mt-8 max-w-3xl border-l-2 border-mb-gold/30 pl-5 sm:mt-14 sm:pl-8"
                                >
                                    <p className="text-base font-light leading-relaxed text-white/68 sm:text-lg md:text-xl lg:text-2xl">
                                        {p.excerpt}
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Hero Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 1.5 }}
                    className="relative z-10 w-full border-t border-white/10 bg-black/55 py-5 backdrop-blur-3xl sm:py-10"
                >
                    <div className="container-site grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-12">
                            {[
                                { label: ui.client, value: p.client_name },
                                {
                                    label: ui.date,
                                    value: p.year || (p.date ? new Date(p.date).toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
                                        year: "numeric"
                                    }) : null)
                                },
                                { label: ui.category, value: p.category }
                            ].map((item, i) => item.value && (
                                <div key={i} className={`group rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 ${i === 0 ? "col-span-2 lg:col-span-1" : ""}`}>
                                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/[0.35] transition-colors group-hover:text-mb-gold/60 sm:tracking-[0.24em]">{item.label}</p>
                                    <p className="break-words text-sm font-bold uppercase tracking-[0.06em] text-white sm:text-base sm:tracking-[0.08em]">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="hidden items-center gap-5 text-white/25 sm:flex lg:justify-end">
                            <span className="text-[10px] font-bold uppercase tracking-[0.22em]">{copy.scrollExplore}</span>
                            <motion.div 
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                className="h-10 w-[1px] bg-gradient-to-b from-mb-gold to-transparent"
                            />
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Content Body */}
            <div className="relative z-10 bg-mb-bg">
                <section className="container-site py-16 sm:py-24 lg:py-40">
                    <div className="grid overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/5 shadow-2xl md:grid-cols-3 md:gap-px md:rounded-[20px]">
                        {caseStudyBeats.map((item, index) => (
                            <motion.div 
                                key={item.label} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="bg-mb-bg/70 px-6 py-7 backdrop-blur-xl transition-colors hover:bg-white/[0.03] sm:px-9 sm:py-9 md:px-10"
                            >
                                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-mb-gold sm:mb-5 sm:tracking-[0.24em]">
                                    {item.label}
                                </p>
                                <p className="text-[15px] font-light leading-relaxed text-white/[0.7] transition-colors sm:text-lg">
                                    {item.value}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Description Section */}
                <section className="container-site pb-24 lg:pb-48">
                    <div className="grid items-start gap-10 sm:gap-14 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2 }}
                            >
                                <div className="mb-7 flex items-center gap-4 sm:mb-14 sm:gap-5">
                                    <span className="h-[1px] w-10 bg-mb-gold sm:w-12" />
                                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-mb-gold sm:tracking-[0.24em]">
                                        {locale === "en" ? "THE NARRATIVE" : "LE RÉCIT"}
                                    </h2>
                                </div>
                                <div className="max-w-4xl space-y-6 text-[15px] font-light leading-[1.85] text-white/[0.7] sm:text-lg md:text-xl">
                                    {p.description?.split("\n").map((para: string, i: number) =>
                                        para.trim() ? (
                                            <p key={i} className="first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:font-display first-letter:text-5xl first-letter:leading-none first-letter:text-mb-gold sm:first-letter:mr-4 sm:first-letter:text-6xl">
                                                {para}
                                            </p>
                                        ) : null
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:sticky lg:top-32">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-3xl sm:rounded-[20px] sm:p-9 lg:p-10"
                            >
                                <div className="absolute -right-8 -top-8 opacity-[0.04] transition-opacity duration-1000 group-hover:opacity-10">
                                    <Layers size={150} className="text-mb-gold" />
                                </div>
                                
                                <h3 className="mb-7 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-white/[0.35] sm:mb-9 sm:tracking-[0.22em]">
                                    <span className="h-[1px] w-8 bg-white/10" />
                                    {copy.details}
                                </h3>

                                <div className="space-y-5 sm:space-y-6">
                                    <div className="flex items-end justify-between gap-6 border-b border-white/[0.08] pb-5">
                                        <span className="text-[10px] uppercase tracking-[0.16em] text-white/[0.35] sm:tracking-[0.2em]">{copy.status}</span>
                                        <span className="text-right text-sm font-bold tracking-[0.06em] text-mb-gold sm:tracking-[0.08em]">{copy.completed}</span>
                                    </div>
                                    <div className="flex items-end justify-between gap-6 border-b border-white/[0.08] pb-5">
                                        <span className="text-[10px] uppercase tracking-[0.16em] text-white/[0.35] sm:tracking-[0.2em]">{copy.role}</span>
                                        <span className="text-right text-sm font-bold tracking-[0.06em] text-white/[0.82] sm:tracking-[0.08em]">{copy.creativeDirector}</span>
                                    </div>
                                    <div className="flex items-end justify-between gap-6 border-b border-white/[0.08] pb-5">
                                        <span className="text-[10px] uppercase tracking-[0.16em] text-white/[0.35] sm:tracking-[0.2em]">{copy.deliverables}</span>
                                        <span className="text-right text-sm font-bold tracking-[0.06em] text-white/[0.82] sm:tracking-[0.08em]">{copy.filmPhoto}</span>
                                    </div>
                                </div>

                                {p.external_url && (
                                    <a
                                        href={p.external_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative mt-9 flex w-full items-center justify-center gap-3 rounded-full border border-mb-gold/[0.35] bg-mb-gold/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-mb-gold transition-all duration-500 hover:bg-mb-gold hover:text-black sm:mt-12 sm:py-5 sm:tracking-[0.18em]"
                                    >
                                        {ui.visitProject}
                                        <ExternalLink size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </a>
                                )}
                                
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Cinematic Video Grid */}
                {videos.length > 0 && (
                    <section className="pb-28 lg:pb-64">
                        <div className="container-site mb-10 sm:mb-24">
                            <h2 className="flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.24em] text-white/[0.24] sm:gap-8 sm:tracking-[0.6em]">
                                <span className="h-[1px] w-10 bg-white/10 sm:w-16" />
                                <Film size={18} className="text-mb-gold" />
                                {copy.motion}
                            </h2>
                        </div>
                        <div className="space-y-5 sm:space-y-10">
                            {videos.map((v: any) => (
                                <motion.div
                                    key={v.id}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="group relative aspect-video w-full overflow-hidden border border-white/[0.08] bg-black shadow-2xl sm:rounded-[16px] md:rounded-[20px]"
                                >
                                    <video
                                        src={v.url}
                                        controls
                                        className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-[2000ms] grayscale-[0.2] group-hover:grayscale-0"
                                        poster={p.cover_url}
                                    />
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Audio Experiences */}
                {audios.length > 0 && (
                    <section className="container-site pb-28 lg:pb-64">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="mb-10 flex items-center justify-center gap-4 text-[12px] font-bold uppercase tracking-[0.24em] text-white/[0.24] sm:mb-24 sm:gap-8 sm:tracking-[0.6em]">
                                <span className="h-[1px] w-10 bg-white/10 sm:w-16" />
                                <Music size={18} className="text-mb-gold" />
                                {ui.audio}
                                <span className="h-[1px] w-10 bg-white/10 sm:w-16" />
                            </h2>
                            <div className="grid gap-6 sm:gap-12">
                                {audios.map((aud: any, i: number) => (
                                    <motion.div
                                        key={aud.id}
                                        initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <AudioPlayer 
                                            url={aud.url} 
                                            fileName={aud.file_name} 
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* High-End Imagery */}
                {images.length > 0 && (
                    <section className="container-site pb-28 lg:pb-64">
                        <h2 className="mb-8 flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.2em] text-white/[0.32] sm:mb-20 sm:gap-8 sm:tracking-[0.24em]">
                            <span className="h-[1px] w-10 bg-white/10 sm:w-16" />
                            <ImageIcon size={18} className="text-mb-gold" />
                            {copy.stills}
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:gap-8">
                            {images.map((img: any, i: number) => (
                                <motion.div
                                    key={img.id}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className={`group relative aspect-[4/5] overflow-hidden rounded-[16px] border border-white/[0.08] bg-white/[0.02] shadow-[0_18px_50px_rgba(0,0,0,0.3)] sm:rounded-[20px] ${i % 3 === 0 ? 'md:col-span-2 md:aspect-[16/9]' : ''}`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setActiveImageIndex(i)}
                                        className="absolute inset-0 z-10 text-left"
                                        aria-label={`${locale === "en" ? "Open image details" : "Ouvrir les détails de l'image"} ${i + 1}`}
                                    >
                                        <span className="sr-only">
                                            {locale === "en" ? "Open image details" : "Ouvrir les détails de l'image"}
                                        </span>
                                    </button>
                                    <img
                                        src={img.url}
                                        alt={img.file_name || p.title}
                                        className="h-full w-full object-cover transition-all duration-[2500ms] ease-out group-hover:scale-110 sm:grayscale-[0.2] sm:group-hover:grayscale-0"
                                    />
                                    
                                    {/* Tech Metadata Overlay */}
                                    <div className="absolute left-4 top-4 translate-x-0 opacity-100 transition-all duration-700 sm:left-8 sm:top-8 sm:-translate-x-4 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100">
                                        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-md sm:px-4">
                                            <span className="h-1.5 w-1.5 rounded-full bg-mb-gold animate-pulse" />
                                            <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/[0.66] sm:tracking-[0.16em]">0{i+1} / CAPTURE_MODE: RAW</span>
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/[0.86] via-black/[0.18] to-transparent opacity-95 transition-opacity duration-1000 sm:opacity-0 sm:group-hover:opacity-70" />
                                    <div className="absolute bottom-0 left-0 max-w-[calc(100%-4.75rem)] translate-y-0 p-5 opacity-100 transition-all duration-700 sm:max-w-full sm:translate-y-8 sm:p-8 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-mb-gold sm:mb-3 sm:tracking-[0.2em]">
                                            {locale === "en" ? "PRODUCTION_ASSET" : "ASSET_PRODUCTION"}
                                        </p>
                                        <h4 className="break-words font-display text-xl font-medium uppercase tracking-normal text-white [overflow-wrap:anywhere] sm:text-3xl">{cleanFileName(img.file_name)}</h4>
                                    </div>
                                    
                                    <div className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-0 items-center justify-center rounded-full bg-mb-gold text-black opacity-100 shadow-[0_0_50px_rgba(200,162,74,0.35)] transition-all duration-700 sm:bottom-8 sm:right-8 sm:h-12 sm:w-12 sm:translate-y-8 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                                        <Maximize2 size={18} className="sm:size-5" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Cinematic Outro Footer */}
                <section className="container-site pb-28 lg:pb-64">
                    <div className="group relative h-[360px] w-full overflow-hidden rounded-[18px] border border-white/[0.08] shadow-2xl sm:h-[560px] sm:rounded-[24px] lg:rounded-[32px]">
                        <img 
                            src={p.cover_url} 
                            className="w-full h-full object-cover brightness-[0.3] grayscale group-hover:grayscale-0 group-hover:brightness-[0.5] transition-all duration-[3000ms] scale-125 group-hover:scale-100" 
                            alt="" 
                        />
                        <div className="absolute inset-0 bg-mb-bg/40 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-1000" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center sm:p-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="mb-6 flex items-center justify-center gap-3 sm:mb-8 sm:gap-6">
                                    <span className="h-[1px] w-8 bg-mb-gold/30 sm:w-12" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-mb-gold sm:tracking-[0.22em]">{copy.exploreMore}</span>
                                    <span className="h-[1px] w-8 bg-mb-gold/30 sm:w-12" />
                                </div>
                                <h2 className="mb-8 font-display text-[clamp(2.6rem,15vw,7rem)] font-bold uppercase leading-none tracking-normal text-white sm:mb-12">
                                    {copy.nextVision}
                                </h2>
                                <Link 
                                    href="/works" 
                                    className="group relative inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-2xl transition-all duration-700 hover:border-mb-gold hover:bg-mb-gold hover:text-black sm:gap-4 sm:px-10 sm:py-5 sm:text-[11px] sm:tracking-[0.18em]"
                                >
                                    {copy.viewAllWorks}
                                    <ArrowLeft size={16} className="rotate-180 transition-transform group-hover:translate-x-2" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
            
            <div className="pointer-events-none fixed inset-0 z-[-1] grid-stroke opacity-5" />

            <AnimatePresence>
                {activeImage && activeImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] overflow-hidden bg-black/95 backdrop-blur-xl"
                    >
                        <button
                            type="button"
                            onClick={() => setActiveImageIndex(null)}
                            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition-colors hover:border-mb-gold hover:text-mb-gold sm:right-6 sm:top-6 sm:h-12 sm:w-12 sm:bg-white/5"
                            aria-label={locale === "en" ? "Close image details" : "Fermer les détails de l'image"}
                        >
                            <X size={20} />
                        </button>

                        {imageCount > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={showPreviousImage}
                                    className="absolute bottom-[42svh] left-4 z-20 flex h-11 w-11 translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition-colors hover:border-mb-gold hover:text-mb-gold sm:bottom-auto sm:top-1/2 sm:h-12 sm:w-12 sm:-translate-y-1/2 sm:bg-white/5 md:left-8"
                                    aria-label={locale === "en" ? "Previous image" : "Image précédente"}
                                >
                                    <ChevronLeft size={22} />
                                </button>
                                <button
                                    type="button"
                                    onClick={showNextImage}
                                    className="absolute bottom-[42svh] right-4 z-20 flex h-11 w-11 translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-xl transition-colors hover:border-mb-gold hover:text-mb-gold sm:bottom-auto sm:top-1/2 sm:h-12 sm:w-12 sm:-translate-y-1/2 sm:bg-white/5 md:right-8"
                                    aria-label={locale === "en" ? "Next image" : "Image suivante"}
                                >
                                    <ChevronRight size={22} />
                                </button>
                            </>
                        )}

                        <div className="grid h-[100svh] grid-rows-[minmax(0,1fr)_auto] lg:grid-cols-[1fr_380px] lg:grid-rows-1">
                            <div className="flex min-h-0 items-center justify-center p-4 pt-20 sm:p-6 md:p-12">
                                <img
                                    src={activeImage.url}
                                    alt={activeImage.file_name || p.title}
                                    className="max-h-full max-w-full rounded-[10px] object-contain shadow-[0_30px_120px_rgba(0,0,0,0.6)] sm:rounded-none"
                                />
                            </div>

                            <aside className="max-h-[42svh] overflow-y-auto border-t border-white/10 bg-mb-bg/[0.88] p-5 backdrop-blur-2xl lg:max-h-none lg:border-l lg:border-t-0 lg:p-10">
                                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.26em] text-mb-gold sm:mb-4 sm:tracking-[0.5em]">
                                    {locale === "en" ? "Image Details" : "Détails de l'image"}
                                </p>
                                <h3 className="mb-6 break-words font-display text-2xl font-bold text-white sm:mb-8 sm:text-3xl">
                                    {cleanFileName(activeImage.file_name)}
                                </h3>

                                <div className="space-y-4 sm:space-y-5">
                                    {[
                                        { label: locale === "en" ? "Project" : "Projet", value: p.title },
                                        { label: ui.category, value: p.category },
                                        { label: ui.client, value: p.client_name },
                                        { label: ui.date, value: p.year || formatDate(activeImage.created_at) },
                                        { label: locale === "en" ? "Type" : "Type", value: activeImage.file_type },
                                        { label: locale === "en" ? "Image" : "Image", value: `${activeImageIndex + 1} / ${imageCount}` },
                                    ].filter((item) => item.value).map((item) => (
                                        <div key={item.label} className="border-b border-white/10 pb-3 sm:pb-4">
                                            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30 sm:tracking-[0.3em]">
                                                {item.label}
                                            </p>
                                            <p className="break-words text-sm font-medium text-white/85">
                                                {item.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href={activeImage.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-mb-gold hover:text-mb-gold sm:mt-8 sm:tracking-[0.3em]"
                                >
                                    {copy.openOriginal}
                                    <ExternalLink size={14} />
                                </a>
                            </aside>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
