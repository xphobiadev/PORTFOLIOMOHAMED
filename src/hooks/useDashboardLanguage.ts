"use client";

import { useState } from "react";
import { Locale } from "@/types/i18n";

export function useDashboardLanguage() {
    const [lang, setLang] = useState<Locale>("fr");

    // Helper to map values from the generic form state to the multi-language DB payload
    // formData usually holds standard keys like title, subtitle, but locally in state we
    // could map it directly. Wait, the easiest approach: build a multi-language state directly!
    // example: { title_fr, title_en, title_ar }

    const dir = "ltr";

    // Returns a function that automatically generates input props to bind to state
    const bindField = <T extends object>(state: T, setState: (v: T) => void, baseField: string) => {
        const key = `${baseField}_${lang}` as keyof T;
        const fallbackKey = `${baseField}_fr` as keyof T;

        return {
            value: (state[key] as string) || "",
            onChange: (e: any) => setState({ ...state, [key]: e.target.value }),
            dir: dir,
            placeholder: lang !== 'fr' ? ((state[fallbackKey] as string) || "Traduire depuis le FR...") : "",
        };
    };

    return { lang, setLang, dir, bindField };
}
