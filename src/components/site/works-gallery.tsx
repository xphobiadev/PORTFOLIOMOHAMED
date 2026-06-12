"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Locale } from "@/types/i18n";

const INITIAL_VISIBLE_PROJECTS = 12;

export function WorksGallery({
    categories,
    projects,
    locale,
}: {
    categories: any[],
    projects: any[],
    locale: Locale,
}) {
    const [activeCategory, setActiveCategory] = useState("all");
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_PROJECTS);

    const ui = {
        categories: locale === "en" ? "Categories" : "Catégories",
        all: locale === "en" ? "All" : "Tous",
        showMore: locale === "en" ? "SHOW MORE" : "VOIR PLUS",
        viewProject: locale === "en" ? "View project" : "Voir le projet",
        noProjects:
            locale === "en"
                ? "No projects found for this category."
                : "Aucun projet trouvé pour cette catégorie.",
    };

    const filteredProjects = projects.filter(p => {
        if (activeCategory === "all") return true;
        return p.category_slug === activeCategory || p.category === activeCategory;
    });
    const visibleProjects = filteredProjects.slice(0, visibleCount);
    const hasMore = filteredProjects.length > visibleCount;

    const allCats = [{ id: 'all', slug: 'all', name: ui.all }, ...categories];

    return (
        <div className="space-y-8 sm:space-y-10">
            {/* Tab Filter */}
            <div className="grid gap-4 border-y border-white/[0.08] bg-white/[0.015] py-5 sm:bg-transparent sm:py-6 lg:grid-cols-[180px_1fr] lg:items-start">
                <div className="flex items-center justify-between gap-4 lg:block">
                    <span className="pt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/[0.42]">
                        {ui.categories}
                    </span>
                    <span className="rounded-full border border-white/[0.08] bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-mb-gold/80 lg:hidden">
                        {filteredProjects.length.toString().padStart(2, "0")}
                    </span>
                </div>
                <div className="-mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0 lg:justify-end [&::-webkit-scrollbar]:hidden">
                    <LayoutGroup id="category-tabs">
                        {allCats.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveCategory(cat.slug);
                                    setVisibleCount(INITIAL_VISIBLE_PROJECTS);
                                }}
                                className={`relative min-h-11 shrink-0 snap-start rounded-full border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 sm:min-h-0 ${
                                    activeCategory === cat.slug
                                        ? "border-mb-gold/[0.35] bg-mb-gold/[0.08] text-mb-gold shadow-[0_10px_30px_rgba(200,162,74,0.08)]"
                                        : "border-white/[0.08] bg-black/20 text-white/45 hover:border-white/20 hover:text-white"
                                }`}
                            >
                                <span className="block max-w-[13rem] truncate sm:max-w-[15rem]">{cat.name}</span>
                                {activeCategory === cat.slug && (
                                    <motion.div
                                        layoutId="active-tab"
                                        className="absolute inset-0 -z-10 rounded-full bg-mb-gold/[0.08]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </LayoutGroup>
                </div>
            </div>

            {/* Gallery Grid */}
            <motion.div 
                layout 
                className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"
            >
                <AnimatePresence mode="popLayout">
                    {visibleProjects.map((card: any, index: number) => (
                        <motion.div
                            key={card.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.05,
                                ease: [0.215, 0.61, 0.355, 1]
                            }}
                            className="group"
                        >
                            <Link
                                href={`/works/${card.slug || '#'}`}
                                className="block h-full overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0d0d0d] shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1 hover:border-mb-gold/[0.35] hover:bg-[#111] hover:shadow-[0_22px_55px_rgba(0,0,0,0.36)] sm:rounded-lg"
                            >
                                <div className="relative aspect-[5/4] overflow-hidden bg-mb-surface sm:aspect-[4/3]">
                                    {card.cover_url ? (
                                        <img
                                            src={card.cover_url}
                                            alt={card.title}
                                            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(200,162,74,0.16),transparent_34%),linear-gradient(135deg,#171717,#0a0a0a)]" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-80 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100" />
                                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur-md sm:hidden">
                                        {(index + 1).toString().padStart(2, "0")}
                                    </div>
                                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/[0.45] text-white/90 opacity-100 backdrop-blur-md transition-all duration-500 group-hover:border-mb-gold/[0.35] group-hover:bg-mb-gold group-hover:text-black sm:opacity-0 sm:group-hover:opacity-100">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </div>

                                <div className="flex min-h-[190px] flex-col p-5 sm:min-h-[230px] sm:p-6">
                                    <div className="mb-3 flex min-w-0 items-center gap-3 sm:mb-4">
                                        <span className="h-px w-7 shrink-0 bg-mb-gold/60" />
                                        <span className="min-w-0 truncate text-[10px] font-bold uppercase tracking-[0.18em] text-mb-gold">
                                            {card.category}
                                        </span>
                                    </div>
                                    <h3 className="break-words font-display text-[1.45rem] font-bold leading-[1.06] tracking-normal text-white transition-colors duration-300 group-hover:text-mb-gold sm:text-[1.7rem]">
                                        {card.title}
                                    </h3>
                                    <p className="mt-3 overflow-hidden text-[13px] font-light leading-6 text-white/62 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:mt-4 sm:text-sm sm:[-webkit-line-clamp:3]">
                                        {card.excerpt}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between pt-6 sm:pt-7">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/[0.5] transition-colors group-hover:text-white/70 sm:tracking-[0.18em] sm:text-white/[0.38]">
                                            {ui.viewProject}
                                        </span>
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-mb-gold/[0.25] bg-mb-gold/[0.08] text-mb-gold transition-colors group-hover:border-mb-gold/[0.35] sm:h-8 sm:w-8 sm:border-white/[0.08] sm:bg-transparent">
                                            <ArrowUpRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {visibleProjects.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-32 text-center"
                >
                    <p className="text-white/20 font-light tracking-widest uppercase text-xs">
                        {ui.noProjects}
                    </p>
                </motion.div>
            )}

            {/* Load More */}
            {hasMore && (
                <div className="flex justify-center pt-8">
                    <button
                        onClick={() => setVisibleCount((count) => count + INITIAL_VISIBLE_PROJECTS)}
                        className="group inline-flex items-center gap-3 rounded-full border border-white/[0.08] px-6 py-4 transition-colors hover:border-mb-gold/[0.35] hover:bg-mb-gold/[0.08]"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 transition-colors group-hover:text-mb-gold">
                            {ui.showMore}
                        </span>
                        <ArrowUpRight size={15} className="rotate-45 text-mb-gold" />
                    </button>
                </div>
            )}
        </div>
    );
}
