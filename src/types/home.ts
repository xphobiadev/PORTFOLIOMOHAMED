export interface HomeHero {
    id: string;
    title_1: string;
    title_2: string;
    title_3: string;
    subtitle: string;
    cta_primary_label: string;
    cta_primary_url: string;
    cta_secondary_label: string;
    cta_secondary_url: string;
    background_url: string | null;
}

export interface HomeFeaturedProject {
    id: string;
    portfolio_id: string;
    sort_order: number;
}

export interface HomeStat {
    id: string;
    value: string;
    label: string;
    icon: string;
    is_visible: boolean;
    sort_order: number;
}

export interface HomeCta {
    id: string;
    title_1: string;
    title_2: string;
    title_3: string;
    cta_label: string;
    cta_url: string;
    background_url: string | null;
}

export interface HomeServicesContent {
    id: string;
    section_label: string;
    section_title: string;
    section_subtitle: string;
}

export interface HomeService {
    id: string;
    title: string;
    icon: string;
    is_visible: boolean;
    sort_order: number;
}
