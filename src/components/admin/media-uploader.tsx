"use client";

import React from "react";
import { UploadCloud, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";
import { saveMediaDataBatch } from "@/lib/actions/media";

const MAX_PARALLEL_UPLOADS = 4;

function getFileType(file: File) {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    return "other";
}

async function runWithConcurrency<T, R>(
    items: T[],
    limit: number,
    worker: (item: T, index: number) => Promise<R>
) {
    const results = new Array<R>(items.length);
    let nextIndex = 0;

    const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
        while (nextIndex < items.length) {
            const currentIndex = nextIndex++;
            results[currentIndex] = await worker(items[currentIndex], currentIndex);
        }
    });

    await Promise.all(runners);
    return results;
}

export function MediaUploader({ 
    onUploadComplete, 
    accept = "image/*,video/*,audio/*",
    label = "Click or drag to upload media"
}: { 
    onUploadComplete?: (uploadedItems: any[]) => void;
    accept?: string;
    label?: string;
}) {
    const [isUploading, setIsUploading] = React.useState(false);
    const [uploadedCount, setUploadedCount] = React.useState(0);
    const [totalCount, setTotalCount] = React.useState(0);
    const [error, setError] = React.useState<string | null>(null);
    const supabase = createClient();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setIsUploading(true);
        setError(null);

        const files = Array.from(e.target.files);
        setUploadedCount(0);
        setTotalCount(files.length);

        try {
            const uploadedItems = await runWithConcurrency(files, MAX_PARALLEL_UPLOADS, async (file) => {
                const fileExt = file.name.split('.').pop();
                const fileName = `${crypto.randomUUID()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from("media")
                    .upload(fileName, file);

                if (uploadError) throw new Error(uploadError.message);

                const { data: { publicUrl } } = supabase.storage
                    .from("media")
                    .getPublicUrl(fileName);

                setUploadedCount((count) => count + 1);

                return {
                    file_name: fileName,
                    file_type: getFileType(file),
                    url: publicUrl,
                    size: file.size,
                };
            });

            const savedItems = await saveMediaDataBatch(uploadedItems);
            onUploadComplete?.(savedItems);
        } catch (err: any) {
            setError(err.message || "Upload failed");
        } finally {
            setIsUploading(false);
            setUploadedCount(0);
            setTotalCount(0);
            // Reset input
            e.target.value = '';
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-[#161616] p-6 text-center transition-colors hover:border-mb-gold/50 hover:bg-white/[0.02]">
            <input
                type="file"
                multiple
                accept={accept}
                onChange={handleFileChange}
                disabled={isUploading}
                className="absolute inset-0 cursor-pointer opacity-0"
            />

            <div className="flex flex-col items-center gap-2">
                {isUploading ? (
                    <Loader2 className="animate-spin text-mb-gold" size={24} />
                ) : (
                    <UploadCloud className="text-white/40" size={24} />
                )}
                <div>
                    <p className="text-sm font-medium text-white">
                        {isUploading ? `Uploading ${uploadedCount}/${totalCount}...` : label}
                    </p>
                </div>
                {error && <p className="mt-2 flex text-xs text-mb-red">{error}</p>}
            </div>
        </div>
    );
}
