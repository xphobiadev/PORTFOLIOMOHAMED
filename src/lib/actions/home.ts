"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Generic Helpers
async function fetchSingle(table: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from(table).select("*").limit(1).single();
    if (error) console.error(`Error fetching ${table}:`, error.message);
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
    const { error } = await supabase.from(table).insert([data]);
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
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
export const getHomeHero = async () => fetchSingle("home_hero");
export const updateHomeHero = async (data: any) => updateSingle("home_hero", data);

// ----------------------------------------------------
// CTA
// ----------------------------------------------------
export const getHomeCta = async () => fetchSingle("home_cta");
export const updateHomeCta = async (data: any) => updateSingle("home_cta", data);

// ----------------------------------------------------
// SERVICES CONTENT
// ----------------------------------------------------
export const getHomeServicesContent = async () => fetchSingle("home_services_content");
export const updateHomeServicesContent = async (data: any) => updateSingle("home_services_content", data);

// ----------------------------------------------------
// STATS
// ----------------------------------------------------
export const getHomeStats = async () => fetchList("home_stats");
export const createHomeStat = async (data: any) => insertItem("home_stats", data);
export const updateHomeStat = async (id: string, data: any) => updateItem("home_stats", id, data);
export const deleteHomeStat = async (id: string) => deleteItem("home_stats", id);

// ----------------------------------------------------
// SERVICES CARDS
// ----------------------------------------------------
export const getHomeServices = async () => fetchList("home_services");
export const createHomeService = async (data: any) => insertItem("home_services", data);
export const updateHomeService = async (id: string, data: any) => updateItem("home_services", id, data);
export const deleteHomeService = async (id: string) => deleteItem("home_services", id);

// ----------------------------------------------------
// FEATURED PROJECTS
// ----------------------------------------------------
export const getFeaturedProjects = async () => fetchList("home_featured_projects");
export const createFeaturedProject = async (data: any) => insertItem("home_featured_projects", data);
export const updateFeaturedProject = async (id: string, data: any) => updateItem("home_featured_projects", id, data);
export const deleteFeaturedProject = async (id: string) => deleteItem("home_featured_projects", id);
