"use client";

import React, { useState } from "react";
import { HeroEditorV3 } from "./HeroEditorV3";
import { StatsEditorV3 } from "./StatsEditorV3";
import { TimelineEditorV3 } from "./TimelineEditorV3";
import { SpecializationsEditorV3 } from "./SpecializationsEditorV3";
import { EducationEditorV3 } from "./EducationEditorV3";
import { TestimonialsEditorV3 } from "./TestimonialsEditorV3";

interface AboutDashboardV3Props {
    hero: any;
    stats: any[];
    timeline: any[];
    specializations: any[];
    education: any[];
    testimonials: any[];
}

const TABS = [
    { key: "hero", label: "Hero", color: "#c9a45c" },
    { key: "stats", label: "Stats", color: "#e74c3c" },
    { key: "timeline", label: "Timeline", color: "#3498db" },
    { key: "specializations", label: "Spécialisations", color: "#9b59b6" },
    { key: "education", label: "Éducation", color: "#1abc9c" },
    { key: "testimonials", label: "Témoignages", color: "#f39c12" },
];

export function AboutDashboardV3({ hero, stats, timeline, specializations, education, testimonials }: AboutDashboardV3Props) {
    const [activeTab, setActiveTab] = useState("hero");

    return (
        <div className="mx-auto max-w-5xl pb-20">
            <div className="mb-8">
                <h1 className="font-display text-4xl font-bold">About Page Editor <span className="text-mb-gold">V3</span></h1>
                <p className="mt-2 text-white/45">Ultra Pro About Page — 6 sections</p>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8 flex flex-wrap gap-2">
                {TABS.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${activeTab === tab.key
                                ? "text-white shadow-lg"
                                : "bg-white/5 text-white/60 hover:bg-white/10"
                            }`}
                        style={activeTab === tab.key ? { backgroundColor: tab.color } : {}}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="rounded-2xl border border-white/10 bg-[#111] p-6">
                {activeTab === "hero" && <HeroEditorV3 initialData={hero} />}
                {activeTab === "stats" && <StatsEditorV3 initialData={stats} />}
                {activeTab === "timeline" && <TimelineEditorV3 initialData={timeline} />}
                {activeTab === "specializations" && <SpecializationsEditorV3 initialData={specializations} />}
                {activeTab === "education" && <EducationEditorV3 initialData={education} />}
                {activeTab === "testimonials" && <TestimonialsEditorV3 initialData={testimonials} />}
            </div>
        </div>
    );
}
