import pg from 'pg';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const sql = readFileSync(resolve(process.cwd(), 'supabase/migrations/010_trilingual_data_seed.sql'), 'utf-8');

// Connection string provided by user (transaction mode pooler)
const connStr = `postgresql://postgres.zfbkszbfcabgzefuvwyd:${encodeURIComponent('n.JV,B%n9igwuG6')}@aws-1-eu-central-1.pooler.supabase.com:6543/postgres`;

async function run() {
    console.log("=== Migration 010: Trilingual Data Seed ===\n");

    const client = new pg.Client({
        connectionString: connStr,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 15000,
    });

    try {
        console.log("Connecting to PostgreSQL (aws-1-eu-central-1)...");
        await client.connect();
        console.log("✓ Connected!\n");

        console.log("Executing migration SQL...");
        await client.query(sql);
        console.log("✅ Migration 010 completed successfully!\n");

        // Verify all tables
        const tables = [
            'home_hero', 'home_stats', 'home_cta', 'home_services_content',
            'home_services', 'works_hero', 'works_categories', 'projects',
            'about_hero', 'about_info', 'about_stats', 'about_skills',
            'testimonials', 'about_hero_v3', 'about_timeline',
            'about_specializations', 'about_education', 'about_stats_v3',
            'about_testimonials_v3'
        ];

        console.log("Verifying all tables:\n");
        for (const table of tables) {
            try {
                const res = await client.query(`SELECT count(*) FROM ${table}`);
                console.log(`  ✓ ${table}: ${res.rows[0].count} rows`);
            } catch (err) {
                console.log(`  ✗ ${table}: ${err.message.substring(0, 60)}`);
            }
        }

        // Sample check: home_hero trilingual
        try {
            const res = await client.query(`SELECT title_1_fr, title_1_en, title_1_ar FROM home_hero LIMIT 1`);
            if (res.rows[0]) {
                console.log(`\n  Sample home_hero: FR="${res.rows[0].title_1_fr}" EN="${res.rows[0].title_1_en}" AR="${res.rows[0].title_1_ar}"`);
            }
        } catch { }

        // Check portfolio i18n columns exist
        try {
            const res = await client.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'portfolio' AND column_name LIKE '%_fr' ORDER BY column_name`);
            if (res.rows.length > 0) {
                console.log(`\n  ✓ portfolio i18n columns: ${res.rows.map(r => r.column_name).join(', ')}`);
            }
        } catch { }

    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await client.end();
    }
}

run().catch(console.error);
