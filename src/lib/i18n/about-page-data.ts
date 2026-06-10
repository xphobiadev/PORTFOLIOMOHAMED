import type { Locale } from "@/types/i18n";
import { getLocalized, getLocalizedStringArray } from "@/types/i18n";
import type {
    AboutHeroV3,
    AboutTimelineItem,
    AboutSpecialization,
    AboutEducation,
    AboutStatV3,
    AboutTestimonialV3
} from "@/types/about.v3";

export type LocalizedAboutHero = {
    id: string;
    title_1: string;
    title_2: string;
    subtitle: string;
    tagline: string;
    badge_text: string;
    cta_text: string;
    cta_url: string;
    portrait_url: string;
};

export type LocalizedTimelineItem = {
    id: string;
    year: string;
    title: string;
    description: string;
    is_milestone: boolean;
    sort_order: number;
};

export type LocalizedSpecialization = {
    id: string;
    title: string;
    color: string;
    icon: string;
    items: string[];
    sort_order: number;
};

export type LocalizedEducation = {
    id: string;
    institution: string;
    title: string;
    type: AboutEducation["type"];
    year_start: string;
    year_end: string;
    logo_url: string;
    sort_order: number;
};

export type LocalizedStatV3 = {
    id: string;
    value: number;
    suffix: string;
    label: string;
    sort_order: number;
};

export type LocalizedTestimonialV3 = {
    id: string;
    author: string;
    role: string;
    company: string;
    quote: string;
    avatar_url: string;
    sort_order: number;
};

export function localizeAboutHero(row: AboutHeroV3 | null, locale: Locale): LocalizedAboutHero | null {
    if (!row) return null;
    return {
        id: row.id,
        title_1: getLocalized(row, locale, "title_1"),
        title_2: getLocalized(row, locale, "title_2"),
        subtitle: getLocalized(row, locale, "subtitle"),
        tagline: getLocalized(row, locale, "tagline"),
        badge_text: getLocalized(row, locale, "badge_text"),
        cta_text: getLocalized(row, locale, "cta_text"),
        cta_url: row.cta_url || "#timeline",
        portrait_url: row.portrait_url || ""
    };
}

export function localizeTimelineItem(row: AboutTimelineItem, locale: Locale): LocalizedTimelineItem {
    return {
        id: row.id,
        year: row.year,
        title: getLocalized(row, locale, "title"),
        description: getLocalized(row, locale, "description"),
        is_milestone: row.is_milestone,
        sort_order: row.sort_order
    };
}

export function localizeSpecialization(row: AboutSpecialization, locale: Locale): LocalizedSpecialization {
    const r = row as unknown as Record<string, unknown>;
    return {
        id: row.id,
        title: getLocalized(r, locale, "title"),
        color: row.color,
        icon: row.icon,
        items: getLocalizedStringArray(r, locale, "items"),
        sort_order: row.sort_order
    };
}

export function localizeEducationRow(row: AboutEducation & Record<string, unknown>, locale: Locale): LocalizedEducation {
    const legacy = typeof row.institution === "string" ? row.institution : "";
    const institution =
        getLocalized(row as Record<string, unknown>, locale, "institution") || legacy;

    return {
        id: row.id,
        institution,
        title: getLocalized(row as Record<string, unknown>, locale, "title"),
        type: row.type,
        year_start: row.year_start,
        year_end: row.year_end,
        logo_url: row.logo_url,
        sort_order: row.sort_order
    };
}

export function localizeStatV3(row: AboutStatV3, locale: Locale): LocalizedStatV3 {
    return {
        id: row.id,
        value: row.value,
        suffix: row.suffix,
        label: getLocalized(row, locale, "label"),
        sort_order: row.sort_order
    };
}

export function localizeTestimonialV3(row: AboutTestimonialV3, locale: Locale): LocalizedTestimonialV3 {
    return {
        id: row.id,
        author: row.author,
        role: getLocalized(row, locale, "role"),
        company: row.company,
        quote: getLocalized(row, locale, "quote"),
        avatar_url: row.avatar_url,
        sort_order: row.sort_order
    };
}
