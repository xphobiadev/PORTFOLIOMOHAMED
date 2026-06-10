create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_type text not null, -- 'image', 'video', 'audio', etc
  url text not null,
  size int,
  created_at timestamptz default now()
);

alter table media enable row level security;

create policy "public can read media"
on media for select
using (true);

create policy "authenticated can manage media"
on media for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create table if not exists portfolio (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  excerpt text,
  description text,
  client_name text,
  year int,
  cover_url text,
  gallery text[] default '{}',
  media_ids uuid[] default '{}',
  tags text[] default '{}',
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table portfolio enable row level security;

create policy "public can read portfolio"
on portfolio for select
using (true);

create policy "authenticated can manage portfolio"
on portfolio for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

-- Insert initial Storage Bucket for media
insert into storage.buckets (id, name, public) 
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public can read media bucket"
on storage.objects for select
using (bucket_id = 'media');

create policy "authenticated can upload to media bucket"
on storage.objects for insert
with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "authenticated can update media bucket"
on storage.objects for update
using (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "authenticated can delete in media bucket"
on storage.objects for delete
using (bucket_id = 'media' and auth.role() = 'authenticated');

-- Seed Portfolio data based on the data.ts (Removed)
