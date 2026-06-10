"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getContactInfo() {
    const supabase = await createClient();
    const { data, error } = await supabase.from("contact_info").select("*").limit(1).single();
    if (error && error.code !== 'PGRST116') {
        console.error("[contact.service] fetch contact_info:", error.message);
    }
    return data;
}

export async function updateContactInfo(data: any) {
    const supabase = await createClient();
    const current = await getContactInfo();
    let res;
    if (current?.id) {
        const { id: _id, created_at, updated_at, ...rest } = data;
        res = await supabase
            .from("contact_info")
            .update({ ...rest, updated_at: new Date().toISOString() })
            .eq("id", current.id)
            .select()
            .single();
    } else {
        res = await supabase.from("contact_info").insert([data]).select().single();
    }

    if (res.error) throw new Error(res.error.message);
    
    revalidatePath("/contact");
    revalidatePath("/dashboard/contact");
    return res.data;
}
