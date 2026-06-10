"use client";

import React from "react";
import { DataTable } from "@/components/admin/data-table";
import { Modal } from "@/components/admin/modal";
import { MediaUploader } from "@/components/admin/media-uploader";
import { createPortfolioItem, updatePortfolioItem, deletePortfolioItem } from "@/lib/actions/portfolio";

export default function PortfolioClient({ data }: { data: any[] }) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingItem, setEditingItem] = React.useState<any>(null);
    const [coverUrl, setCoverUrl] = React.useState<string>("");

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const itemData = Object.fromEntries(formData.entries());
        itemData.cover_url = coverUrl;

        try {
            if (editingItem) {
                await updatePortfolioItem(editingItem.id, itemData);
            } else {
                await createPortfolioItem(itemData);
            }
            setIsModalOpen(false);
            setEditingItem(null);
        } catch (err: any) {
            alert("Failed to save: " + err.message);
        }
    };

    const handleDelete = async (row: any) => {
        if (!confirm("Are you sure you want to delete this portfolio item?")) return;
        try {
            await deletePortfolioItem(row.id);
        } catch (err: any) {
            alert("Failed to delete: " + err.message);
        }
    };

    return (
        <>
            <DataTable
                title="Portfolio Items"
                description={`Manage ${data.length} portfolio items.`}
                data={data}
                columns={[
                    { key: "slug", label: "Slug" },
                    { key: "title", label: "Title" },
                    { key: "category", label: "Category" },
                ]}
                onAdd={() => {
                    setEditingItem(null);
                    setCoverUrl("");
                    setIsModalOpen(true);
                }}
                onEdit={(row) => {
                    setEditingItem(row);
                    setCoverUrl(row.cover_url || "");
                    setIsModalOpen(true);
                }}
                onDelete={handleDelete}
            />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "Edit Portfolio Item" : "Add Portfolio Item"}>
                <form onSubmit={handleSave} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm text-white/60">Title</label>
                            <input name="title" defaultValue={editingItem?.title} required className="input-dark" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm text-white/60">Slug</label>
                            <input name="slug" defaultValue={editingItem?.slug} required className="input-dark" />
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm text-white/60">Category</label>
                        <input name="category" defaultValue={editingItem?.category} required className="input-dark" />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm text-white/60">Excerpt</label>
                        <textarea name="excerpt" defaultValue={editingItem?.excerpt} className="input-dark min-h-20" />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-white/60">Cover Image</label>
                        {coverUrl ? (
                            <div className="relative overflow-hidden rounded-xl bg-black aspect-video max-h-40 w-fit">
                                <img src={coverUrl} alt="Cover" className="h-full object-contain" />
                                <button type="button" onClick={() => setCoverUrl("")} className="absolute top-2 right-2 rounded-full bg-black/60 p-2 text-white hover:bg-mb-red hover:text-black">
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <MediaUploader onUploadComplete={(items) => {
                                if (items && items.length > 0) {
                                    setCoverUrl(items[0].url);
                                }
                            }} />
                        )}
                        <input type="hidden" name="cover_url" value={coverUrl} />
                    </div>
                    <button type="submit" className="btn-gold mt-4 w-full justify-center">
                        {editingItem ? "Update Item" : "Create Item"}
                    </button>
                </form>
            </Modal>
        </>
    );
}
