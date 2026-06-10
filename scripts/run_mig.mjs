import fs from 'fs';
import pg from 'pg';

async function main() {
    const sql = fs.readFileSync('supabase/migrations/006_multilingual_schema.sql', 'utf8');

    const connectionString = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error('Missing SUPABASE_DB_URL or DATABASE_URL environment variable.');
    }

    const client = new pg.Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        await client.query(sql);
        console.log('Migration 006 executed successfully! i18n schema applied.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await client.end();
    }
}

main();
