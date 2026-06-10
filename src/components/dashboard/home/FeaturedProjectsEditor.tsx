"use client";

import { useState } from "react";
import { createFeaturedProject, deleteFeaturedProject, updateFeaturedProject } from "@/lib/actions/home";
import { HomeFeaturedProject } from "@/types/home";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, GripVertical } from "lucide-react";

export function FeaturedProjectsEditor({
    featuredProjects,
    availablePortfolio
}: {
    featuredProjects: HomeFeaturedProject[],
    availablePortfolio: any[]
}) {
    const [featured, setFeatured] = useState<HomeFeaturedProject[]>(featuredProjects);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState("");

    const handleAdd = async () => {
        if (!selectedProjectId) return;
        try {
            await createFeaturedProject({
                portfolio_id: selectedProjectId,
                sort_order: featured.length,
            });
            setIsAdding(false);
            setSelectedProjectId("");
            window.location.reload();
        } catch (e) {
            alert("Failed to feature project");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Remove from featured?")) return;
        setFeatured(featured.filter(f => f.id !== id));
        await deleteFeaturedProject(id);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold">Featured Projects</h3>
                    <p className="text-sm text-white/50">Select projects from your Portfolio to display on the Home page.</p>
                </div>
                <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold hover:bg-white/10 transition-colors">
                    <Plus className="h-4 w-4" /> Add Featured Item
                </button>
            </div>

            <AnimatePresence>
                {isAdding && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
                        <div className="rounded-xl border border-mb-gold/30 bg-mb-gold/5 p-4 flex items-end gap-4">
                            <div className="flex-1">
                                <label className="mb-1 block text-xs text-mb-gold">Select Portfolio Item</label>
                                <select value={selectedProjectId} onChange={e => setSelectedProjectId(e.target.value)} className="w-full rounded border border-white/10 bg-black p-2 text-sm text-white focus:border-mb-gold outline-none">
                                    <option value="">-- Choose a project --</option>
                                    {availablePortfolio.map(p => (
                                        <option key={p.id} value={p.id} disabled={featured.some(f => f.portfolio_id === p.id)}>
                                            {p.title} {featured.some(f => f.portfolio_id === p.id) ? "(Already added)" : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={handleAdd} className="rounded bg-mb-gold px-6 py-2 text-sm font-bold text-black hover:bg-mb-gold/80">Add</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-3">
                {featured.map((item) => {
                    const projectDetails = availablePortfolio.find(p => p.id === item.portfolio_id);

                    return (
                        <motion.div key={item.id} layout className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10">
                            <div className="cursor-grab text-white/20 hover:text-white/60"><GripVertical className="h-5 w-5" /></div>

                            <div className="h-12 w-16 overflow-hidden rounded border border-white/10 bg-black">
                                {projectDetails?.cover_url && (
                                    <img src={projectDetails.cover_url} alt="Cover" className="h-full w-full object-cover" />
                                )}
                            </div>

                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-white">{projectDetails?.title || "Unknown Project"}</h4>
                                <p className="text-xs text-mb-gold">{projectDetails?.category}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button onClick={() => handleDelete(item.id)} className="rounded p-2 text-red-500/50 transition-colors hover:bg-red-500/10 hover:text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>
                    );
                })}

                {featured.length === 0 && <div className="p-8 text-center text-sm text-white/30">No projects featured yet.</div>}
            </div>
        </div>
    );
}
