import pg from 'pg';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load env
const envPath = resolve(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
    const eq = line.indexOf('=');
    if (eq > 0) env[line.substring(0, eq).trim()] = line.substring(eq + 1).trim();
});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

// Extract project ref from URL
const projectRef = SUPABASE_URL.match(/https:\/\/(.+)\.supabase\.co/)?.[1];
if (!projectRef) {
    console.error("Could not extract project ref");
    process.exit(1);
}

// Supabase direct PostgreSQL connection string
// Format: postgresql://postgres.[ref]:[service_role_key]@aws-0-[region].pooler.supabase.com:6543/postgres
// We'll try multiple connection patterns

const sql = readFileSync(resolve(process.cwd(), 'supabase/migrations/008_about_v3_schema.sql'), 'utf-8');

const connectionStrings = [
    `postgresql://postgres.${projectRef}:${SERVICE_KEY}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres.${projectRef}:${SERVICE_KEY}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres.${projectRef}:${SERVICE_KEY}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres:${SERVICE_KEY}@db.${projectRef}.supabase.co:5432/postgres`,
];

async function tryConnect(connStr) {
    const client = new pg.Client({
        connectionString: connStr,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 10000,
    });
    await client.connect();
    return client;
}

async function run() {
    console.log(`Project: ${projectRef}`);
    console.log("Trying to connect to PostgreSQL...\n");

    let client = null;

    for (const connStr of connectionStrings) {
        const host = connStr.match(/@(.+?):/)?.[1] || 'unknown';
        try {
            console.log(`  Trying ${host}...`);
            client = await tryConnect(connStr);
            console.log(`  ✓ Connected via ${host}\n`);
            break;
        } catch (err) {
            console.log(`  ✗ ${err.message.substring(0, 80)}`);
        }
    }

    if (!client) {
        console.error("\n❌ Could not connect to PostgreSQL. All connection patterns failed.");
        console.log("\nPlease run the SQL manually in the Supabase SQL Editor:");
        console.log("  Dashboard → SQL Editor → paste contents of supabase/migrations/008_about_v3_schema.sql");
        process.exit(1);
    }

    try {
        console.log("Executing migration SQL...");
        await client.query(sql);
        console.log("\n✅ Migration 008 completed successfully!");

        // Verify tables exist
        const tables = ['about_hero_v3', 'about_timeline', 'about_specializations', 'about_education', 'about_stats_v3', 'about_testimonials_v3'];
        console.log("\nVerifying tables:");
        for (const table of tables) {
            const res = await client.query(`SELECT count(*) FROM ${table}`);
            console.log(`  ✓ ${table}: ${res.rows[0].count} rows`);
        }
    } catch (err) {
        console.error("SQL Error:", err.message);
    } finally {
        await client.end();
    }
}

run().catch(console.error);
