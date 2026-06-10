"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { createTimelineItem, updateTimelineItem, deleteTimelineItem } from "@/lib/services/about.v3.service";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";
import { Loader2, Plus, Trash2 } from "lucide-react";

export function TimelineEditorV3({ initialData }: { initialData: any[] }) {
    const [items, setItems] = useState(initialData || []);
    const [saving, setSaving] = useState<string | null>(null);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const handleSave = async (item: any, index: number) => {
        setSaving(item.id || `new-${index}`);
        try {
            if (item.id) {
                const { id, created_at, ...rest } = item;
                await updateTimelineItem(id, rest);
            } else {
                const { id, ...rest } = item;
                const result = await createTimelineItem(rest);
                const updated = [...items];
                updated[index] = result;
                setItems(updated);
            }
            toast.success("Timeline item saved!");
        } catch (err: any) {
            toast.error(err.message);
        }
        setSaving(null);
    };

    const handleDelete = async (id: string, index: number) => {
        if (!confirm("Delete this timeline item?")) return;
        try {
            if (id) await deleteTimelineItem(id);
            setItems(items.filter((_, i) => i !== index));
            toast.success("Deleted!");
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const handleAdd = () => {
        setItems([...items, { year: "", title_fr: "", title_en: "", description_fr: "", description_en: "", is_milestone: false, sort_order: items.length }]);
    };

    const handleMoveUp = (index: number) => {
        if (index === 0) return;
        const u = [...items];
        const temp = u[index - 1];
        u[index - 1] = u[index];
        u[index] = temp;
        // Update sort_order for both
        u[index - 1].sort_order = index - 1;
        u[index].sort_order = index;
        setItems(u);
    };

    const handleMoveDown = (index: number) => {
        if (index === items.length - 1) return;
        const u = [...items];
        const temp = u[index + 1];
        u[index + 1] = u[index];
        u[index] = temp;
        // Update sort_order for both
        u[index + 1].sort_order = index + 1;
        u[index].sort_order = index;
        setItems(u);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Timeline ({items.length})</h3>
                <LanguageTabs currentLang={lang} onChange={setLang} />
            </div>

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={item.id || index} className="group relative rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20">
                        {/* Drag/Sort Handles */}
                        <div className="absolute -left-3 top-1/2 flex -translate-y-1/2 flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                                onClick={() => handleMoveUp(index)}
                                disabled={index === 0}
                                className="rounded-md bg-black border border-white/10 p-1 text-white/50 hover:text-mb-gold disabled:opacity-20"
                            >
                                <Plus size={14} className="rotate-45" /> {/* Using Plus rotated as placeholder for Up if needed, but better use real icons */}
                                <span className="sr-only">Move Up</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                            </button>
                            <button
                                onClick={() => handleMoveDown(index)}
                                disabled={index === items.length - 1}
                                className="rounded-md bg-black border border-white/10 p-1 text-white/50 hover:text-mb-gold disabled:opacity-20"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-4 items-end">
                                <div className="w-24">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/30">Order</label>
                                    <input
                                        type="number"
                                        className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white outline-none font-mono text-sm focus:border-mb-gold/50"
                                        value={item.sort_order ?? 0}
                                        onChange={e => {
                                            const u = [...items];
                                            u[index] = { ...item, sort_order: parseInt(e.target.value) || 0 };
                                            setItems(u);
                                        }}
                                    />
                                </div>
                                <div className="w-32">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/30">Year</label>
                                    <input className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white outline-none font-mono text-sm focus:border-mb-gold/50" value={item.year || ''} onChange={e => { const u = [...items]; u[index] = { ...item, year: e.target.value }; setItems(u); }} />
                                </div>
                                <div className="flex-1 min-w-[200px]">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/30">Title ({lang.toUpperCase()})</label>
                                    <input className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white outline-none text-sm focus:border-mb-gold/50" {...bindField(item, (v: any) => { const u = [...items]; u[index] = v; setItems(u); }, "title")} />
                                </div>
                                <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/30 cursor-pointer pb-3 hover:text-white/60 transition-colors">
                                    <input type="checkbox" checked={item.is_milestone || false} onChange={e => { const u = [...items]; u[index] = { ...item, is_milestone: e.target.checked }; setItems(u); }} className="accent-mb-gold" />
                                    Milestone
                                </label>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-wider text-white/30">Description ({lang.toUpperCase()})</label>
                                <textarea className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white outline-none resize-none text-sm focus:border-mb-gold/50" rows={2} {...bindField(item, (v: any) => { const u = [...items]; u[index] = v; setItems(u); }, "description")} />
                            </div>
                            <div className="flex gap-2 justify-end pt-2 border-t border-white/5">
                                <button onClick={() => handleDelete(item.id, index)} className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/20 transition-colors">
                                    <Trash2 size={12} /> Delete
                                </button>
                                <button onClick={() => handleSave(item, index)} disabled={saving === (item.id || `new-${index}`)} className="flex items-center gap-2 rounded-lg bg-mb-gold px-5 py-2 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-mb-gold/90 disabled:opacity-50 transition-all">
                                    {saving === (item.id || `new-${index}`) ? <Loader2 size={12} className="animate-spin" /> : null}
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={handleAdd} className="flex items-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-3 text-sm text-white/60 hover:border-mb-gold hover:text-mb-gold transition-colors w-full justify-center">
                <Plus size={16} /> Add Timeline Item
            </button>
        </div>
    );
}
