import pg from 'pg';

async function main() {
    const sql = `
  -- Fix the 'media' table
  drop policy if exists "authenticated can manage media" on media;
  create policy "public can manage media" on media for all using (true) with check (true);

  -- Fix the 'portfolio' table 
  drop policy if exists "authenticated can manage portfolio" on portfolio;
  create policy "public can manage portfolio" on portfolio for all using (true) with check (true);

  -- Fix the 'projects' table (if exists)
  drop policy if exists "authenticated can manage projects" on projects;
  create policy "public can manage projects" on projects for all using (true) with check (true);

  -- Fix the 'about_*' tables (from 003)
  drop policy if exists "admin manage about_hero" on about_hero;
  drop policy if exists "admin manage about_info" on about_info;
  drop policy if exists "admin manage about_stats" on about_stats;
  drop policy if exists "admin manage about_skills" on about_skills;
  
  create policy "public manage about_hero" on about_hero for all using(true) with check(true);
  create policy "public manage about_info" on about_info for all using(true) with check(true);
  create policy "public manage about_stats" on about_stats for all using(true) with check(true);
  create policy "public manage about_skills" on about_skills for all using(true) with check(true);
  `;

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
        console.log('Successfully fixed Database Table RLS Policies for Anon usage.');
    } catch (err) {
        console.error('Failed:', err);
    } finally {
        await client.end();
    }
}

main();
