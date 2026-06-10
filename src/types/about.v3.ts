// About V3 Types — Ultra Pro About Page

export interface AboutHeroV3 {
    id: string;
    title_1_fr: string;
    title_1_en: string;
    title_1_ar: string;
    title_2_fr: string;
    title_2_en: string;
    title_2_ar: string;
    subtitle_fr: string;
    subtitle_en: string;
    subtitle_ar: string;
    tagline_fr: string;
    tagline_en: string;
    tagline_ar: string;
    portrait_url: string;
    badge_text_fr: string;
    badge_text_en: string;
    badge_text_ar: string;
    cta_text_fr: string;
    cta_text_en: string;
    cta_text_ar: string;
    cta_url: string;
}

export interface AboutTimelineItem {
    id: string;
    year: string;
    title_fr: string;
    title_en: string;
    title_ar: string;
    description_fr: string;
    description_en: string;
    description_ar: string;
    is_milestone: boolean;
    sort_order: number;
}

export interface AboutSpecialization {
    id: string;
    title_fr: string;
    title_en: string;
    title_ar: string;
    color: string;
    icon: string;
    /** Legacy FR list from DB (jsonb) */
    items: string[] | unknown;
    items_en?: string[] | unknown;
    items_ar?: string[] | unknown;
    sort_order: number;
}

export interface AboutEducation {
    id: string;
    /** @deprecated use institution_fr — kept for DB rows before migration */
    institution?: string;
    institution_fr?: string;
    institution_en?: string;
    institution_ar?: string;
    title_fr: string;
    title_en: string;
    title_ar: string;
    type: 'university' | 'online' | 'bootcamp' | 'professional';
    year_start: string;
    year_end: string;
    logo_url: string;
    sort_order: number;
}

export interface AboutStatV3 {
    id: string;
    value: number;
    suffix: string;
    label_fr: string;
    label_en: string;
    label_ar: string;
    sort_order: number;
}

export interface AboutTestimonialV3 {
    id: string;
    author: string;
    role_fr: string;
    role_en: string;
    role_ar: string;
    company: string;
    quote_fr: string;
    quote_en: string;
    quote_ar: string;
    avatar_url: string;
    sort_order: number;
}
