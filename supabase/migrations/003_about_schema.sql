-- Hero Section (Single Row)
create table if not exists about_hero (
  id uuid primary key default gen_random_uuid(),
  label text default 'ABOUT ME',
  title_1 text default 'CRÉATEUR',
  title_2 text default 'DE VISIONS',
  subtitle text default 'Je transforme les idées en expériences visuelles, sonores et digitales inoubliables.',
  avatar_url text
);

-- Init Hero
insert into about_hero (label) values ('ABOUT ME') on conflict do nothing;

-- Personal Information Cards
create table if not exists about_info (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  is_visible boolean default true,
  sort_order int default 0
);

-- Statistics
create table if not exists about_stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  is_visible boolean default true,
  sort_order int default 0
);

-- Skills
create table if not exists about_skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text, 
  is_visible boolean default true,
  sort_order int default 0
);

-- Testimonials Update (add avatar URL, is_visible, sort_order)
alter table testimonials add column if not exists avatar_url text;
alter table testimonials add column if not exists is_visible boolean default true;
alter table testimonials add column if not exists sort_order int default 0;

-- RLS Policies
alter table about_hero enable row level security;
alter table about_info enable row level security;
alter table about_stats enable row level security;
alter table about_skills enable row level security;

create policy "public can read about_hero" on about_hero for select using (true);
create policy "admin manage about_hero" on about_hero for all using (auth.role() = 'authenticated');

create policy "public can read about_info" on about_info for select using (is_visible = true);
create policy "admin manage about_info" on about_info for all using (auth.role() = 'authenticated');

create policy "public can read about_stats" on about_stats for select using (is_visible = true);
create policy "admin manage about_stats" on about_stats for all using (auth.role() = 'authenticated');

create policy "public can read about_skills" on about_skills for select using (is_visible = true);
create policy "admin manage about_skills" on about_skills for all using (auth.role() = 'authenticated');
