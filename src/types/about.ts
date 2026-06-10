export interface AboutHero {
    id: string;
    label: string;
    title_1: string;
    title_2: string;
    subtitle: string;
    avatar_url: string;
}

export interface AboutInfo {
    id: string;
    label: string;
    value: string;
    is_visible: boolean;
    sort_order: number;
}

export interface AboutStat {
    id: string;
    value: string;
    label: string;
    is_visible: boolean;
    sort_order: number;
}

export interface AboutSkill {
    id: string;
    name: string;
    category: string;
    is_visible: boolean;
    sort_order: number;
}

export interface Testimonial {
    id: string;
    author: string;
    role: string | null;
    company: string | null;
    content: string;
    created_at?: string;
    avatar_url?: string | null;
    is_visible?: boolean;
    sort_order?: number;
}
