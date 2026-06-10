"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ─── Generic Helpers ──────────────────────────────
async function fetchSingle(table: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from(table).select("*").limit(1).single();
    if (error && error.code !== 'PGRST116') console.error(`[about.v3] fetch ${table}:`, error.message);
    return data;
}

async function fetchList(table: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from(table).select("*").order("sort_order", { ascending: true });
    if (error) console.error(`[about.v3] list ${table}:`, error.message);
    return data || [];
}

function revalidateAbout() {
    revalidatePath("/about");
    revalidatePath("/dashboard/about");
}

async function upsertSingle(table: string, data: any) {
    const supabase = await createClient();
    const current = await fetchSingle(table);
    let res;
    if (current?.id) {
        const { id: _id, ...rest } = data;
        res = await supabase.from(table).update(rest).eq("id", current.id).select().single();
    } else {
        res = await supabase.from(table).insert([data]).select().single();
    }
    if (res.error) throw new Error(res.error.message);
    revalidateAbout();
    return res.data;
}

async function insertItem(table: string, data: any) {
    const supabase = await createClient();
    const { data: result, error } = await supabase.from(table).insert([data]).select().single();
    if (error) throw new Error(error.message);
    revalidateAbout();
    return result;
}

async function updateItem(table: string, id: string, data: any) {
    const supabase = await createClient();
    const { data: result, error } = await supabase.from(table).update(data).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    revalidateAbout();
    return result;
}

async function deleteItem(table: string, id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidateAbout();
}

// ─── HERO V3 ──────────────────────────────────────
export const getAboutHeroV3 = async () => fetchSingle("about_hero_v3");
export const updateAboutHeroV3 = async (data: any) => upsertSingle("about_hero_v3", data);

// ─── TIMELINE ─────────────────────────────────────
export const getAboutTimeline = async () => fetchList("about_timeline");
export const createTimelineItem = async (data: any) => insertItem("about_timeline", data);
export const updateTimelineItem = async (id: string, data: any) => updateItem("about_timeline", id, data);
export const deleteTimelineItem = async (id: string) => deleteItem("about_timeline", id);

// ─── SPECIALIZATIONS ──────────────────────────────
export const getAboutSpecializations = async () => fetchList("about_specializations");
export const createSpecialization = async (data: any) => insertItem("about_specializations", data);
export const updateSpecialization = async (id: string, data: any) => updateItem("about_specializations", id, data);
export const deleteSpecialization = async (id: string) => deleteItem("about_specializations", id);

// ─── EDUCATION ────────────────────────────────────
export const getAboutEducation = async () => fetchList("about_education");
export const createEducation = async (data: any) => insertItem("about_education", data);
export const updateEducation = async (id: string, data: any) => updateItem("about_education", id, data);
export const deleteEducation = async (id: string) => deleteItem("about_education", id);

// ─── STATS V3 ─────────────────────────────────────
export const getAboutStatsV3 = async () => fetchList("about_stats_v3");
export const createStatV3 = async (data: any) => insertItem("about_stats_v3", data);
export const updateStatV3 = async (id: string, data: any) => updateItem("about_stats_v3", id, data);
export const deleteStatV3 = async (id: string) => deleteItem("about_stats_v3", id);

// ─── TESTIMONIALS V3 ──────────────────────────────
export const getAboutTestimonialsV3 = async () => fetchList("about_testimonials_v3");
export const createTestimonialV3 = async (data: any) => insertItem("about_testimonials_v3", data);
export const updateTestimonialV3 = async (id: string, data: any) => updateItem("about_testimonials_v3", id, data);
export const deleteTestimonialV3 = async (id: string) => deleteItem("about_testimonials_v3", id);
