"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProjects() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("projects").select("*").order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return data;
}

export async function createProject(projectData: any) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("projects").insert(projectData).select().single();
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return data;
}

export async function updateProject(id: string, projectData: any) {
    const supabase = await createClient();
    const { data, error } = await supabase.from("projects").update(projectData).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
    return data;
}

export async function deleteProject(id: string) {
    const supabase = await createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw new Error(error.message);
    revalidatePath("/dashboard/projects");
    revalidatePath("/");
}
