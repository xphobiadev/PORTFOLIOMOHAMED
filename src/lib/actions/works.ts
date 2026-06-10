"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Generic Helpers
async function fetchSingle(table: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from(table).select("*").limit(1).single();
    if (error && error.code !== 'PGRST116') console.error(`Error fetching ${table}:`, error.message);
    return data;
}

async function fetchList(table: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from(table).select("*").order("sort_order", { ascending: true });
    if (error) console.error(`Error fetching list ${table}:`, error.message);
    return data || [];
}

async function updateSingle(table: string, data: any) {
    const supabase = await createClient();
    const current = await fetchSingle(table);
    let res;
    if (current?.id) {
        res = await supabase.from(table).update(data).eq("id", current.id);
    } else {
        res = await supabase.from(table).insert([data]);
    }
    if (res.error) throw new Error(res.error.message);
    revalidatePath("/", "layout");
}

async function insertItem(table: string, data: any) {
    const supabase = await createClient();
    const { data: inserted, error } = await supabase.from(table).insert([data]).select().single();
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
    return inserted;
}

async function updateItem(table: string, id: string, data: any) {
    const supabase = await createClient();
    const { error } = await supabase.from(table).update(data).eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}

async function deleteItem(table: string, id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
}

// ----------------------------------------------------
// HERO
// ----------------------------------------------------
export const getWorksHero = async () => fetchSingle("works_hero");
export const updateWorksHero = async (data: any) => updateSingle("works_hero", data);

// ----------------------------------------------------
// CATEGORIES
// ----------------------------------------------------
export const getWorksCategories = async () => fetchList("works_categories");
export const createWorksCategory = async (data: any) => insertItem("works_categories", data);
export const updateWorksCategory = async (id: string, data: any) => updateItem("works_categories", id, data);
export const deleteWorksCategory = async (id: string) => deleteItem("works_categories", id);

export const updateWorksCategoryOrder = async (items: { id: string, sort_order: number }[]) => {
    const supabase = await createClient();
    const { error } = await supabase.from("works_categories").upsert(items);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
};

// ----------------------------------------------------
// PROJECTS OVERRIDE
// ----------------------------------------------------
export const getAllProjects = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("projects").select("*").order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return data || [];
};
export const createProject = async (data: any) => insertItem("projects", data);
export const updateProject = async (id: string, data: any) => updateItem("projects", id, data);
export const deleteProject = async (id: string) => deleteItem("projects", id);

export const updateProjectOrder = async (items: { id: string, sort_order: number }[]) => {
    const supabase = await createClient();
    const { error } = await supabase.from("projects").upsert(items);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
};

export const getProjectBySlug = async (slug: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("projects").select("*").eq("slug", slug).single();
    if (error) return null;
    return data;
};

// ----------------------------------------------------
// PROJECT MEDIA
// ----------------------------------------------------
export const getProjectMedia = async (projectId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("project_media")
        .select("*")
        .eq("project_id", projectId)
        .order("sort_order", { ascending: true });
    if (error) { console.error("Error fetching project media:", error.message); return []; }
    return data || [];
};

export const addProjectMedia = async (projectId: string, mediaData: { url: string; file_type: string; file_name: string }) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("project_media")
        .insert([{ project_id: projectId, ...mediaData }])
        .select()
        .single();
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
    return data;
};

export const addProjectMediaBatch = async (projectId: string, mediaItems: { url: string; file_type: string; file_name: string }[]) => {
    if (!mediaItems.length) return [];

    const supabase = await createClient();
    const rows = mediaItems.map((mediaData) => ({ project_id: projectId, ...mediaData }));
    const { data, error } = await supabase
        .from("project_media")
        .insert(rows)
        .select();
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
    return data || [];
};

export const deleteProjectMedia = async (id: string, fileName: string) => {
    const supabase = await createClient();
    // Delete from storage
    await supabase.storage.from("media").remove([fileName]);
    // Delete from DB
    const { error } = await supabase.from("project_media").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
};
