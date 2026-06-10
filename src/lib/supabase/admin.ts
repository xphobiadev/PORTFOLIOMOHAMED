import { createClient } from "@supabase/supabase-js";

function env(name: string) {
  return process.env[name];
}

export const supabaseAdmin = createClient(
  env("NEXT_PUBLIC_SUPABASE_URL")!,
  env("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } }
);
