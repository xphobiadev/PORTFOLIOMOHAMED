"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getPortfolioItems() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("portfolio").select("*").order("sort_order", { ascending: true });
    if (error) {
        console.error("Error fetching portfolio items:", error.message);
        return [];
    }
    return data || [];
}

export async function createPortfolioItem(portfolioData: any) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("portfolio").insert(portfolioData).select().single();
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard/portfolio");
    revalidatePath("/works");
    revalidatePath("/");
    return data;
}

export async function updatePortfolioItem(id: string, portfolioData: any) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("portfolio").update(portfolioData).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard/portfolio");
    revalidatePath("/works");
    revalidatePath("/");
    return data;
}

export async function deletePortfolioItem(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("portfolio").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard/portfolio");
    revalidatePath("/works");
    revalidatePath("/");
}
