"use client";

import React from "react";
import { HeroEditorV2 } from "./HeroEditorV2";
import { InfoCardsEditorV2 } from "./InfoCardsEditorV2";
import { StatsEditorV2 } from "./StatsEditorV2";
import { SkillsEditorV2 } from "./SkillsEditorV2";
import { TestimonialsEditorV2 } from "./TestimonialsEditorV2";
import { AboutHero, AboutInfo, AboutStat, AboutSkill, Testimonial } from "@/types/about";

interface AboutDashboardProps {
    hero: AboutHero | null;
    infoCards: AboutInfo[];
    stats: AboutStat[];
    skills: AboutSkill[];
    testimonials: Testimonial[];
}

export function AboutDashboardV2({ hero, infoCards, stats, skills, testimonials }: AboutDashboardProps) {
    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-6 pb-20">
            <div>
                <h1 className="font-display text-4xl font-bold">About Page Editor</h1>
                <p className="mt-2 text-white/45">Modify your public About Me page in real-time.</p>
            </div>

            <HeroEditorV2 initialData={hero || undefined} />
            <InfoCardsEditorV2 initialData={infoCards || []} />
            <StatsEditorV2 initialData={stats || []} />
            <SkillsEditorV2 initialData={skills || []} />
            <TestimonialsEditorV2 initialData={testimonials || []} />
        </div>
    );
}
