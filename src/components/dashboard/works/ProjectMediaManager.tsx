"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Trash2, Image as ImageIcon, Film, Music, Loader2 } from "lucide-react";
import { MediaUploader } from "@/components/admin/media-uploader";
import { addProjectMediaBatch, deleteProjectMedia, getProjectMedia } from "@/lib/actions/works";

interface ProjectMediaManagerProps {
    projectId: string;
}

export function ProjectMediaManager({ projectId }: ProjectMediaManagerProps) {
    const [media, setMedia] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadMedia = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getProjectMedia(projectId);
            setMedia(data);
        } catch { }
        setLoading(false);
    }, [projectId]);

    useEffect(() => {
        loadMedia();
    }, [loadMedia]);

    const handleUpload = async (uploadedItems: any[]) => {
        try {
            const savedItems = await addProjectMediaBatch(projectId, uploadedItems.map((item) => ({
                url: item.url,
                file_type: item.file_type,
                file_name: item.file_name
            })));
            setMedia(prev => [...prev, ...savedItems]);
        } catch (err) {
            console.error("Failed to link media:", err);
        }
    };

    const handleDelete = async (id: string, fileName: string) => {
        if (!confirm("Delete this media?")) return;
        setMedia(prev => prev.filter(m => m.id !== id));
        try {
            await deleteProjectMedia(id, fileName);
        } catch (err) {
            console.error("Failed to delete:", err);
            loadMedia();
        }
    };

    const images = media.filter(m => m.file_type === "image");
    const videos = media.filter(m => m.file_type === "video");
    const audios = media.filter(m => m.file_type === "audio");

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="animate-spin text-mb-gold" size={24} />
            </div>
        );
    }

    return (
        <div className="space-y-8 mt-6 border-t border-white/10 pt-8">
            <h4 className="text-lg font-bold text-mb-gold mb-6 uppercase tracking-wider">Project Media Gallery</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* IMAGES AREA */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                        <ImageIcon className="text-mb-gold" size={20} />
                        <h5 className="text-sm font-bold text-white uppercase tracking-tight">Images ({images.length})</h5>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 min-h-[100px] content-start">
                        {images.map(img => (
                            <div key={img.id} className="relative group rounded-lg overflow-hidden aspect-video bg-black border border-white/5">
                                <img src={img.url} className="w-full h-full object-cover" alt="" />
                                <button
                                    onClick={() => handleDelete(img.id, img.file_name)}
                                    className="absolute top-1 right-1 p-1 bg-red-500/80 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={12} className="text-white" />
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <MediaUploader 
                        accept="image/*" 
                        label="Add Images" 
                        onUploadComplete={handleUpload} 
                    />
                </div>

                {/* VIDEOS AREA */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                        <Film className="text-blue-400" size={20} />
                        <h5 className="text-sm font-bold text-white uppercase tracking-tight">Videos ({videos.length})</h5>
                    </div>
                    
                    <div className="space-y-2 min-h-[100px]">
                        {videos.map(vid => (
                            <div key={vid.id} className="flex items-center gap-3 rounded-xl bg-black/50 border border-white/10 p-2">
                                <video src={vid.url} className="h-12 w-20 rounded object-cover flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-white/40 truncate">{vid.file_name}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(vid.id, vid.file_name)}
                                    className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex-shrink-0"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <MediaUploader 
                        accept="video/*" 
                        label="Add Videos" 
                        onUploadComplete={handleUpload} 
                    />
                </div>

                {/* AUDIOS AREA */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                        <Music className="text-green-400" size={20} />
                        <h5 className="text-sm font-bold text-white uppercase tracking-tight">Audio Tracks ({audios.length})</h5>
                    </div>
                    
                    <div className="space-y-2 min-h-[100px]">
                        {audios.map(aud => (
                            <div key={aud.id} className="flex flex-col gap-2 rounded-xl bg-black/50 border border-white/10 p-3">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-[10px] text-white/40 truncate flex-1">{aud.file_name}</p>
                                    <button
                                        onClick={() => handleDelete(aud.id, aud.file_name)}
                                        className="p-1 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                                <audio src={aud.url} controls className="h-6 w-full filter invert brightness-200" />
                            </div>
                        ))}
                    </div>
                    
                    <MediaUploader 
                        accept="audio/*" 
                        label="Add Audio" 
                        onUploadComplete={handleUpload} 
                    />
                </div>
            </div>
        </div>
    );
}
