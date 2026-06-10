"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// HERO
export async function getAboutHero() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("about_hero").select("*").single();
    if (error && error.code !== 'PGRST116') throw new Error(error.message);
    return data;
}

export async function updateAboutHero(data: any) {
    const supabase = await createClient();
    // Ensure row exists, since we init it in SQL, we can just update id, but let's do upsert if id is missing
    let result;
    if (data.id) {
        result = await supabase.from("about_hero").update(data).eq("id", data.id).select().single();
    } else {
        result = await supabase.from("about_hero").insert(data).select().single();
    }
    if (result.error) throw new Error(result.error.message);
    revalidatePath("/dashboard/about");
    revalidatePath("/about");
    return result.data;
}

// GENERIC HELPERS FOR LISTS
async function fetchList(table: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from(table).select("*").order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return data;
}

async function insertItem(table: string, data: any) {
    const supabase = await createClient();
    const { data: result, error } = await supabase.from(table).insert(data).select().single();
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard/about");
    revalidatePath("/about");
    return result;
}

async function updateItem(table: string, id: string, data: any) {
    const supabase = await createClient();
    const { data: result, error } = await supabase.from(table).update(data).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard/about");
    revalidatePath("/about");
    return result;
}

async function deleteItem(table: string, id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard/about");
    revalidatePath("/about");
}

// INFO
export const getAboutInfo = async () => fetchList("about_info");
export const createAboutInfo = async (data: any) => insertItem("about_info", data);
export const updateAboutInfo = async (id: string, data: any) => updateItem("about_info", id, data);
export const deleteAboutInfo = async (id: string) => deleteItem("about_info", id);

// STATS
export const getAboutStats = async () => fetchList("about_stats");
export const createAboutStat = async (data: any) => insertItem("about_stats", data);
export const updateAboutStat = async (id: string, data: any) => updateItem("about_stats", id, data);
export const deleteAboutStat = async (id: string) => deleteItem("about_stats", id);

// SKILLS
export const getAboutSkills = async () => fetchList("about_skills");
export const createAboutSkill = async (data: any) => insertItem("about_skills", data);
export const updateAboutSkill = async (id: string, data: any) => updateItem("about_skills", id, data);
export const deleteAboutSkill = async (id: string) => deleteItem("about_skills", id);

// TESTIMONIALS
export const getTestimonials = async () => fetchList("testimonials");
export const createTestimonial = async (data: any) => insertItem("testimonials", data);
export const updateTestimonial = async (id: string, data: any) => updateItem("testimonials", id, data);
export const deleteTestimonial = async (id: string) => deleteItem("testimonials", id);

