"use client";

import { GoldenDustBackground } from "./GoldenDustBackground";
import { CustomCursor } from "../CustomCursor";
import { FilmGrain } from "../FilmGrain";
import { UltraProHero } from "./UltraProHero";
import { UltraProStats } from "./UltraProStats";
import { VerticalTimeline } from "./VerticalTimeline";
import { AboutSpecializationsSection } from "./AboutSpecializationsSection";
import { AboutEducationSection } from "./AboutEducationSection";
import { AboutTestimonialsSection } from "./AboutTestimonialsSection";
import { Header } from "../site/header";
import { Footer } from "../site/footer";
import type { Locale } from "@/types/i18n";
import type { AboutUiCopy } from "@/lib/i18n/about-ui";
import type {
    LocalizedAboutHero,
    LocalizedTimelineItem,
    LocalizedSpecialization,
    LocalizedEducation,
    LocalizedStatV3,
    LocalizedTestimonialV3
} from "@/lib/i18n/about-page-data";

interface UltraProAboutPageProps {
    locale: Locale;
    aboutUi: AboutUiCopy;
    hero: LocalizedAboutHero;
    timeline: LocalizedTimelineItem[];
    specializations: LocalizedSpecialization[];
    education: LocalizedEducation[];
    stats: LocalizedStatV3[];
    testimonials: LocalizedTestimonialV3[];
}

export function UltraProAboutPage({
    locale,
    aboutUi,
    hero,
    timeline,
    specializations,
    education,
    stats,
    testimonials
}: UltraProAboutPageProps) {
    return (
        <main
            dir="ltr"
            lang={locale}
            className="relative bg-[#070707] text-white selection:bg-mb-gold/30 selection:text-white"
        >
            <GoldenDustBackground />
            <FilmGrain />
            <CustomCursor />
            <Header />

            <div className="relative z-10 font-body">
                <UltraProHero data={hero} />
                <UltraProStats stats={stats} />
                <VerticalTimeline items={timeline} aboutUi={aboutUi} />
                <AboutSpecializationsSection specializations={specializations} aboutUi={aboutUi} />
                <AboutEducationSection education={education} aboutUi={aboutUi} />
                <AboutTestimonialsSection testimonials={testimonials} aboutUi={aboutUi} />
            </div>

            <Footer />
        </main>
    );
}
