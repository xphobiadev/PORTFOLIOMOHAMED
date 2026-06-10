export type Locale = 'fr' | 'en';

export const i18n = {
    defaultLocale: 'fr',
    locales: ['fr', 'en'] as Locale[],
} as const;

// Helper to reliably extract the localized string from a database row object
export function getLocalized(row: any, locale: Locale, fieldName: string): string {
    if (!row) return "";
    const tryVal = (loc: Locale) => {
        const v = row[`${fieldName}_${loc}`];
        if (v == null) return "";
        const s = typeof v === "string" ? v.trim() : String(v).trim();
        return s;
    };
    const order: Locale[] = locale === "en" ? ["en", "fr"] : ["fr", "en"];
    for (const loc of order) {
        const s = tryVal(loc);
        if (s) return s;
    }
    return "";
}

/** JSON array columns: `items` (legacy FR list), optional `items_en`. */
export function getLocalizedStringArray(
    row: Record<string, unknown>,
    locale: Locale,
    baseKey: string
): string[] {
    const parse = (raw: unknown): string[] => {
        if (Array.isArray(raw)) return raw.map((x) => String(x));
        if (typeof raw === "string") {
            try {
                const j = JSON.parse(raw) as unknown;
                return Array.isArray(j) ? j.map((x) => String(x)) : [];
            } catch {
                return [];
            }
        }
        return [];
    };

    const columnFor = (loc: Locale) => {
        if (baseKey === "items" && loc === "fr") return "items";
        return `${baseKey}_${loc}`;
    };

    const order: Locale[] = locale === "en" ? ["en", "fr"] : ["fr", "en"];
    for (const loc of order) {
        const arr = parse(row[columnFor(loc)]);
        if (arr.length) return arr;
    }
    return [];
}
