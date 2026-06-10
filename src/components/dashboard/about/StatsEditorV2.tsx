"use client";
import React, { useState } from "react";
import { AboutStat } from "@/types/about";
import { createAboutStat, updateAboutStat, deleteAboutStat } from "@/lib/actions/about";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Save, X, Plus, Trash2, Eye, EyeOff } from "lucide-react";

export function StatsEditorV2({ initialData }: { initialData: AboutStat[] }) {
    const [items, setItems] = useState<AboutStat[]>(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<AboutStat>>({});

    const startEdit = (item: AboutStat) => {
        setEditingId(item.id);
        setFormData(item);
    };

    const startNew = () => {
        setEditingId("new");
        setFormData({ value: "", label: "", is_visible: true, sort_order: items.length });
    };

    const handleSave = async () => {
        try {
            if (editingId === "new") {
                const newItem = await createAboutStat(formData);
                setItems([...items, newItem]);
            } else if (editingId) {
                const updated = await updateAboutStat(editingId, formData);
                setItems(items.map(i => i.id === editingId ? updated : i));
            }
            setEditingId(null);
        } catch (e: any) { alert(e.message); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete?")) return;
        await deleteAboutStat(id);
        setItems(items.filter(i => i.id !== id));
    };

    const toggleVisibility = async (item: AboutStat) => {
        const updated = await updateAboutStat(item.id, { is_visible: !item.is_visible });
        setItems(items.map(i => i.id === item.id ? updated : i));
    };

    return (
        <div className="card-dark p-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl">Statistics</h2>
                <button onClick={startNew} className="flex items-center gap-1 text-sm text-mb-gold hover:underline"><Plus size={16} /> Add Stat</button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                <AnimatePresence>
                    {editingId === "new" && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#151515] p-4">
                            <input className="input-dark w-full px-3 py-2 text-center text-xl font-bold" placeholder="Value (e.g. 150+)" value={formData.value || ""} onChange={e => setFormData({ ...formData, value: e.target.value })} />
                            <input className="input-dark w-full px-3 py-2 text-center text-sm" placeholder="Label" value={formData.label || ""} onChange={e => setFormData({ ...formData, label: e.target.value })} />
                            <div className="mt-2 flex w-full gap-2">
                                <button onClick={handleSave} className="flex-1 rounded bg-mb-gold py-1 text-xs font-bold text-black">Save</button>
                                <button onClick={() => setEditingId(null)} className="flex-1 rounded border border-white/10 py-1 text-xs text-white/50">Cancel</button>
                            </div>
                        </motion.div>
                    )}

                    {items.map(item => (
                        <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="group relative rounded-2xl bg-white/5 p-5 text-center hover:bg-white/10">
                            {editingId === item.id ? (
                                <div className="flex flex-col gap-2">
                                    <input className="input-dark text-center text-xl font-bold" value={formData.value || ""} onChange={e => setFormData({ ...formData, value: e.target.value })} />
                                    <input className="input-dark text-center text-sm" value={formData.label || ""} onChange={e => setFormData({ ...formData, label: e.target.value })} />
                                    <div className="mt-2 flex gap-2">
                                        <button onClick={handleSave} className="flex-1 rounded bg-mb-gold py-1 text-black"><Save size={14} className="mx-auto" /></button>
                                        <button onClick={() => setEditingId(null)} className="flex-1 rounded border border-white/10"><X size={14} className="mx-auto text-white/50" /></button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className={`flex flex-col ${!item.is_visible ? "opacity-40" : ""}`}>
                                        <span className="font-display text-3xl font-bold text-white">{item.value}</span>
                                        <span className="mt-1 text-sm text-white/55">{item.label}</span>
                                    </div>
                                    <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => toggleVisibility(item)} className="p-1 text-white/50 hover:text-white">
                                            {item.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                                        </button>
                                        <button onClick={() => startEdit(item)} className="p-1 text-white/50 hover:text-mb-gold"><Edit2 size={14} /></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-1 text-white/50 hover:text-mb-red"><Trash2 size={14} /></button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
