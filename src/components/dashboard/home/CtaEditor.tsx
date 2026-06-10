"use client";

import { useState } from "react";
import { updateHomeCta } from "@/lib/actions/home";
import { MediaUploader } from "@/components/admin/media-uploader";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";

export function CtaEditor({ cta }: { cta: any }) {
    const [isSaving, setIsSaving] = useState(false);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const [formData, setFormData] = useState({
        title_1_fr: cta?.title_1_fr ?? "", title_1_en: cta?.title_1_en ?? "",
        title_2_fr: cta?.title_2_fr ?? "", title_2_en: cta?.title_2_en ?? "",
        title_3_fr: cta?.title_3_fr ?? "", title_3_en: cta?.title_3_en ?? "",
        cta_label_fr: cta?.cta_label_fr ?? "", cta_label_en: cta?.cta_label_en ?? "",
        cta_url: cta?.cta_url ?? "",
        background_url: cta?.background_url ?? "",
    });

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await updateHomeCta(formData);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-6">
            <LanguageTabs currentLang={lang} onChange={setLang} />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mt-4">
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="mb-1 block text-xs text-white/50">Kicker Top</label>
                            <input {...bindField(formData, setFormData, "title_1")} className="w-full rounded border border-white/10 bg-white/5 p-2 text-sm focus:border-white" />
                        </div>
                        <div className="flex-1">
                            <label className="mb-1 block text-xs text-mb-gold">Gold Text</label>
                            <input {...bindField(formData, setFormData, "title_2")} className="w-full rounded border border-mb-gold/30 bg-white/5 p-2 text-sm text-mb-gold focus:border-mb-gold" />
                        </div>
                        <div className="flex-1">
                            <label className="mb-1 block text-xs text-white/50">Text Right</label>
                            <input {...bindField(formData, setFormData, "title_3")} className="w-full rounded border border-white/10 bg-white/5 p-2 text-sm focus:border-white" />
                        </div>
                    </div>
                    <div className="flex gap-4 border-t border-white/5 pt-4">
                        <div className="flex-1">
                            <label className="mb-1 block text-xs font-bold text-white">Button Label</label>
                            <input {...bindField(formData, setFormData, "cta_label")} className="w-full rounded border border-white/10 bg-white/5 p-2 text-sm" />
                        </div>
                        <div className="flex-1">
                            <label className="mb-1 block text-xs font-bold text-white">Button Link</label>
                            <input value={formData.cta_url} onChange={e => setFormData({ ...formData, cta_url: e.target.value })} className="w-full rounded border border-white/10 bg-white/5 p-2 text-sm" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="mb-1 block text-xs font-bold text-white">Footer Background Image</label>
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]">
                        {formData.background_url ? (
                            <div className="relative group aspect-video">
                                {formData.background_url.match(/\.(mp4|webm|ogg)$/i) ? (
                                    <video src={formData.background_url} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                                ) : (
                                    <img src={formData.background_url} alt="CTA BG" className="h-full w-full object-cover" />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 z-10">
                                    <button onClick={() => setFormData({ ...formData, background_url: "" })} className="rounded bg-red-500/80 px-4 py-2 text-xs font-bold hover:bg-red-500 pointer-events-auto">Remove</button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4">
                                <MediaUploader onUploadComplete={(items) => setFormData({ ...formData, background_url: items[0]?.url })} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button onClick={handleSave} disabled={isSaving} className="rounded-xl bg-white px-8 py-2 font-bold text-black hover:bg-white/90">
                    {isSaving ? "Saving..." : "Save Footer"}
                </button>
            </div>
        </div>
    );
}
