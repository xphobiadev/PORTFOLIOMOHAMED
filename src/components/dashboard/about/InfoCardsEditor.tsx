"use client";

import { useState } from "react";
import { createAboutInfo, updateAboutInfo, deleteAboutInfo } from "@/lib/actions/about";
import { Plus, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";

export function InfoCardsEditor({ initialInfo }: { initialInfo: any[] }) {
    const [info, setInfo] = useState<any[]>(initialInfo);
    const [isAdding, setIsAdding] = useState(false);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const [newInfo, setNewInfo] = useState({
        label_fr: "", label_en: "",
        value_fr: "", value_en: ""
    });

    const handleAdd = async () => {
        if (!newInfo.label_fr || !newInfo.value_fr) return;
        try {
            await createAboutInfo({ ...newInfo, is_visible: true, sort_order: info.length });
            setIsAdding(false);
            setNewInfo({ label_fr: "", label_en: "", value_fr: "", value_en: "" });
            window.location.reload();
        } catch (e) {
            alert("Failed to add info");
        }
    };

    const handleUpdateText = async (id: string, baseField: string, value: string) => {
        const fieldName = `${baseField}_${lang}`;
        const updated = info.map(s => s.id === id ? { ...s, [fieldName]: value } : s);
        setInfo(updated);
        await updateAboutInfo(id, { [fieldName]: value });
    };

    const handleToggle = async (id: string, current: boolean) => {
        const updated = info.map(s => s.id === id ? { ...s, is_visible: !current } : s);
        setInfo(updated);
        await updateAboutInfo(id, { is_visible: !current });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        setInfo(info.filter(s => s.id !== id));
        await deleteAboutInfo(id);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-end">
                <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 rounded-xl bg-mb-gold/10 text-mb-gold px-4 py-2 text-sm font-bold">
                    <Plus className="h-4 w-4" /> Add Info
                </button>
            </div>

            <LanguageTabs currentLang={lang} onChange={setLang} />

            <AnimatePresence>
                {isAdding && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden mt-4">
                        <div className="rounded-xl border border-mb-gold/30 bg-mb-gold/5 p-4 flex items-end gap-4">
                            <div className="flex-[0.4]">
                                <label className="mb-1 block text-xs text-white/50">Label</label>
                                <input {...bindField(newInfo, setNewInfo, "label")} placeholder="e.g. Born In" className="w-full rounded border border-white/10 bg-black p-2 text-sm" />
                            </div>
                            <div className="flex-[0.6]">
                                <label className="mb-1 block text-xs text-white/50">Value</label>
                                <input {...bindField(newInfo, setNewInfo, "value")} placeholder="e.g. Morocco" className="w-full rounded border border-white/10 bg-black p-2 text-sm" />
                            </div>
                            <button onClick={handleAdd} className="rounded bg-mb-gold px-6 py-2 text-sm font-bold text-black border border-mb-gold hover:bg-black hover:text-mb-gold">Save</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid gap-3 sm:grid-cols-2 mt-4">
                {info.map((item) => (
                    <motion.div key={item.id} layout className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10">
                        <div className="cursor-grab text-white/20"><GripVertical className="h-5 w-5" /></div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <input value={item[`label_${lang}`] || ""} onChange={(e) => handleUpdateText(item.id, "label", e.target.value)} className="bg-transparent text-sm text-white/50 focus:outline-none focus:border-b border-white/20 px-1" />
                            <input value={item[`value_${lang}`] || ""} onChange={(e) => handleUpdateText(item.id, "value", e.target.value)} className="bg-transparent text-sm font-bold focus:outline-none focus:border-b border-white/20 px-1" />
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleToggle(item.id, item.is_visible)} className={`rounded p-2 transition-colors ${item.is_visible ? 'text-green-500 hover:bg-green-500/10' : 'text-white/20 hover:bg-white/10'}`}>
                                {item.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="rounded p-2 text-red-500/50 hover:bg-red-500/10 hover:text-red-500 transition-colors">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
