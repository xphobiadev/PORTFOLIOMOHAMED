import fs from 'fs';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const migPath = path.resolve(__dirname, '../supabase/migrations/013_remove_project_seeds.sql');
    const sql = fs.readFileSync(migPath, 'utf8');

    const connectionString = process.env.SUPABASE_DB_URL || process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error('Missing SUPABASE_DB_URL or DATABASE_URL environment variable.');
    }

    const client = new pg.Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Executing migration 013...');
        await client.query(sql);
        console.log('Migration 013 executed successfully! Premium project seed data applied.');
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

main();
