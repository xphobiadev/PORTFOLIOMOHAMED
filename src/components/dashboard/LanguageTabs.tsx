"use client";

import { Locale } from "@/types/i18n";

interface LanguageTabsProps {
    currentLang: Locale;
    onChange: (lang: Locale) => void;
}

export function LanguageTabs({ currentLang, onChange }: LanguageTabsProps) {
    const langs: { code: Locale; label: string }[] = [
        { code: "fr", label: "Français" },
        { code: "en", label: "English" },
    ];

    return (
        <div className="mb-4 flex gap-2 border-b border-white/10 pb-2">
            {langs.map((l) => (
                <button
                    key={l.code}
                    onClick={() => onChange(l.code)}
                    type="button"
                    className={`rounded-t-lg px-4 py-2 text-sm font-bold transition-colors ${currentLang === l.code
                            ? "bg-mb-gold text-black"
                            : "bg-white/5 text-white hover:bg-white/10"
                        }`}
                >
                    {l.label}
                </button>
            ))}
        </div>
    );
}
