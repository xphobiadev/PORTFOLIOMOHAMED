"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { createStatV3, updateStatV3, deleteStatV3 } from "@/lib/services/about.v3.service";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";
import { Loader2, Plus, Trash2 } from "lucide-react";

export function StatsEditorV3({ initialData }: { initialData: any[] }) {
    const [items, setItems] = useState(initialData || []);
    const [saving, setSaving] = useState<string | null>(null);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const handleSave = async (item: any, index: number) => {
        setSaving(item.id || `new-${index}`);
        try {
            if (item.id) {
                const { id, created_at, ...rest } = item;
                await updateStatV3(id, rest);
            } else {
                const { id, ...rest } = item;
                const result = await createStatV3(rest);
                const updated = [...items];
                updated[index] = result;
                setItems(updated);
            }
            toast.success("Stat saved!");
        } catch (err: any) {
            toast.error(err.message);
        }
        setSaving(null);
    };

    const handleDelete = async (id: string, index: number) => {
        if (!confirm("Delete this stat?")) return;
        try {
            if (id) await deleteStatV3(id);
            setItems(items.filter((_, i) => i !== index));
            toast.success("Deleted!");
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    const handleAdd = () => {
        setItems([...items, { value: 0, suffix: "+", label_fr: "", label_en: "", sort_order: items.length }]);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Stats ({items.length})</h3>
                <LanguageTabs currentLang={lang} onChange={setLang} />
            </div>

            {items.map((item, index) => (
                <div key={item.id || index} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
                    <div className="flex gap-4">
                        <div className="w-24">
                            <label className="text-xs text-white/50">Value</label>
                            <input type="number" className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white outline-none" value={item.value || 0} onChange={e => { const u = [...items]; u[index] = { ...item, value: parseInt(e.target.value) || 0 }; setItems(u); }} />
                        </div>
                        <div className="w-20">
                            <label className="text-xs text-white/50">Suffix</label>
                            <input className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white outline-none" value={item.suffix || ''} onChange={e => { const u = [...items]; u[index] = { ...item, suffix: e.target.value }; setItems(u); }} />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-white/50">Label ({lang.toUpperCase()})</label>
                            <input className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white outline-none" {...bindField(item, (v: any) => { const u = [...items]; u[index] = v; setItems(u); }, "label")} />
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
                <Plus size={16} /> Add Stat
            </button>
        </div>
    );
}
