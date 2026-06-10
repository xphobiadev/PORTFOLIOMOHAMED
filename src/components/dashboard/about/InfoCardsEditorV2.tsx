"use client";
import React, { useState } from "react";
import { AboutInfo } from "@/types/about";
import { createAboutInfo, updateAboutInfo, deleteAboutInfo } from "@/lib/actions/about";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Save, X, Plus, Trash2, Eye, EyeOff } from "lucide-react";

export function InfoCardsEditorV2({ initialData }: { initialData: AboutInfo[] }) {
    const [items, setItems] = useState<AboutInfo[]>(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<AboutInfo>>({});

    const startEdit = (item: AboutInfo) => {
        setEditingId(item.id);
        setFormData(item);
    };

    const startNew = () => {
        setEditingId("new");
        setFormData({ label: "", value: "", is_visible: true, sort_order: items.length });
    };

    const handleSave = async () => {
        try {
            if (editingId === "new") {
                const newItem = await createAboutInfo(formData);
                setItems([...items, newItem]);
            } else if (editingId) {
                const updated = await updateAboutInfo(editingId, formData);
                setItems(items.map(i => i.id === editingId ? updated : i));
            }
            setEditingId(null);
        } catch (e: any) { alert(e.message); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete?")) return;
        await deleteAboutInfo(id);
        setItems(items.filter(i => i.id !== id));
    };

    const toggleVisibility = async (item: AboutInfo) => {
        const updated = await updateAboutInfo(item.id, { is_visible: !item.is_visible });
        setItems(items.map(i => i.id === item.id ? updated : i));
    };

    return (
        <div className="card-dark p-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl">Personal Information</h2>
                <button onClick={startNew} className="flex items-center gap-1 text-sm text-mb-gold hover:underline"><Plus size={16} /> Add Info</button>
            </div>

            <div className="flex flex-col gap-2">
                <AnimatePresence>
                    {editingId === "new" && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-4 flex gap-2 border border-white/10 bg-[#151515] p-3 rounded-xl">
                            <input className="input-dark" placeholder="Label" value={formData.label || ""} onChange={e => setFormData({ ...formData, label: e.target.value })} />
                            <input className="input-dark" placeholder="Value" value={formData.value || ""} onChange={e => setFormData({ ...formData, value: e.target.value })} />
                            <button onClick={handleSave} className="bg-mb-gold px-4 rounded text-black font-bold">Save</button>
                            <button onClick={() => setEditingId(null)} className="px-4 text-white/50">Cancel</button>
                        </motion.div>
                    )}

                    {items.map(item => (
                        <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="group flex items-center justify-between rounded-xl bg-white/5 p-4 hover:bg-white/10">
                            {editingId === item.id ? (
                                <div className="flex w-full gap-2">
                                    <input className="input-dark py-2" value={formData.label || ""} onChange={e => setFormData({ ...formData, label: e.target.value })} />
                                    <input className="input-dark py-2" value={formData.value || ""} onChange={e => setFormData({ ...formData, value: e.target.value })} />
                                    <button onClick={handleSave} className="bg-mb-gold px-4 rounded text-black"><Save size={16} /></button>
                                    <button onClick={() => setEditingId(null)} className="px-3"><X size={16} /></button>
                                </div>
                            ) : (
                                <>
                                    <div className={`flex flex-col ${!item.is_visible ? "opacity-40" : ""}`}>
                                        <span className="text-xs text-mb-gold uppercase tracking-wider">{item.label}</span>
                                        <span className="text-white/80">{item.value}</span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => toggleVisibility(item)} className="p-2 text-white/50 hover:text-white">
                                            {item.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                        </button>
                                        <button onClick={() => startEdit(item)} className="p-2 text-white/50 hover:text-mb-gold"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 text-white/50 hover:text-mb-red"><Trash2 size={16} /></button>
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
