"use client";

import { useState } from "react";
import { updateAboutHero } from "@/lib/actions/about";
import { MediaUploader } from "@/components/admin/media-uploader";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";

export function HeroEditor({ hero }: { hero: any }) {
    const [isSaving, setIsSaving] = useState(false);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const [formData, setFormData] = useState({
        label_fr: hero?.label_fr ?? "", label_en: hero?.label_en ?? "",
        title_1_fr: hero?.title_1_fr ?? "", title_1_en: hero?.title_1_en ?? "",
        title_2_fr: hero?.title_2_fr ?? "", title_2_en: hero?.title_2_en ?? "",
        subtitle_fr: hero?.subtitle_fr ?? "", subtitle_en: hero?.subtitle_en ?? "",
        avatar_url: hero?.avatar_url ?? "",
    });

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await updateAboutHero(formData);
        } catch (error) {
            alert("Failed to save Hero section");
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
                    <input {...bindField(formData, setFormData, "label")} className="w-full rounded border border-white/10 bg-black p-3 text-sm focus:border-mb-gold" />
                </div>
                <div>
                    <label className="mb-1 block text-xs text-white/50">Title Line 1</label>
                    <input {...bindField(formData, setFormData, "title_1")} className="w-full rounded border border-white/10 bg-black p-3 text-sm focus:border-mb-gold" />
                </div>
                <div>
                    <label className="mb-1 block text-xs text-white/50">Title Line 2</label>
                    <input {...bindField(formData, setFormData, "title_2")} className="w-full rounded border border-white/10 bg-black p-3 text-sm focus:border-mb-gold" />
                </div>
                <div className="lg:col-span-2">
                    <label className="mb-1 block text-xs text-white/50">Subtitle Description</label>
                    <textarea {...bindField(formData, setFormData, "subtitle")} rows={3} className="w-full rounded border border-white/10 bg-black p-3 text-sm focus:border-mb-gold" />
                </div>
                <div>
                    <label className="mb-1 block text-xs text-white/50">Avatar Image</label>
                    <div className="overflow-hidden rounded border border-white/10 bg-[#0d0d0d] h-[92px]">
                        {formData.avatar_url ? (
                            <div className="relative group h-full">
                                <img src={formData.avatar_url} className="h-full w-full object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <button onClick={() => setFormData({ ...formData, avatar_url: "" })} className="rounded bg-red-500/80 px-2 py-1 text-xs hover:bg-red-500">Remove</button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-2 h-full flex items-center">
                                <MediaUploader onUploadComplete={(items) => setFormData({ ...formData, avatar_url: items[0]?.url })} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <button onClick={handleSave} disabled={isSaving} className="rounded bg-mb-gold px-6 py-2 text-sm font-bold text-black border border-mb-gold hover:bg-black hover:text-mb-gold">
                    {isSaving ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}
