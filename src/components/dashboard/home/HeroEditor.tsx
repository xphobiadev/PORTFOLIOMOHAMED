"use client";

import { useState } from "react";
import { updateHomeHero } from "@/lib/actions/home";
import { MediaUploader } from "@/components/admin/media-uploader";
import { motion } from "framer-motion";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";

export function HeroEditor({ hero }: { hero: any }) {
    const [isSaving, setIsSaving] = useState(false);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const [formData, setFormData] = useState({
        title_1_fr: hero?.title_1_fr ?? "", title_1_en: hero?.title_1_en ?? "",
        title_2_fr: hero?.title_2_fr ?? "", title_2_en: hero?.title_2_en ?? "",
        title_3_fr: hero?.title_3_fr ?? "", title_3_en: hero?.title_3_en ?? "",
        subtitle_fr: hero?.subtitle_fr ?? "", subtitle_en: hero?.subtitle_en ?? "",
        cta_primary_label_fr: hero?.cta_primary_label_fr ?? "", cta_primary_label_en: hero?.cta_primary_label_en ?? "",
        cta_primary_url: hero?.cta_primary_url ?? "",
        cta_secondary_label_fr: hero?.cta_secondary_label_fr ?? "", cta_secondary_label_en: hero?.cta_secondary_label_en ?? "",
        cta_secondary_url: hero?.cta_secondary_url ?? "",
        background_url: hero?.background_url ?? "",
    });

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await updateHomeHero(formData);
        } catch (error) {
            console.error(error);
            alert("Failed to save Hero section");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6">
            <LanguageTabs currentLang={lang} onChange={setLang} />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mt-4">
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="mb-1 block text-xs text-white/50">Title Line 1</label>
                            <input {...bindField(formData, setFormData, "title_1")} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm focus:border-mb-gold" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs text-white/50">Title Line 2</label>
                            <input {...bindField(formData, setFormData, "title_2")} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm focus:border-mb-gold" />
                        </div>
                        <div>
                            <label className="mb-1 block text-xs text-mb-gold">Title Line 3 (Colored)</label>
                            <input {...bindField(formData, setFormData, "title_3")} className="w-full rounded-xl border border-mb-gold/30 bg-white/5 p-3 text-sm text-mb-gold focus:border-mb-gold" />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-xs text-white/50">Subtitle</label>
                        <textarea {...bindField(formData, setFormData, "subtitle")} rows={2} className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm focus:border-mb-gold" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                            <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-white">Primary CTA</label>
                            <div className="space-y-3">
                                <input {...bindField(formData, setFormData, "cta_primary_label")} placeholder="Label" className="w-full rounded border border-white/10 bg-black/50 p-2 text-sm" />
                                <input value={formData.cta_primary_url} onChange={e => setFormData({ ...formData, cta_primary_url: e.target.value })} placeholder="URL (Universal)" className="w-full rounded border border-white/10 bg-black/50 p-2 text-sm" />
                            </div>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                            <label className="mb-3 block text-xs font-bold uppercase tracking-wider text-white">Secondary CTA</label>
                            <div className="space-y-3">
                                <input {...bindField(formData, setFormData, "cta_secondary_label")} placeholder="Label" className="w-full rounded border border-white/10 bg-black/50 p-2 text-sm" />
                                <input value={formData.cta_secondary_url} onChange={e => setFormData({ ...formData, cta_secondary_url: e.target.value })} placeholder="URL (Universal)" className="w-full rounded border border-white/10 bg-black/50 p-2 text-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-xs text-white/50">Cinematic Background Image</label>
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]">
                        {formData.background_url ? (
                            <div className="relative group aspect-video">
                                {formData.background_url.match(/\.(mp4|webm|ogg)$/i) ? (
                                    <video src={formData.background_url} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                                ) : (
                                    <img src={formData.background_url} alt="Hero BG" className="h-full w-full object-cover" />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 z-10">
                                    <button onClick={() => setFormData({ ...formData, background_url: "" })} className="rounded bg-red-500/80 px-4 py-2 text-xs font-bold hover:bg-red-500 pointer-events-auto">Remove Media</button>
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
                <button onClick={handleSave} disabled={isSaving} className="rounded-xl bg-mb-gold px-6 py-2 text-black transition-transform hover:scale-105 disabled:opacity-50">
                    {isSaving ? "Saving..." : "Save Hero Content"}
                </button>
            </div>
        </motion.div>
    );
}
