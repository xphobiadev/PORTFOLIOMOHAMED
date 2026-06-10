"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroEditor } from "./HeroEditor";
import { CategoriesEditor } from "./CategoriesEditor";
import { ProjectsEditor } from "./ProjectsEditor";

interface WorksDashboardProps {
    hero: any;
    categories: any[];
    projects: any[];
}

export function WorksDashboard({
    hero,
    categories,
    projects
}: WorksDashboardProps) {
    const [activeSection, setActiveSection] = useState<string>("projects");

    const sections = [
        { id: "hero", title: "1. Page Header (Hero)", component: <HeroEditor hero={hero} /> },
        { id: "categories", title: "2. Categories Filters", component: <CategoriesEditor initialCategories={categories} /> },
        { id: "projects", title: "3. Works Gallery", component: <ProjectsEditor initialProjects={projects} categories={categories} /> },
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
