"use client";
import React, { useState } from "react";
import { updateAboutHero } from "@/lib/actions/about";
import { AboutHero } from "@/types/about";
import { MediaUploader } from "@/components/admin/media-uploader";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Save, X } from "lucide-react";

export function HeroEditorV2({ initialData }: { initialData?: AboutHero }) {
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState<AboutHero | Partial<AboutHero>>(initialData || {});
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            const updated = await updateAboutHero(data);
            setData(updated);
            setIsEditing(false);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="card-dark p-6">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl">Hero Section</h2>
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm text-mb-gold">
                        <Edit2 size={16} /> Edit
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white"><X size={20} /></button>
                        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 rounded bg-mb-gold px-3 py-1 text-black">
                            <Save size={16} /> {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                )}
            </div>

            <AnimatePresence mode="popLayout">
                {isEditing ? (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input className="input-dark" value={data.label || ""} onChange={e => setData({ ...data, label: e.target.value })} placeholder="Label (e.g ABOUT ME)" />
                            <input className="input-dark" value={data.title_1 || ""} onChange={e => setData({ ...data, title_1: e.target.value })} placeholder="Title Line 1" />
                            <input className="input-dark" value={data.title_2 || ""} onChange={e => setData({ ...data, title_2: e.target.value })} placeholder="Title Line 2" />
                        </div>
                        <textarea className="input-dark" value={data.subtitle || ""} onChange={e => setData({ ...data, subtitle: e.target.value })} placeholder="Subtitle" />

                        <div>
                            <p className="mb-2 text-sm text-white/50">Avatar Upload</p>
                            {data.avatar_url ? (
                                <div className="relative h-32 w-32 overflow-hidden rounded-xl">
                                    <img src={data.avatar_url} className="h-full w-full object-cover" alt="Avatar" />
                                    <button onClick={() => setData({ ...data, avatar_url: "" })} className="absolute right-1 top-1 rounded-full bg-red-500/80 p-1"><X size={12} /></button>
                                </div>
                            ) : (
                                <MediaUploader onUploadComplete={(items) => items?.length && setData({ ...data, avatar_url: items[0].url })} />
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <p className="text-sm text-mb-gold">{data.label || "No Label"}</p>
                        <h3 className="font-display text-4xl font-bold">{data.title_1} <br /> <span className="gold-text">{data.title_2}</span></h3>
                        <p className="mt-2 text-white/60">{data.subtitle}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
