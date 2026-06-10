"use client";

import { useState } from "react";
import { createAboutStat, updateAboutStat, deleteAboutStat } from "@/lib/actions/about";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
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
            await createAboutStat({ ...newStat, is_visible: true, sort_order: stats.length });
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
        await updateAboutStat(id, { [fieldName]: value });
    };

    const handleToggle = async (id: string, current: boolean) => {
        const updated = stats.map(s => s.id === id ? { ...s, is_visible: !current } : s);
        setStats(updated);
        await updateAboutStat(id, { is_visible: !current });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        setStats(stats.filter(s => s.id !== id));
        await deleteAboutStat(id);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-end">
                <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 rounded-xl bg-mb-gold/10 px-4 py-2 text-sm font-bold text-mb-gold">
                    <Plus className="h-4 w-4" /> Add Stat
                </button>
            </div>

            <LanguageTabs currentLang={lang} onChange={setLang} />

            {isAdding && (
                <div className="mb-6 rounded-xl border border-mb-gold/30 bg-mb-gold/5 p-4 flex items-end gap-4 mt-4">
                    <div className="flex-[0.4]">
                        <label className="mb-1 block text-xs text-white/50">Value</label>
                        <input {...bindField(newStat, setNewStat, "value")} className="w-full rounded border border-white/10 bg-black p-2 text-sm" />
                    </div>
                    <div className="flex-[0.6]">
                        <label className="mb-1 block text-xs text-white/50">Label</label>
                        <input {...bindField(newStat, setNewStat, "label")} className="w-full rounded border border-white/10 bg-black p-2 text-sm" />
                    </div>
                    <button onClick={handleAdd} className="rounded bg-mb-gold px-6 py-2 text-sm font-bold text-black border border-mb-gold hover:bg-black hover:text-mb-gold">Save</button>
                </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mt-4">
                {stats.map((stat) => (
                    <div key={stat.id} className="relative rounded-xl border border-white/5 bg-white/5 p-4">
                        <div className="absolute right-2 top-2 flex flex-col gap-1">
                            <button onClick={() => handleToggle(stat.id, stat.is_visible)} className={`p-1.5 ${stat.is_visible ? 'text-green-500' : 'text-white/20'}`}><Eye size={14} /></button>
                            <button onClick={() => handleDelete(stat.id)} className="p-1.5 text-red-500/50"><Trash2 size={14} /></button>
                        </div>
                        <div className="pr-8">
                            <input value={stat[`value_${lang}`] || ""} onChange={(e) => handleUpdateText(stat.id, "value", e.target.value)} className="w-full bg-transparent font-display text-3xl font-bold focus:outline-none" />
                            <input value={stat[`label_${lang}`] || ""} onChange={(e) => handleUpdateText(stat.id, "label", e.target.value)} className="mt-1 w-full bg-transparent text-sm text-mb-gold focus:outline-none" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
