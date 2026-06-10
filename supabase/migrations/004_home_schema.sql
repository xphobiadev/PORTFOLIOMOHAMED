-- Home Hero Section (Single Row)
create table if not exists home_hero (
  id uuid primary key default gen_random_uuid(),
  title_1 text default 'Director',
  title_2 text default 'Based in',
  title_3 text default 'Morocco',
  subtitle text default 'Passionate filmmaker crafting cinematic experiences.',
  cta_primary_label text default 'View Projects',
  cta_primary_url text default '/works',
  cta_secondary_label text default 'Contact',
  cta_secondary_url text default '/contact',
  background_url text,
  updated_at timestamptz default now()
);

-- Home Featured Projects
create table if not exists home_featured_projects (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid references portfolio(id) on delete cascade not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Home Stats Bar
create table if not exists home_stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  icon text not null,
  is_visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Home CTA Section (Single Row)
create table if not exists home_cta (
  id uuid primary key default gen_random_uuid(),
  title_1 text default 'Let''s',
  title_2 text default 'Create',
  title_3 text default 'Together',
  cta_label text default 'Start a project',
  cta_url text default '/contact',
  background_url text,
  updated_at timestamptz default now()
);

-- Home Services Section Content (Single Row)
create table if not exists home_services_content (
  id uuid primary key default gen_random_uuid(),
  section_label text default 'EXPERTISE',
  section_title text default 'Creative',
  section_subtitle text default 'Services we offer',
  updated_at timestamptz default now()
);

-- Home Services Cards
create table if not exists home_services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null,
  is_visible boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Init Single Rows
insert into home_hero (title_1) values ('Director') on conflict do nothing;
insert into home_cta (title_1) values ('Let''s') on conflict do nothing;
insert into home_services_content (section_label) values ('EXPERTISE') on conflict do nothing;

-- Ensure RLS is completely open for anon access to allow dashboard usage locally
alter table home_hero enable row level security;
alter table home_featured_projects enable row level security;
alter table home_stats enable row level security;
alter table home_cta enable row level security;
alter table home_services_content enable row level security;
alter table home_services enable row level security;

create policy "public absolute home_hero" on home_hero for all using (true) with check (true);
create policy "public absolute featured" on home_featured_projects for all using (true) with check (true);
create policy "public absolute stats" on home_stats for all using (true) with check (true);
create policy "public absolute cta" on home_cta for all using (true) with check (true);
create policy "public absolute svc_content" on home_services_content for all using (true) with check (true);
create policy "public absolute svc" on home_services for all using (true) with check (true);
