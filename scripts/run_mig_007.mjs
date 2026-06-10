import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const envPath = resolve(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, ...val] = line.split('=');
    if (key && val.length) env[key.trim()] = val.join('=').trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const sql = readFileSync(resolve(process.cwd(), 'supabase/migrations/007_project_media.sql'), 'utf-8');

async function run() {
    console.log("Running 007_project_media.sql...");
    const { error } = await supabase.rpc('exec_sql', { sql_string: sql }).maybeSingle();
    if (error) {
        // Try direct SQL via REST
        const resp = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
            },
            body: JSON.stringify({ sql_string: sql })
        });
        if (!resp.ok) {
            console.error("RPC not available, please run the SQL manually in Supabase SQL Editor:");
            console.log("\n" + sql + "\n");
            return;
        }
    }
    console.log("✅ Migration completed!");
}

run().catch(console.error);
