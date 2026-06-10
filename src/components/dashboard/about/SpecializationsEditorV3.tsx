"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { createSpecialization, updateSpecialization, deleteSpecialization } from "@/lib/services/about.v3.service";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";
import { Loader2, Plus, Trash2, X } from "lucide-react";
import type { Locale } from "@/types/i18n";

function parseItems(raw: unknown): string[] {
    if (Array.isArray(raw)) return raw.map((x) => String(x));
    if (typeof raw === "string") {
        try {
            const j = JSON.parse(raw) as unknown;
            return Array.isArray(j) ? j.map((x) => String(x)) : [];
        } catch {
            return [];
        }
    }
    return [];
}

function itemsKey(lang: Locale): "items" | "items_en" {
    if (lang === "fr") return "items";
    return "items_en";
}

function normalizeRow(row: Record<string, unknown>) {
    const fr = parseItems(row.items);
    const en = parseItems(row.items_en);
    return {
        ...row,
        items: fr,
        items_en: en.length ? en : [...fr]
    };
}

export function SpecializationsEditorV3({ initialData }: { initialData: any[] }) {
    const [items, setItems] = useState<any[]>(() => (initialData || []).map((r) => normalizeRow(r)));
    const [saving, setSaving] = useState<string | null>(null);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const getItemsList = (item: any): string[] => {
        const key = itemsKey(lang);
        return item[key] || [];
    };

    const handleSave = async (item: any, index: number) => {
        setSaving(String(item.id || `new-${index}`));
        try {
            const payload = {
                ...item,
                items: item.items || [],
                items_en: item.items_en || item.items || []
            };

            if (item.id) {
                const { id, created_at, ...rest } = payload;
                const result = await updateSpecialization(String(id), rest);
                const updated = [...items];
                updated[index] = normalizeRow(result);
                setItems(updated);
            } else {
                const { id, ...rest } = payload;
                const result = await createSpecialization(rest);
                const updated = [...items];
                updated[index] = normalizeRow(result);
                setItems(updated);
            }
            toast.success("Specialization saved!");
        } catch (err: unknown) {
            console.error(err);
            toast.error(err instanceof Error ? err.message : "Error");
        }
        setSaving(null);
    };

    const handleDelete = async (id: string, index: number) => {
        if (!confirm("Delete?")) return;
        try {
            if (id) await deleteSpecialization(id);
            setItems(items.filter((_, i) => i !== index));
            toast.success("Deleted!");
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Error");
        }
    };

    const handleAdd = () => {
        setItems([
            ...items,
            {
                title_fr: "",
                title_en: "",
                color: "#c9a45c",
                icon: "palette",
                items: [],
                items_en: [],
                sort_order: items.length
            }
        ]);
    };

    const setItemsArray = (index: number, list: string[]) => {
        const key = itemsKey(lang);
        const u = [...items];
        u[index] = { ...items[index], [key]: list };
        setItems(u);
    };

    const addSubItem = (index: number) => {
        const list = [...getItemsList(items[index])];
        list.push("New item");
        setItemsArray(index, list);
    };

    const removeSubItem = (index: number, subIndex: number) => {
        const list = [...getItemsList(items[index])];
        list.splice(subIndex, 1);
        setItemsArray(index, list);
    };

    const updateSubItem = (index: number, subIndex: number, value: string) => {
        const list = [...getItemsList(items[index])];
        list[subIndex] = value;
        setItemsArray(index, list);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Specializations ({items.length})</h3>
                <LanguageTabs currentLang={lang} onChange={setLang} />
            </div>

            {items.map((item, index) => {
                const subItems = getItemsList(item);
                return (
                    <div key={item.id || index} className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                        <div className="flex flex-wrap gap-4">
                            <div className="min-w-[200px] flex-1">
                                <label className="text-xs text-white/50">Title ({lang.toUpperCase()})</label>
                                <input
                                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white outline-none"
                                    {...bindField(item, (v: any) => {
                                        const u = [...items];
                                        u[index] = v;
                                        setItems(u);
                                    }, "title")}
                                />
                            </div>
                            <div className="w-24">
                                <label className="text-xs text-white/50">Color</label>
                                <input
                                    type="color"
                                    className="mt-1 h-10 w-full cursor-pointer rounded-lg bg-transparent"
                                    value={item.color || "#c9a45c"}
                                    onChange={(e) => {
                                        const u = [...items];
                                        u[index] = { ...item, color: e.target.value };
                                        setItems(u);
                                    }}
                                />
                            </div>
                            <div className="w-28">
                                <label className="text-xs text-white/50">Icon</label>
                                <select
                                    className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-sm text-white outline-none"
                                    value={item.icon || "palette"}
                                    onChange={(e) => {
                                        const u = [...items];
                                        u[index] = { ...item, icon: e.target.value };
                                        setItems(u);
                                    }}
                                >
                                    <option value="camera">Camera</option>
                                    <option value="palette">Palette</option>
                                    <option value="film">Film</option>
                                    <option value="music">Music</option>
                                    <option value="layout">Layout</option>
                                    <option value="code">Code</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-white/50">
                                Items ({lang.toUpperCase()}) — {subItems.length}
                            </label>
                            <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                                {subItems.map((sub, si) => (
                                    <div key={si} className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1">
                                        <input
                                            className="flex-1 bg-transparent text-xs text-white outline-none"
                                            value={sub}
                                            onChange={(e) => updateSubItem(index, si, e.target.value)}
                                        />
                                        <button type="button" onClick={() => removeSubItem(index, si)} className="text-red-400 hover:text-red-300">
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addSubItem(index)}
                                    className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 px-3 py-1 text-xs text-white/40 hover:border-mb-gold hover:text-mb-gold"
                                >
                                    <Plus size={12} /> Add Item
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => handleSave(item, index)}
                                disabled={saving === String(item.id || `new-${index}`)}
                                className="flex items-center gap-1 rounded-lg bg-mb-gold px-4 py-2 text-xs font-bold text-black hover:bg-mb-gold/90 disabled:opacity-50"
                            >
                                {saving === String(item.id || `new-${index}`) && (
                                    <Loader2 size={12} className="animate-spin" />
                                )}{" "}
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(String(item.id || ""), index)}
                                className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400 hover:bg-red-500/20"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                );
            })}

            <button
                type="button"
                onClick={handleAdd}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-3 text-sm text-white/60 transition-colors hover:border-mb-gold hover:text-mb-gold"
            >
                <Plus size={16} /> Add New Specialization
            </button>
        </div>
    );
}
