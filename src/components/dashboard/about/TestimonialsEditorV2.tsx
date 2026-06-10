"use client";
import React, { useState } from "react";
import { Testimonial } from "@/types/about";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/actions/about";
import { MediaUploader } from "@/components/admin/media-uploader";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Save, X, Plus, Trash2, Eye, EyeOff } from "lucide-react";

export function TestimonialsEditorV2({ initialData }: { initialData: Testimonial[] }) {
    const [items, setItems] = useState<Testimonial[]>(initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Testimonial>>({});

    const startEdit = (item: Testimonial) => {
        setEditingId(item.id);
        setFormData(item);
    };

    const startNew = () => {
        setEditingId("new");
        setFormData({ author: "", role: "", company: "", content: "", avatar_url: "", is_visible: true, sort_order: items.length });
    };

    const handleSave = async () => {
        try {
            if (editingId === "new") {
                const newItem = await createTestimonial(formData);
                setItems([...items, newItem]);
            } else if (editingId) {
                const updated = await updateTestimonial(editingId, formData);
                setItems(items.map(i => i.id === editingId ? updated : i));
            }
            setEditingId(null);
        } catch (e: any) { alert(e.message); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete?")) return;
        await deleteTestimonial(id);
        setItems(items.filter(i => i.id !== id));
    };

    const toggleVisibility = async (item: Testimonial) => {
        const updated = await updateTestimonial(item.id, { is_visible: !item.is_visible });
        setItems(items.map(i => i.id === item.id ? updated : i));
    };

    return (
        <div className="card-dark p-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl">Testimonials</h2>
                <button onClick={startNew} className="flex items-center gap-1 text-sm text-mb-gold hover:underline"><Plus size={16} /> Add Testimonial</button>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
                <AnimatePresence>
                    {editingId === "new" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-[#151515] p-6">
                            <input className="input-dark w-full" placeholder="Author Name" value={formData.author || ""} onChange={e => setFormData({ ...formData, author: e.target.value })} />
                            <div className="flex gap-2">
                                <input className="input-dark w-1/2" placeholder="Role" value={formData.role || ""} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                                <input className="input-dark w-1/2" placeholder="Company" value={formData.company || ""} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                            </div>
                            <textarea className="input-dark w-full" placeholder="Citation..." value={formData.content || ""} onChange={e => setFormData({ ...formData, content: e.target.value })} />

                            <div className="mt-2">
                                {formData.avatar_url ? (
                                    <div className="relative inline-block h-12 w-12 rounded-full overflow-hidden">
                                        <img src={formData.avatar_url} />
                                        <button onClick={() => setFormData({ ...formData, avatar_url: "" })} className="absolute inset-0 bg-black/60 text-white flex items-center justify-center"><X size={16} /></button>
                                    </div>
                                ) : (
                                    <div className="scale-75 origin-top-left"><MediaUploader onUploadComplete={i => i?.length && setFormData({ ...formData, avatar_url: i[0].url })} /></div>
                                )}
                            </div>

                            <div className="mt-2 flex w-full gap-2">
                                <button onClick={handleSave} className="flex-1 rounded bg-mb-gold py-2 text-sm font-bold text-black">Save</button>
                                <button onClick={() => setEditingId(null)} className="flex-1 rounded border border-white/10 py-2 text-sm text-white/50">Cancel</button>
                            </div>
                        </motion.div>
                    )}

                    {items.map(item => (
                        <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="group relative rounded-[24px] bg-white/5 p-6 hover:bg-white/10 transition-colors">
                            {editingId === item.id ? (
                                <div className="flex flex-col gap-3">
                                    <input className="input-dark w-full" value={formData.author || ""} onChange={e => setFormData({ ...formData, author: e.target.value })} />
                                    <div className="flex gap-2">
                                        <input className="input-dark w-1/2" value={formData.role || ""} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                                        <input className="input-dark w-1/2" value={formData.company || ""} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                                    </div>
                                    <textarea className="input-dark min-h-[80px] w-full" value={formData.content || ""} onChange={e => setFormData({ ...formData, content: e.target.value })} />
                                    <div className="mt-2 flex gap-2">
                                        <button onClick={handleSave} className="flex-1 flex justify-center rounded bg-mb-gold py-1 text-black"><Save size={16} /></button>
                                        <button onClick={() => setEditingId(null)} className="flex-1 flex justify-center rounded border border-white/10 text-white/50"><X size={16} /></button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className={`flex flex-col gap-2 ${!item.is_visible ? "opacity-40" : ""}`}>
                                        <div className="flex items-center gap-3">
                                            {item.avatar_url ? <img src={item.avatar_url!} className="h-10 w-10 rounded-full object-cover" /> : <div className="h-10 w-10 rounded-full bg-white/10" />}
                                            <div>
                                                <p className="font-medium text-white">{item.author}</p>
                                                <p className="text-xs text-white/50">{item.role} {item.company ? `at ${item.company}` : ''}</p>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-3xl text-mb-gold leading-none">“</div>
                                        <p className="mt-1 text-sm text-white/70 italic">"{item.content}"</p>
                                    </div>
                                    <div className="absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => toggleVisibility(item)} className="rounded-full bg-black/50 p-2 text-white/50 hover:text-white">
                                            {item.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                                        </button>
                                        <button onClick={() => startEdit(item)} className="rounded-full bg-black/50 p-2 text-white/50 hover:text-mb-gold"><Edit2 size={14} /></button>
                                        <button onClick={() => handleDelete(item.id)} className="rounded-full bg-black/50 p-2 text-white/50 hover:text-mb-red"><Trash2 size={14} /></button>
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
