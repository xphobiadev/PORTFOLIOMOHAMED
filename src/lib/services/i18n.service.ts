import { Locale, getLocalized } from "@/types/i18n";

/**
 * Given a raw database row (containing _fr, _en, _ar fields), 
 * builds a localized version of the row mapping the requested fields to standard root keys.
 * e.g. localizeRow({ title_fr: 'Bonjour', title_en: 'Hello' }, 'en', ['title']) => { title: 'Hello' }
 */
export function localizeRow<T extends Record<string, any>>(
    row: T,
    locale: Locale,
    textFields: string[]
): Record<string, any> {
    const result: any = { ...row };

    // Clean up the object to make it standard
    textFields.forEach(field => {
        // Map the resolved text to the base field name
        result[field] = getLocalized(row, locale, field);
    });

    return result;
}
