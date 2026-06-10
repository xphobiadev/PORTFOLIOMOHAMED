"use client";

import { useState } from "react";
import { createProject, updateProject, deleteProject, updateProjectOrder } from "@/lib/actions/works";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit, X, GripVertical, Loader2 } from "lucide-react";
import { MediaUploader } from "@/components/admin/media-uploader";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";
import { ProjectMediaManager } from "./ProjectMediaManager";
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
    rectSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";

function SortableProjectCard({ p, onTogglePublish, onEdit, onDelete }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: p.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#161616]"
        >
            <div className="aspect-[4/3] bg-black relative">
                {p.cover_url && <img src={p.cover_url} className="w-full h-full object-cover opacity-80" />}
                <div {...attributes} {...listeners} className="absolute top-3 left-3 p-1.5 bg-black/60 backdrop-blur rounded text-white/50 hover:text-white border border-white/10 cursor-grab z-10">
                    <GripVertical className="h-4 w-4" />
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur rounded text-xs border border-white/10 z-10">
                    {p.status === 'published' ? <span className="text-green-400 font-bold">Published</span> : <span className="text-yellow-400">Draft</span>}
                </div>
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur rounded text-xs font-bold text-mb-gold border border-white/10 z-10">
                    {p.category}
                </div>
            </div>
            <div className="p-4">
                <div className="text-xs text-white/50 mb-1">{p.year} {p.client_name_fr ? `• ${p.client_name_fr}` : ''}</div>
                <h4 className="font-bold text-lg mb-1">{p.title_fr}</h4>
                <p className="text-xs text-white/60 line-clamp-2 mb-4 h-8">{p.excerpt_fr}</p>

                <div className="flex items-center gap-2 border-t border-white/5 pt-4">
                    <button onClick={() => onTogglePublish(p.id, p.status === 'published' ? 'draft' : 'published')} className="flex-1 text-xs py-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors">
                        {p.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button onClick={() => onEdit(p)} className="p-1.5 rounded bg-white/5 text-white/70 hover:text-white hover:bg-white/20 transition-colors">
                        <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDelete(p.id, p.title_fr)} className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export function ProjectsEditor({ initialProjects, categories }: { initialProjects: any[], categories: any[] }) {
    const [projects, setProjects] = useState<any[]>(initialProjects);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isSavingOrder, setIsSavingOrder] = useState(false);

    const { lang, setLang, bindField } = useDashboardLanguage();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const defaultForm = {
        title_fr: "", title_en: "",
        excerpt_fr: "", excerpt_en: "",
        description_fr: "", description_en: "",
        client_name_fr: "", client_name_en: "",
        location_fr: "", location_en: "",
        slug: "", category: categories[0]?.slug || "", year: new Date().getFullYear(),
        status: "published", cover_url: "", sort_order: projects.length
    };

    const [formData, setFormData] = useState(defaultForm);

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = projects.findIndex((p) => p.id === active.id);
            const newIndex = projects.findIndex((p) => p.id === over.id);

            const newProjects = arrayMove(projects, oldIndex, newIndex);
            setProjects(newProjects);

            setIsSavingOrder(true);
            try {
                const orderData = newProjects.map((p, i) => ({ id: p.id, sort_order: i }));
                await updateProjectOrder(orderData);
                toast.success("Project order updated");
            } catch (err) {
                toast.error("Failed to update project order");
            } finally {
                setIsSavingOrder(false);
            }
        }
    };

    const startAdd = () => {
        setFormData({ ...defaultForm, sort_order: projects.length });
        setEditingId(null);
        setIsAdding(true);
    };

    const startEdit = (p: any) => {
        setFormData({ ...defaultForm, ...p });
        setEditingId(p.id);
        setIsAdding(true);
    };

    const handleSave = async () => {
        if (!formData.title_fr) return;
        try {
            if (editingId) {
                await updateProject(editingId, formData);
                setProjects(projects.map(p => p.id === editingId ? { ...p, ...formData } : p));
                toast.success("Project details updated!");
            } else {
                const newProject = await createProject(formData);
                setProjects([...projects, newProject]);
                setEditingId(newProject.id);
                setFormData({ ...formData, ...newProject });
                toast.success("Project created! You can now upload media below.");
            }
        } catch (e) {
            toast.error("Failed to save project");
        }
    };

    const handleDelete = async (id: string, titleFR: string) => {
        if (!confirm(`Are you sure you want to delete ${titleFR}?`)) return;
        setProjects(projects.filter(p => p.id !== id));
        await deleteProject(id);
        toast.success("Project deleted");
    };

    const handleTogglePublish = async (id: string, status: string) => {
        const updated = projects.map(p => p.id === id ? { ...p, status } : p);
        setProjects(updated);
        await updateProject(id, { status });
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold">Projects</h3>
                    <p className="text-sm text-white/50">Manage your entire portfolio gallery.</p>
                    {isSavingOrder && <div className="flex items-center gap-2 text-xs text-mb-gold animate-pulse mt-1"><Loader2 size={12} className="animate-spin" /> Saving order...</div>}
                </div>
                <button onClick={startAdd} className="flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 text-sm font-bold hover:bg-white/90">
                    <Plus className="h-4 w-4" /> Create Project
                </button>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-8 overflow-hidden rounded-2xl border border-white/20 bg-[#161616] shadow-2xl">
                        <div className="p-6">
                            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                                <h4 className="text-lg font-bold text-white">{editingId ? "Edit Project" : "New Project"}</h4>
                                <button onClick={() => setIsAdding(false)} className="rounded p-2 text-white/50 hover:bg-white/5 hover:text-white"><X className="h-5 w-5" /></button>
                            </div>

                            <LanguageTabs currentLang={lang} onChange={setLang} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-white/50">Project Title</label>
                                        <input {...bindField(formData, setFormData, "title")} onChange={e => {
                                            if (lang === 'fr') setFormData({ ...formData, title_fr: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') });
                                            else setFormData({ ...formData, [`title_${lang}`]: e.target.value });
                                        }} className="mt-1 w-full rounded border border-white/10 bg-black p-2 text-white" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-white/50">Universal Slug</label>
                                            <input value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="mt-1 w-full rounded border border-white/10 bg-black p-2 text-white" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-white/50">Category</label>
                                            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="mt-1 w-full rounded border border-white/10 bg-black p-2 text-white">
                                                {categories.map(c => <option key={c.slug} value={c.slug}>{c.name_fr}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-xs text-white/50">Year</label>
                                            <input type="number" value={formData.year} onChange={e => setFormData({ ...formData, year: Number(e.target.value) })} className="mt-1 w-full rounded border border-white/10 bg-black p-2 text-white" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-white/50">Client</label>
                                            <input {...bindField(formData, setFormData, "client_name")} className="mt-1 w-full rounded border border-white/10 bg-black p-2 text-white" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-white/50">Status</label>
                                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="mt-1 w-full rounded border border-white/10 bg-black p-2 text-white">
                                                <option value="published">Published</option>
                                                <option value="draft">Draft</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-white/50">Short Excerpt (Card)</label>
                                        <textarea rows={2} {...bindField(formData, setFormData, "excerpt")} className="mt-1 w-full rounded border border-white/10 bg-black p-2 text-white" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-white/50">Full Description (Page)</label>
                                        <textarea rows={4} {...bindField(formData, setFormData, "description")} className="mt-1 w-full rounded border border-white/10 bg-black p-2 text-white" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-white/50 mb-2 block">Cover Image</label>
                                    <div className="rounded-xl border border-white/10 bg-black overflow-hidden relative aspect-video flex-shrink-0">
                                        {formData.cover_url ? (
                                            <>
                                                <img src={formData.cover_url} className="w-full h-full object-cover" />
                                                <button onClick={() => setFormData({ ...formData, cover_url: "" })} className="absolute top-2 right-2 bg-black/80 px-2 py-1 text-xs text-red-500 rounded">Remove</button>
                                            </>
                                        ) : (
                                            <div className="p-4 flex items-center justify-center h-full">
                                                <MediaUploader onUploadComplete={(items) => setFormData({ ...formData, cover_url: items[0]?.url })} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end pb-6 border-b border-white/10">
                                <button onClick={handleSave} className="rounded bg-white text-black px-6 py-2 font-bold hover:bg-white/90">
                                    {editingId ? "Update Project Details" : "Create Project & Continue"}
                                </button>
                            </div>

                            {editingId && (
                                <ProjectMediaManager projectId={editingId} />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <DndContext
                    id="works-projects-sortable"
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={projects.map(p => p.id)}
                        strategy={rectSortingStrategy}
                    >
                        {projects.map((p) => (
                            <SortableProjectCard
                                key={p.id}
                                p={p}
                                onTogglePublish={handleTogglePublish}
                                onEdit={startEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}
