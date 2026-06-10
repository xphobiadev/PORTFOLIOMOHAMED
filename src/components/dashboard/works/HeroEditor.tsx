"use client";

import { useState } from "react";
import { updateWorksHero } from "@/lib/actions/works";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";

export function HeroEditor({ hero }: { hero: any }) {
    const [isSaving, setIsSaving] = useState(false);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const [formData, setFormData] = useState({
        label_fr: hero?.label_fr ?? "",
        label_en: hero?.label_en ?? "",
        title_fr: hero?.title_fr ?? "",
        title_en: hero?.title_en ?? "",
        subtitle_fr: hero?.subtitle_fr ?? "",
        subtitle_en: hero?.subtitle_en ?? "",
    });

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await updateWorksHero(formData);
            alert("Saved Works Hero!");
        } catch (e) {
            alert("Failed to save Works Hero");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-6">
            <LanguageTabs currentLang={lang} onChange={setLang} />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
                <div>
                    <label className="mb-1 block text-xs text-mb-gold">Overline Label</label>
                    <input
                        {...bindField(formData, setFormData, "label")}
                        className="w-full rounded border border-white/10 bg-black p-3 text-sm text-mb-gold focus:border-mb-gold"
                        placeholder="PORTFOLIO"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-xs text-white/50">Main Title</label>
                    <input
                        {...bindField(formData, setFormData, "title")}
                        className="w-full rounded border border-white/10 bg-black p-3 text-sm focus:border-mb-gold"
                        placeholder="MY WORKS"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-xs text-white/50">Subtitle</label>
                    <textarea
                        {...bindField(formData, setFormData, "subtitle")}
                        className="w-full rounded border border-white/10 bg-black p-3 text-sm focus:border-mb-gold h-[46px]"
                    />
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <button onClick={handleSave} disabled={isSaving} className="rounded bg-mb-gold px-6 py-2 text-sm font-bold text-black transition-colors hover:bg-mb-gold/80 disabled:opacity-50">
                    {isSaving ? "Saving..." : "Save Headers"}
                </button>
            </div>
        </div>
    );
}
