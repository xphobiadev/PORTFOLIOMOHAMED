"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroEditor } from "./HeroEditor";
import { StatsEditor } from "./StatsEditor";
import { FeaturedProjectsEditor } from "./FeaturedProjectsEditor";
import { ServicesEditor } from "./ServicesEditor";
import { CtaEditor } from "./CtaEditor";

interface HomeDashboardProps {
    hero: any;
    stats: any[];
    featuredProjects: any[];
    availablePortfolio: any[];
    servicesContent: any;
    services: any[];
    cta: any;
}

export function HomeDashboard({
    hero,
    stats,
    featuredProjects,
    availablePortfolio,
    servicesContent,
    services,
    cta
}: HomeDashboardProps) {
    const [activeSection, setActiveSection] = useState<string>("hero");

    const sections = [
        { id: "hero", title: "1. Cinematic Hero", component: <HeroEditor hero={hero} /> },
        { id: "stats", title: "2. Stats Bar", component: <StatsEditor initialStats={stats} /> },
        { id: "featured", title: "3. Featured Projects", component: <FeaturedProjectsEditor featuredProjects={featuredProjects} availablePortfolio={availablePortfolio} /> },
        { id: "services", title: "4. Services Section", component: <ServicesEditor initialContent={servicesContent} initialServices={services} /> },
        { id: "cta", title: "5. Footer Call to Action", component: <CtaEditor cta={cta} /> },
    ];

    return (
        <div className="space-y-4">
            {sections.map((section) => {
                const isActive = activeSection === section.id;

                return (
                    <div key={section.id} className="overflow-hidden rounded-2xl border border-white/5 bg-[#121212]">
                        <button
                            onClick={() => setActiveSection(isActive ? "" : section.id)}
                            className="flex w-full items-center justify-between bg-white/5 p-6 transition-colors hover:bg-white/10"
                        >
                            <h2 className="font-display text-xl font-bold">{section.title}</h2>
                            <motion.div animate={{ rotate: isActive ? 180 : 0 }} className="text-white/50">
                                <ChevronDown className="h-5 w-5" />
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-white/5"
                                >
                                    {section.component}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
