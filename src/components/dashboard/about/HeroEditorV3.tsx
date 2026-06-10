"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { updateAboutHeroV3 } from "@/lib/services/about.v3.service";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";
import { MediaUploader } from "@/components/admin/media-uploader";
import { Loader2 } from "lucide-react";

export function HeroEditorV3({ initialData }: { initialData: any }) {
    const [form, setForm] = useState(initialData || {});
    const [saving, setSaving] = useState(false);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateAboutHeroV3(form);
            toast.success("Hero updated!");
        } catch (err: any) {
            toast.error(err.message);
        }
        setSaving(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Hero Section</h3>
                <LanguageTabs currentLang={lang} onChange={setLang} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="text-xs text-white/50 uppercase tracking-wider">Title Line 1</label>
                    <input className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-mb-gold outline-none" {...bindField(form, setForm, "title_1")} />
                </div>
                <div>
                    <label className="text-xs text-white/50 uppercase tracking-wider">Title Line 2</label>
                    <input className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-mb-gold outline-none" {...bindField(form, setForm, "title_2")} />
                </div>
            </div>

            <div>
                <label className="text-xs text-white/50 uppercase tracking-wider">Subtitle</label>
                <textarea className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-mb-gold outline-none resize-none" rows={2} {...bindField(form, setForm, "subtitle")} />
            </div>

            <div>
                <label className="text-xs text-white/50 uppercase tracking-wider">Tagline (text scramble)</label>
                <textarea className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-mb-gold outline-none resize-none" rows={2} {...bindField(form, setForm, "tagline")} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="text-xs text-white/50 uppercase tracking-wider">Badge Text</label>
                    <input className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-mb-gold outline-none" {...bindField(form, setForm, "badge_text")} />
                </div>
                <div>
                    <label className="text-xs text-white/50 uppercase tracking-wider">CTA Text</label>
                    <input className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-mb-gold outline-none" {...bindField(form, setForm, "cta_text")} />
                </div>
            </div>

            <div>
                <label className="text-xs text-white/50 uppercase tracking-wider">CTA URL</label>
                <input
                    className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-mb-gold outline-none"
                    value={form.cta_url || ""}
                    onChange={(e) => setForm({ ...form, cta_url: e.target.value })}
                />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-xs text-white/50 uppercase tracking-wider">Portrait image</label>
                    {form.portrait_url ? (
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, portrait_url: "" })}
                            className="text-xs font-medium text-red-400/90 hover:text-red-300"
                        >
                            Remove portrait
                        </button>
                    ) : null}
                </div>
                <p className="mt-1 text-xs text-white/35">Upload to Supabase storage or paste a public image URL.</p>

                <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-stretch">
                    <div className="relative mx-auto w-full max-w-[220px] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#111] aspect-[3/4] lg:mx-0">
                        {form.portrait_url ? (
                            <img
                                src={form.portrait_url}
                                alt="Portrait preview"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 px-4 text-center text-xs text-white/35">
                                <span>No portrait yet</span>
                            </div>
                        )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-4">
                        <MediaUploader
                            onUploadComplete={(items) => {
                                const url = items[0]?.url as string | undefined;
                                if (url) setForm({ ...form, portrait_url: url });
                            }}
                        />
                        <div>
                            <label className="text-xs text-white/50 uppercase tracking-wider">Or paste image URL</label>
                            <input
                                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-mb-gold outline-none"
                                value={form.portrait_url || ""}
                                onChange={(e) => setForm({ ...form, portrait_url: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded-xl bg-mb-gold px-6 py-3 text-sm font-bold text-black hover:bg-mb-gold/90 transition-colors disabled:opacity-50">
                {saving && <Loader2 size={16} className="animate-spin" />} Save Hero
            </button>
        </div>
    );
}
