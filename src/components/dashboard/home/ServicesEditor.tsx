"use client";

import { useState } from "react";
import { createHomeService, updateHomeService, deleteHomeService, updateHomeServicesContent } from "@/lib/actions/home";
import { Plus, Trash2, Eye, EyeOff, Edit, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";

export function ServicesEditor({ initialServices, initialContent }: { initialServices: any[], initialContent: any }) {
    const [services, setServices] = useState<any[]>(initialServices);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSavingContent, setIsSavingContent] = useState(false);

    const { lang, setLang, bindField } = useDashboardLanguage();

    const [contentForm, setContentForm] = useState({
        section_label_fr: initialContent?.section_label_fr ?? "", section_label_en: initialContent?.section_label_en ?? "",
        section_title_fr: initialContent?.section_title_fr ?? "", section_title_en: initialContent?.section_title_en ?? "",
        section_subtitle_fr: initialContent?.section_subtitle_fr ?? "", section_subtitle_en: initialContent?.section_subtitle_en ?? "",
    });

    const defaultForm = { title_fr: "", title_en: "", sort_order: services.length };
    const [formData, setFormData] = useState(defaultForm);

    const handleSaveContent = async () => {
        try {
            setIsSavingContent(true);
            await updateHomeServicesContent(contentForm);
        } finally {
            setIsSavingContent(false);
        }
    };

    const startEdit = (s: any) => {
        setFormData({ ...defaultForm, ...s });
        setEditingId(s.id);
        setIsAdding(true);
    };

    const startAdd = () => {
        setFormData({ ...defaultForm, sort_order: services.length });
        setEditingId(null);
        setIsAdding(true);
    };

    const handleSaveService = async () => {
        if (!formData.title_fr) return;
        try {
            if (editingId) {
                await updateHomeService(editingId, formData);
                setServices(services.map(s => s.id === editingId ? { ...s, ...formData } : s));
            } else {
                await createHomeService(formData);
                window.location.reload();
                return;
            }
            setIsAdding(false);
            setEditingId(null);
        } catch (e) {
            alert("Failed to save service");
        }
    };

    const handleToggle = async (id: string, current: boolean) => {
        const updated = services.map(s => s.id === id ? { ...s, is_visible: !current } : s);
        setServices(updated);
        await updateHomeService(id, { is_visible: !current });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        setServices(services.filter(s => s.id !== id));
        await deleteHomeService(id);
    };

    return (
        <div className="p-6">
            <LanguageTabs currentLang={lang} onChange={setLang} />

            <div className="mb-10 rounded-xl border border-white/10 bg-white/5 p-6 mt-4">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-mb-gold">Section Headers</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className="mb-1 block text-xs text-white/50">Kicker Top</label>
                        <input {...bindField(contentForm, setContentForm, "section_label")} className="w-full rounded border border-white/10 bg-black p-2 text-sm focus:border-mb-gold" />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs text-white/50">Title</label>
                        <input {...bindField(contentForm, setContentForm, "section_title")} className="w-full rounded border border-white/10 bg-black p-2 text-sm focus:border-mb-gold" />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs text-white/50">Subtitle</label>
                        <input {...bindField(contentForm, setContentForm, "section_subtitle")} className="w-full rounded border border-white/10 bg-black p-2 text-sm focus:border-mb-gold" />
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button onClick={handleSaveContent} disabled={isSavingContent} className="rounded bg-mb-gold px-4 py-2 text-xs font-bold text-black border border-mb-gold hover:bg-black hover:text-mb-gold transition-colors">
                        {isSavingContent ? "Saving..." : "Save Headers"}
                    </button>
                </div>
            </div>

            <div className="mb-6 flex justify-between items-center">
                <h4 className="text-xs font-bold uppercase tracking-wider text-mb-gold">Service Items</h4>
                <button onClick={startAdd} className="flex items-center gap-2 rounded bg-mb-gold px-4 py-2 text-xs font-bold text-black">
                    <Plus size={14} /> Add Service
                </button>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                        <div className="rounded-xl border border-mb-gold/30 bg-mb-gold/5 p-4 flex items-end gap-4">
                            <div className="flex-1">
                                <label className="mb-1 block text-xs text-white/50">Title ({lang.toUpperCase()})</label>
                                <input {...bindField(formData, setFormData, "title")} className="w-full rounded border border-white/10 bg-black p-2 text-sm focus:border-mb-gold" placeholder="e.g. Scenography Design" />
                            </div>
                            <button onClick={handleSaveService} className="rounded bg-mb-gold px-6 py-2 text-sm font-bold text-black">Save</button>
                            <button onClick={() => setIsAdding(false)} className="rounded p-2 text-white/50 hover:bg-white/10 hover:text-white"><X size={18} /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s) => (
                    <div key={s.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 hover:border-white/20 transition-colors">
                        <div className="font-display font-bold">{s[`title_${lang}`]}</div>
                        <div className="flex gap-1">
                            <button onClick={() => handleToggle(s.id, s.is_visible)} className={`rounded p-1.5 transition-colors ${s.is_visible ? 'text-green-500 hover:bg-green-500/10' : 'text-white/20 hover:bg-white/10'}`}>
                                {s.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                            <button onClick={() => startEdit(s)} className="rounded p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white">
                                <Edit size={14} />
                            </button>
                            <button onClick={() => handleDelete(s.id)} className="rounded p-1.5 text-red-500/50 transition-colors hover:bg-red-500/10 hover:text-red-500">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
