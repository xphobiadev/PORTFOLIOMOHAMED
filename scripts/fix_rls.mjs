import pg from 'pg';

async function main() {
    const sql = `
  -- Fix Media Bucket Storage Policies
  drop policy if exists "authenticated can upload to media bucket" on storage.objects;
  drop policy if exists "authenticated can update media bucket" on storage.objects;
  drop policy if exists "authenticated can delete in media bucket" on storage.objects;
  
  create policy "allow public upload to media S3 bucket" on storage.objects for insert with check (bucket_id = 'media');
  create policy "allow public update to media S3 bucket" on storage.objects for update using (bucket_id = 'media');
  create policy "allow public delete to media S3 bucket" on storage.objects for delete using (bucket_id = 'media');
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
        console.log('Successfully fixed Storage Bucket RLS Policies for Anon usage.');
    } catch (err) {
        console.error('Failed:', err);
    } finally {
        await client.end();
    }
}

main();
