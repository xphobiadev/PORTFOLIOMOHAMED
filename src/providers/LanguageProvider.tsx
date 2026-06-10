"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, i18n } from "@/types/i18n";
import Cookies from "js-cookie";

interface LanguageContextType {
    locale: Locale;
    setLocale: (l: Locale) => void;
    t: (fr: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
    locale: "fr",
    setLocale: () => {},
    t: (fr: string, en: string) => fr
});

export function LanguageProvider({ children, initialLocale }: { children: React.ReactNode, initialLocale: Locale }) {
    const [locale, setLocaleState] = useState<Locale>(initialLocale || "fr");

    useEffect(() => {
        if (initialLocale) {
            setLocaleState(initialLocale);
        }
    }, [initialLocale]);

    useEffect(() => {
        console.log("[LanguageProvider] Active locale:", locale);
        document.documentElement.lang = locale;
        document.documentElement.dir = 'ltr';
    }, [locale]);

    const setLocale = (newLocale: Locale) => {
        Cookies.set('mb-locale', newLocale, { expires: 365, path: '/' });
        setLocaleState(newLocale);
        window.location.reload(); 
    };

    const t = (fr: string, en: string) => (locale === "en" ? en : fr);

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    return context;
}
