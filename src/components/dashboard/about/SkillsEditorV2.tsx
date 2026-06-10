"use client";
import React, { useState } from "react";
import { AboutSkill } from "@/types/about";
import { createAboutSkill, updateAboutSkill, deleteAboutSkill } from "@/lib/actions/about";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Save, X, Plus, Trash2, Eye, EyeOff } from "lucide-react";

export function SkillsEditorV2({ initialData }: { initialData: AboutSkill[] }) {
    const [items, setItems] = useState<AboutSkill[]>(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<AboutSkill>>({});

    const startEdit = (item: AboutSkill) => {
        setEditingId(item.id);
        setFormData(item);
    };

    const startNew = () => {
        setEditingId("new");
        setFormData({ name: "", category: "General", is_visible: true, sort_order: items.length });
    };

    const handleSave = async () => {
        try {
            if (editingId === "new") {
                const newItem = await createAboutSkill(formData);
                setItems([...items, newItem]);
            } else if (editingId) {
                const updated = await updateAboutSkill(editingId, formData);
                setItems(items.map(i => i.id === editingId ? updated : i));
            }
            setEditingId(null);
        } catch (e: any) { alert(e.message); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete?")) return;
        await deleteAboutSkill(id);
        setItems(items.filter(i => i.id !== id));
    };

    const toggleVisibility = async (item: AboutSkill) => {
        const updated = await updateAboutSkill(item.id, { is_visible: !item.is_visible });
        setItems(items.map(i => i.id === item.id ? updated : i));
    };

    return (
        <div className="card-dark p-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl">Skills</h2>
                <button onClick={startNew} className="flex items-center gap-1 text-sm text-mb-gold hover:underline"><Plus size={16} /> Add Skill</button>
            </div>

            <div className="flex flex-wrap gap-3">
                <AnimatePresence>
                    {editingId === "new" && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#151515] p-2">
                            <input className="input-dark w-40 px-3 py-1 text-sm" placeholder="Skill Name" value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            <input className="input-dark w-32 px-3 py-1 text-sm" placeholder="Category" value={formData.category || ""} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                            <button onClick={handleSave} className="rounded bg-mb-gold px-3 py-1 font-bold text-black">Save</button>
                            <button onClick={() => setEditingId(null)} className="px-2 text-white/50"><X size={16} /></button>
                        </motion.div>
                    )}

                    {items.map(item => (
                        <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="group relative flex items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-4 py-2 hover:border-mb-gold/30">
                            {editingId === item.id ? (
                                <div className="flex items-center gap-2">
                                    <input className="input-dark w-32 py-1 text-sm" value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    <input className="input-dark w-24 py-1 text-sm" value={formData.category || ""} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                                    <button onClick={handleSave} className="text-mb-gold"><Save size={16} /></button>
                                    <button onClick={() => setEditingId(null)} className="text-white/50"><X size={16} /></button>
                                </div>
                            ) : (
                                <>
                                    <span className={`text-sm ${!item.is_visible ? "opacity-40" : "text-white/70"}`}>{item.name}</span>
                                    <div className="absolute -top-3 -right-3 hidden gap-1 rounded-lg bg-[#222] p-1 shadow-lg group-hover:flex">
                                        <button onClick={() => toggleVisibility(item)} className="p-1 text-white hover:text-mb-gold">
                                            {item.is_visible ? <Eye size={12} /> : <EyeOff size={12} />}
                                        </button>
                                        <button onClick={() => startEdit(item)} className="p-1 text-white hover:text-mb-gold"><Edit2 size={12} /></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-1 text-white hover:text-mb-red"><Trash2 size={12} /></button>
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
