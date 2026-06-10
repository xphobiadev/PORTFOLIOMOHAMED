"use client";

import { useState } from "react";
import { createHomeStat, updateHomeStat, deleteHomeStat } from "@/lib/actions/home";
import { Plus, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";

export function StatsEditor({ initialStats }: { initialStats: any[] }) {
    const [stats, setStats] = useState<any[]>(initialStats);
    const [isAdding, setIsAdding] = useState(false);

    const { lang, setLang, bindField } = useDashboardLanguage();

    const [newStat, setNewStat] = useState({
        label_fr: "", label_en: "",
        value_fr: "", value_en: ""
    });

    const handleAdd = async () => {
        if (!newStat.label_fr || !newStat.value_fr) return;
        try {
            await createHomeStat({ ...newStat, is_visible: true, sort_order: stats.length });
            setIsAdding(false);
            setNewStat({ label_fr: "", label_en: "", value_fr: "", value_en: "" });
            window.location.reload();
        } catch (e) {
            alert("Failed to add stat");
        }
    };

    const handleUpdateText = async (id: string, baseField: string, value: string) => {
        const fieldName = `${baseField}_${lang}`;
        const updated = stats.map(s => s.id === id ? { ...s, [fieldName]: value } : s);
        setStats(updated);
        await updateHomeStat(id, { [fieldName]: value });
    };

    const handleToggle = async (id: string, current: boolean) => {
        const updated = stats.map(s => s.id === id ? { ...s, is_visible: !current } : s);
        setStats(updated);
        await updateHomeStat(id, { is_visible: !current });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        setStats(stats.filter(s => s.id !== id));
        await deleteHomeStat(id);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div></div>
                <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 rounded-xl bg-mb-gold/10 px-4 py-2 text-sm font-bold text-mb-gold transition-colors hover:bg-mb-gold hover:text-black">
                    <Plus className="h-4 w-4" /> Add Metric
                </button>
            </div>

            <LanguageTabs currentLang={lang} onChange={setLang} />

            {isAdding && (
                <div className="mb-6 rounded-xl border border-mb-gold/30 bg-mb-gold/5 p-4 flex items-end gap-4 mt-4">
                    <div className="flex-[0.4]">
                        <label className="mb-1 block text-xs text-white/50">Value (e.g. 15+, %)</label>
                        <input {...bindField(newStat, setNewStat, "value")} className="w-full rounded border border-white/10 bg-black p-2 text-sm focus:border-mb-gold" />
                    </div>
                    <div className="flex-[0.6]">
                        <label className="mb-1 block text-xs text-white/50">Label</label>
                        <input {...bindField(newStat, setNewStat, "label")} className="w-full rounded border border-white/10 bg-black p-2 text-sm focus:border-mb-gold" />
                    </div>
                    <button onClick={handleAdd} className="rounded bg-mb-gold px-6 py-2 text-sm font-bold text-black">Save</button>
                </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-4">
                {stats.map((stat) => (
                    <div key={stat.id} className="relative flex flex-col justify-between rounded-xl border border-white/5 bg-white/5 p-4">
                        <div className="absolute right-2 top-2 flex flex-col gap-1">
                            <button onClick={() => handleToggle(stat.id, stat.is_visible)} className={`rounded p-1.5 transition-colors ${stat.is_visible ? 'text-green-500 hover:bg-green-500/10' : 'text-white/20 hover:bg-white/10'}`}>
                                {stat.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                            <button onClick={() => handleDelete(stat.id)} className="rounded p-1.5 text-red-500/50 transition-colors hover:bg-red-500/10 hover:text-red-500">
                                <Trash2 size={14} />
                            </button>
                        </div>
                        <div className="pr-8">
                            <input value={stat[`value_${lang}`] || ""} onChange={(e) => handleUpdateText(stat.id, "value", e.target.value)} className="w-full bg-transparent font-display text-4xl font-bold text-mb-gold focus:border-b focus:outline-none" />
                            <textarea value={stat[`label_${lang}`] || ""} onChange={(e) => handleUpdateText(stat.id, "label", e.target.value)} rows={2} className="mt-2 w-full resize-none bg-transparent text-sm leading-tight text-white/60 focus:border-b focus:outline-none" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
