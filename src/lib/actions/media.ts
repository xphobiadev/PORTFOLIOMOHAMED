"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getMedia() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
}

export async function saveMediaData(mediaData: { file_name: string; file_type: string; url: string; size: number }) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("media").insert(mediaData).select().single();
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard/media");
    return data;
}

export async function saveMediaDataBatch(mediaItems: { file_name: string; file_type: string; url: string; size: number }[]) {
    if (!mediaItems.length) return [];

    const supabase = await createClient();
    const { data, error } = await supabase.from("media").insert(mediaItems).select();
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard/media");
    return data || [];
}

export async function deleteMedia(id: string, fileName: string) {
    const supabase = await createClient();

    // First delete from storage
    const { error: storageError } = await supabase.storage.from("media").remove([fileName]);
    if (storageError) throw new Error(storageError.message);

    // Then delete from the table
    const { error } = await supabase.from("media").delete().eq("id", id);
    if (error) throw new Error(error.message);

    revalidatePath("/dashboard/media");
}
