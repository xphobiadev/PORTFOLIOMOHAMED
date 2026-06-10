"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { createEducation, updateEducation, deleteEducation } from "@/lib/services/about.v3.service";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";
import { Loader2, Plus, Trash2 } from "lucide-react";

export function EducationEditorV3({ initialData }: { initialData: any[] }) {
    const [items, setItems] = useState(initialData || []);
    const [saving, setSaving] = useState<string | null>(null);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const handleSave = async (item: any, index: number) => {
        setSaving(item.id || `new-${index}`);
        try {
            if (item.id) {
                const { id, created_at, ...rest } = item;
                await updateEducation(id, rest);
            } else {
                const { id, ...rest } = item;
                const result = await createEducation(rest);
                const updated = [...items];
                updated[index] = result;
                setItems(updated);
            }
            toast.success("Education saved!");
        } catch (err: any) {
            toast.error(err.message);
        }
        setSaving(null);
    };

    const handleDelete = async (id: string, index: number) => {
        if (!confirm("Delete?")) return;
        try {
            if (id) await deleteEducation(id);
            setItems(items.filter((_, i) => i !== index));
            toast.success("Deleted!");
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const handleAdd = () => {
        setItems([
            ...items,
            {
                institution_fr: "",
                institution_en: "",
                title_fr: "",
                title_en: "",
                type: "online",
                year_start: "",
                year_end: "",
                logo_url: "",
                sort_order: items.length
            }
        ]);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Education ({items.length})</h3>
                <LanguageTabs currentLang={lang} onChange={setLang} />
            </div>

            {items.map((item, index) => (
                <div key={item.id || index} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-white/50">Institution ({lang.toUpperCase()})</label>
                            <input
                                className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white outline-none"
                                {...bindField(item, (v: any) => {
                                    const u = [...items];
                                    u[index] = v;
                                    setItems(u);
                                }, "institution")}
                            />
                        </div>
                        <div className="w-36">
                            <label className="text-xs text-white/50">Type</label>
                            <select className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-2 py-2 text-white outline-none text-sm" value={item.type || 'online'} onChange={e => { const u = [...items]; u[index] = { ...item, type: e.target.value }; setItems(u); }}>
                                <option value="university">University</option>
                                <option value="online">Online</option>
                                <option value="bootcamp">Bootcamp</option>
                                <option value="professional">Professional</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-white/50">Title ({lang.toUpperCase()})</label>
                            <input className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white outline-none" {...bindField(item, (v: any) => { const u = [...items]; u[index] = v; setItems(u); }, "title")} />
                        </div>
                        <div className="w-24">
                            <label className="text-xs text-white/50">Year Start</label>
                            <input className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white outline-none font-mono" value={item.year_start || ''} onChange={e => { const u = [...items]; u[index] = { ...item, year_start: e.target.value }; setItems(u); }} />
                        </div>
                        <div className="w-24">
                            <label className="text-xs text-white/50">Year End</label>
                            <input className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white outline-none font-mono" value={item.year_end || ''} onChange={e => { const u = [...items]; u[index] = { ...item, year_end: e.target.value }; setItems(u); }} />
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <button onClick={() => handleSave(item, index)} disabled={saving === (item.id || `new-${index}`)} className="flex items-center gap-1 rounded-lg bg-mb-gold px-4 py-2 text-xs font-bold text-black hover:bg-mb-gold/90 disabled:opacity-50">
                            {saving === (item.id || `new-${index}`) && <Loader2 size={12} className="animate-spin" />} Save
                        </button>
                        <button onClick={() => handleDelete(item.id, index)} className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400 hover:bg-red-500/20">
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            ))}

            <button onClick={handleAdd} className="flex items-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-3 text-sm text-white/60 hover:border-mb-gold hover:text-mb-gold transition-colors w-full justify-center">
                <Plus size={16} /> Add Education
            </button>
        </div>
    );
}
