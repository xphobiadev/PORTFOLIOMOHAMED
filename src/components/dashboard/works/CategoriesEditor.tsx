"use client";

import { useState } from "react";
import { createWorksCategory, updateWorksCategory, deleteWorksCategory, updateWorksCategoryOrder } from "@/lib/actions/works";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Eye, EyeOff, GripVertical, Edit, X, Loader2 } from "lucide-react";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";

function SortableItem({ cat, lang, onEdit, onToggle, onDelete }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: cat.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
        >
            <div {...attributes} {...listeners} className="cursor-grab text-white/20 hover:text-white/60">
                <GripVertical className="h-5 w-5" />
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="text-sm font-bold text-white py-0.5 px-1">
                    {cat[`name_${lang}`] || <span className="italic text-white/30">No translation</span>}
                </div>
                <div className="text-white/40 text-sm py-0.5 px-1">{cat.slug}</div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onToggle(cat.id, cat.is_visible)}
                    className={`rounded p-2 transition-colors ${cat.is_visible ? 'text-green-500 hover:bg-green-500/10' : 'text-white/20 hover:bg-white/10'}`}
                >
                    {cat.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button
                    onClick={() => onEdit(cat)}
                    className="rounded p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                >
                    <Edit className="h-4 w-4" />
                </button>
                <button
                    onClick={() => onDelete(cat.id)}
                    className="rounded p-2 text-red-500/50 transition-colors hover:bg-red-500/10 hover:text-red-500"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export function CategoriesEditor({ initialCategories }: { initialCategories: any[] }) {
    const [categories, setCategories] = useState<any[]>(initialCategories);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSavingOrder, setIsSavingOrder] = useState(false);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const [newCat, setNewCat] = useState({
        name_fr: "", name_en: "", name_ar: "",
        slug: ""
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = categories.findIndex((c) => c.id === active.id);
            const newIndex = categories.findIndex((c) => c.id === over.id);

            const newCategories = arrayMove(categories, oldIndex, newIndex);
            setCategories(newCategories);

            setIsSavingOrder(true);
            try {
                const orderData = newCategories.map((c, i) => ({ id: c.id, sort_order: i }));
                await updateWorksCategoryOrder(orderData);
                toast.success("Order updated");
            } catch (err) {
                toast.error("Failed to update order");
            } finally {
                setIsSavingOrder(false);
            }
        }
    };

    const startAdd = () => {
        setNewCat({ name_fr: "", name_en: "", name_ar: "", slug: "" });
        setEditingId(null);
        setIsAdding(true);
    };

    const startEdit = (cat: any) => {
        setNewCat({
            name_fr: cat.name_fr || "",
            name_en: cat.name_en || "",
            name_ar: cat.name_ar || "",
            slug: cat.slug || ""
        });
        setEditingId(cat.id);
        setIsAdding(true);
    };

    const handleSave = async () => {
        if (!newCat.name_fr || !newCat.slug) return;
        try {
            if (editingId) {
                await updateWorksCategory(editingId, {
                    name_fr: newCat.name_fr,
                    name_en: newCat.name_en,
                    name_ar: newCat.name_ar,
                    slug: newCat.slug,
                });
                setCategories(categories.map(c => c.id === editingId ? { ...c, ...newCat } : c));
                setEditingId(null);
                setIsAdding(false);
                toast.success("Category updated");
            } else {
                const res = await createWorksCategory({
                    ...newCat,
                    is_visible: true,
                    sort_order: categories.length,
                });
                setCategories([...categories, res]);
                setIsAdding(false);
                setNewCat({ name_fr: "", name_en: "", name_ar: "", slug: "" });
                toast.success("Category created");
            }
        } catch (e) {
            toast.error("Failed to save category");
        }
    };

    const handleToggle = async (id: string, current: boolean) => {
        const updated = categories.map(s => s.id === id ? { ...s, is_visible: !current } : s);
        setCategories(updated);
        await updateWorksCategory(id, { is_visible: !current });
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        setCategories(categories.filter(s => s.id !== id));
        await deleteWorksCategory(id);
        toast.success("Category deleted");
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold">Project Categories Filters</h3>
                    {isSavingOrder && <div className="flex items-center gap-2 text-xs text-mb-gold animate-pulse mt-1"><Loader2 size={12} className="animate-spin" /> Saving order...</div>}
                </div>
                <button onClick={startAdd} className="flex items-center gap-2 rounded-xl bg-mb-gold/10 text-mb-gold px-4 py-2 text-sm font-bold hover:bg-mb-gold hover:text-black transition-colors">
                    <Plus className="h-4 w-4" /> Add Category
                </button>
            </div>

            <LanguageTabs currentLang={lang} onChange={setLang} />

            <AnimatePresence>
                {isAdding && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden mt-4">
                        <div className="rounded-xl border border-mb-gold/30 bg-mb-gold/5 p-4 relative">
                            <button onClick={() => setIsAdding(false)} className="absolute top-2 right-2 p-1 text-white/50 hover:text-white"><X className="h-4 w-4" /></button>
                            <h4 className="text-sm font-bold text-white mb-4">{editingId ? "Edit Category" : "New Category"}</h4>
                            <div className="flex items-end gap-4">
                                <div className="flex-1">
                                    <label className="mb-1 block text-xs text-mb-gold">Display Name ({lang.toUpperCase()})</label>
                                    <input {...bindField(newCat, setNewCat, "name")} onChange={e => {
                                        if (lang === 'fr' && !editingId) setNewCat({ ...newCat, name_fr: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') });
                                        else setNewCat({ ...newCat, [`name_${lang}`]: e.target.value });
                                    }} placeholder="e.g. BRANDING" className="w-full rounded border border-white/10 bg-black p-2 text-sm focus:border-mb-gold" />
                                </div>
                                <div className="flex-1">
                                    <label className="mb-1 block text-xs text-mb-gold">URL Slug (Universal ID)</label>
                                    <input value={newCat.slug} onChange={e => setNewCat({ ...newCat, slug: e.target.value })} placeholder="branding" className="w-full rounded border border-white/10 bg-black p-2 text-sm focus:border-mb-gold" />
                                </div>
                                <button onClick={handleSave} className="rounded bg-mb-gold px-6 py-2 text-sm font-bold text-black hover:bg-mb-gold/80">Save</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-3 mt-4">
                <DndContext
                    id="works-categories-sortable"
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={categories.map(c => c.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {categories.map((cat) => (
                            <SortableItem
                                key={cat.id}
                                cat={cat}
                                lang={lang}
                                onEdit={startEdit}
                                onToggle={handleToggle}
                                onDelete={handleDelete}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}
