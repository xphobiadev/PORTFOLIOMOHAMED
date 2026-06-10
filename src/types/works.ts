export interface WorksHero {
    id: string;
    label: string;
    title: string;
    subtitle: string;
}

export interface WorksCategory {
    id: string;
    name: string;
    slug: string;
    is_visible: boolean;
    sort_order: number;
}
