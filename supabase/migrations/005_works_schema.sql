-- Works Hero Section (Single Row)
create table if not exists works_hero (
  id uuid primary key default gen_random_uuid(),
  label text default 'PORTFOLIO',
  title text default 'MY WORKS',
  subtitle text default 'Passionate filmmaker crafting cinematic experiences.',
  updated_at timestamptz default now()
);

-- Works Categories
create table if not exists works_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null,
  is_visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Init Single Rows
insert into works_hero (label) values ('PORTFOLIO') on conflict do nothing;

-- Init Default Categories
insert into works_categories (name, slug, sort_order) values 
('ALL', 'all', 0),
('DESIGN', 'design', 1),
('TECH', 'tech', 2),
('PRODUCTION', 'production', 3),
('BRANDING', 'branding', 4),
('EVENTS', 'events', 5),
('ENGINEERING', 'engineering', 6)
on conflict do nothing;

-- Ensure RLS is completely open for anon access to allow dashboard usage locally
alter table works_hero enable row level security;
alter table works_categories enable row level security;

create policy "public absolute works_hero" on works_hero for all using (true) with check (true);
create policy "public absolute works_categories" on works_categories for all using (true) with check (true);

-- Ensure our generic 'projects' table is also fully open for the local CRUD
alter table projects enable row level security;
drop policy if exists "public can read published projects" on projects;
drop policy if exists "authenticated can manage projects" on projects;
drop policy if exists "public absolute projects" on projects;
create policy "public absolute projects" on projects for all using (true) with check (true);
