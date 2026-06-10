import type { Locale } from "@/types/i18n";

type Triple = Record<Locale, string>;

function pick(m: Triple, locale: Locale): string {
    return (m[locale] || m.fr || m.en).trim();
}

export type AboutUiCopy = {
    timelineTitle1: string;
    timelineTitle2: string;
    timelineKicker: string;
    milestoneBadge: string;
    endYear: string;
    endSubtitle: string;
    specsTitleLine1: string;
    specsTitleGold: string;
    specsIntro: string;
    eduTitleBefore: string;
    eduTitleGold: string;
    eduIntro: string;
    testimonialsLine1: string;
    testimonialsLine2: string;
};

const timelineTitle1: Triple = {
    fr: "Parcours",
    en: "Journey"
};

const timelineTitle2: Triple = {
    fr: "Mon Histoire",
    en: "My story"
};

const timelineKicker: Triple = {
    fr: "CRÉATIVITÉ DEPUIS L'ENFANCE",
    en: "CREATIVITY SINCE CHILDHOOD"
};

const milestoneBadge: Triple = {
    fr: "Étape clé",
    en: "Milestone"
};

const endSubtitle: Triple = {
    fr: "L'aventure continue",
    en: "The journey continues"
};

const specsTitleLine1: Triple = {
    fr: "Spécialisations",
    en: "Specializations"
};

const specsTitleGold: Triple = {
    fr: "Multiples",
    en: "Across disciplines"
};

const specsIntro: Triple = {
    fr: "Une maîtrise polyvalente d'outils et de disciplines créatives, permettant de concevoir des expériences complètes de A à Z.",
    en: "Versatile mastery of tools and creative disciplines, designing end-to-end experiences from A to Z."
};

const eduTitleBefore: Triple = {
    fr: "Parcours ",
    en: "Academic "
};

const eduTitleGold: Triple = {
    fr: "Académique",
    en: "path"
};

const eduIntro: Triple = {
    fr: "Un apprentissage continu auprès des institutions et plateformes les plus prestigieuses.",
    en: "Continuous learning with the world's most prestigious institutions and platforms."
};

const testimonialsLine1: Triple = {
    fr: "Reconnaissance",
    en: "Professional"
};

const testimonialsLine2: Triple = {
    fr: "Professionnelle",
    en: "recognition"
};

export function getAboutUiCopy(locale: Locale): AboutUiCopy {
    return {
        timelineTitle1: pick(timelineTitle1, locale),
        timelineTitle2: pick(timelineTitle2, locale),
        timelineKicker: pick(timelineKicker, locale),
        milestoneBadge: pick(milestoneBadge, locale),
        endYear: "2026",
        endSubtitle: pick(endSubtitle, locale),
        specsTitleLine1: pick(specsTitleLine1, locale),
        specsTitleGold: pick(specsTitleGold, locale),
        specsIntro: pick(specsIntro, locale),
        eduTitleBefore: pick(eduTitleBefore, locale),
        eduTitleGold: pick(eduTitleGold, locale),
        eduIntro: pick(eduIntro, locale),
        testimonialsLine1: pick(testimonialsLine1, locale),
        testimonialsLine2: pick(testimonialsLine2, locale)
    };
}
