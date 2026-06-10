"use client";

import { useState } from "react";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/actions/about";
import { Plus, Trash2, Eye, EyeOff, Edit, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MediaUploader } from "@/components/admin/media-uploader";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";

export function TestimonialsEditor({ initialTestimonials }: { initialTestimonials: any[] }) {
    const [testimonials, setTestimonials] = useState<any[]>(initialTestimonials);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const { lang, setLang, bindField } = useDashboardLanguage();

    const defaultForm = {
        author_fr: "", author_en: "",
        role_fr: "", role_en: "",
        company_fr: "", company_en: "",
        content_fr: "", content_en: "",
        avatar_url: "",
        sort_order: testimonials.length
    };

    const [formData, setFormData] = useState(defaultForm);

    const startEdit = (t: any) => {
        setFormData({ ...defaultForm, ...t });
        setEditingId(t.id);
        setIsAdding(true);
    };

    const startAdd = () => {
        setFormData({ ...defaultForm, sort_order: testimonials.length });
        setEditingId(null);
        setIsAdding(true);
    };

    const handleSave = async () => {
        if (!formData.author_fr) return;
        try {
            if (editingId) {
                await updateTestimonial(editingId, formData);
                setTestimonials(testimonials.map(s => s.id === editingId ? { ...s, ...formData } : s));
            } else {
                await createTestimonial({ ...formData, is_visible: true });
                window.location.reload();
                return;
            }
            setIsAdding(false);
            setEditingId(null);
        } catch (e) {
            alert("Failed to save testimonial");
        }
    };

    const handleToggle = async (id: string, current: boolean) => {
        const updated = testimonials.map(s => s.id === id ? { ...s, is_visible: !current } : s);
        setTestimonials(updated);
        await updateTestimonial(id, { is_visible: !current });
    };

    const handleDelete = async (id: string) => {
        setTestimonials(testimonials.filter(s => s.id !== id));
        await deleteTestimonial(id);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-end">
                <button onClick={startAdd} className="flex items-center gap-2 rounded bg-mb-gold px-4 py-2 text-xs font-bold text-black border border-mb-gold hover:bg-black hover:text-mb-gold transition-colors">
                    <Plus className="h-4 w-4" /> Add Testimonial
                </button>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                        <div className="rounded-xl border border-white/20 bg-[#161616] p-6">
                            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                                <h4 className="font-bold">{editingId ? "Edit" : "New"} Testimonial</h4>
                                <button onClick={() => setIsAdding(false)} className="text-white/50 hover:text-white"><X size={18} /></button>
                            </div>

                            <LanguageTabs currentLang={lang} onChange={setLang} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-white/50 block mb-1">Author Name</label>
                                            <input {...bindField(formData, setFormData, "author")} className="w-full bg-black border border-white/10 rounded p-2 text-sm" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-white/50 block mb-1">Role / Job Title</label>
                                            <input {...bindField(formData, setFormData, "role")} className="w-full bg-black border border-white/10 rounded p-2 text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-white/50 block mb-1">Company</label>
                                        <input {...bindField(formData, setFormData, "company")} className="w-full bg-black border border-white/10 rounded p-2 text-sm" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-white/50 block mb-1">Feedback Quote</label>
                                        <textarea {...bindField(formData, setFormData, "content")} rows={4} className="w-full bg-black border border-white/10 rounded p-2 text-sm" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-white/50 block mb-1">Avatar Image</label>
                                    <div className="h-32 rounded-xl border border-white/10 bg-black overflow-hidden relative">
                                        {formData.avatar_url ? (
                                            <>
                                                <img src={formData.avatar_url} className="w-full h-full object-cover opacity-80" />
                                                <button onClick={() => setFormData({ ...formData, avatar_url: "" })} className="absolute top-2 right-2 bg-black/80 px-2 py-1 text-xs text-red-500 rounded">Remove</button>
                                            </>
                                        ) : (
                                            <div className="h-full p-2 flex items-center justify-center">
                                                <MediaUploader onUploadComplete={(items) => setFormData({ ...formData, avatar_url: items[0]?.url })} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button onClick={handleSave} className="bg-mb-gold text-black font-bold px-6 py-2 rounded">Save Testimonial</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map(t => (
                    <div key={t.id} className="relative rounded-2xl border border-white/5 bg-white/5 p-6 hover:border-white/10 transition-colors">
                        <p className="text-sm italic text-white/70 mb-6 line-clamp-4">"{t[`content_${lang}`]}"</p>
                        <div className="flex items-center gap-3">
                            {t.avatar_url ? (
                                <img src={t.avatar_url} className="w-10 h-10 rounded-full object-cover grayscale" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">{t[`author_${lang}`]?.[0]}</div>
                            )}
                            <div>
                                <h5 className="text-sm font-bold">{t[`author_${lang}`]}</h5>
                                <div className="text-xs text-white/50">{t[`role_${lang}`]} {t[`company_${lang}`] ? `• ${t[`company_${lang}`]}` : ''}</div>
                            </div>
                        </div>

                        <div className="absolute top-4 right-4 flex gap-1">
                            <button onClick={() => handleToggle(t.id, t.is_visible)} className={`p-1.5 rounded ${t.is_visible ? 'text-green-500 hover:bg-green-500/10' : 'text-white/20 hover:bg-white/10'}`}>
                                {t.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                            <button onClick={() => startEdit(t)} className="p-1.5 rounded text-white/50 hover:text-white hover:bg-white/10">
                                <Edit size={14} />
                            </button>
                            <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded text-red-500/50 hover:text-red-500 hover:bg-red-500/10">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
