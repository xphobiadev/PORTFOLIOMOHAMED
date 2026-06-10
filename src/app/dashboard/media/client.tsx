"use client";

import React from "react";
import { Plus, Trash2, Video, Music } from "lucide-react";
import { MediaUploader } from "@/components/admin/media-uploader";
import { Modal } from "@/components/admin/modal";
import { deleteMedia } from "@/lib/actions/media";

export default function MediaGallery({ media }: { media: any[] }) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState<string | null>(null);

    const handleDelete = async (id: string, fileName: string) => {
        if (!confirm("Are you sure you want to delete this file?")) return;
        setIsDeleting(id);
        try {
            await deleteMedia(id, fileName);
        } catch (err: any) {
            alert("Failed to delete: " + err.message);
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="font-display text-4xl font-bold">Media Library</h1>
                    <p className="mt-2 text-white/45">Upload and manage media files ({media.length} items).</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-mb-gold px-5 text-sm font-medium text-black hover:bg-mb-gold2"
                >
                    <Plus size={16} />
                    Upload Media
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {media.map((item) => (
                    <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl border border-white/5 bg-[#121212]">
                        {item.file_type === "image" ? (
                            <img src={item.url} alt={item.file_name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                        ) : item.file_type === "video" ? (
                            <div className="flex h-full w-full flex-col items-center justify-center bg-black/50">
                                <Video className="text-white/40" size={32} />
                            </div>
                        ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center bg-black/50">
                                <Music className="text-white/40" size={32} />
                            </div>
                        )}

                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                            <p className="truncate text-xs font-medium">{item.file_name}</p>
                            <button
                                onClick={() => handleDelete(item.id, item.file_name)}
                                disabled={isDeleting === item.id}
                                className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-white hover:bg-mb-red hover:text-black"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}

                {media.length === 0 && (
                    <div className="col-span-full py-20 text-center text-white/40">
                        No media found. Upload some files to get started.
                    </div>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload Media">
                <MediaUploader onUploadComplete={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
}
