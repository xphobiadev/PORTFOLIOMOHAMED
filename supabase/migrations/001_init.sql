create extension if not exists "pgcrypto";

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  excerpt text,
  description text,
  client_name text,
  year int,
  location text,
  status text default 'published',
  cover_url text,
  gallery text[] default '{}',
  tags text[] default '{}',
  budget numeric default 0,
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  role text,
  company text,
  content text not null,
  created_at timestamptz default now()
);

create table if not exists dashboard_stats (
  id uuid primary key default gen_random_uuid(),
  total_revenue numeric default 0,
  projects_completed int default 0,
  total_clients int default 0,
  open_projects int default 0,
  satisfaction_rate int default 98,
  updated_at timestamptz default now()
);

create table if not exists monthly_revenue (
  id uuid primary key default gen_random_uuid(),
  month text not null,
  revenue numeric default 0,
  expenses numeric default 0,
  created_at timestamptz default now()
);

alter table projects enable row level security;
alter table messages enable row level security;
alter table testimonials enable row level security;
alter table dashboard_stats enable row level security;
alter table monthly_revenue enable row level security;

create policy "public can read published projects"
on projects for select
using (status = 'published');

create policy "public can insert messages"
on messages for insert
with check (true);

create policy "public can read testimonials"
on testimonials for select
using (true);

create policy "authenticated can read dashboard_stats"
on dashboard_stats for select
using (auth.role() = 'authenticated');

create policy "authenticated can read monthly_revenue"
on monthly_revenue for select
using (auth.role() = 'authenticated');

create policy "authenticated can manage projects"
on projects for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

insert into dashboard_stats (total_revenue, projects_completed, total_clients, open_projects, satisfaction_rate)
values (128450, 150, 50, 12, 98)
on conflict do nothing;

insert into monthly_revenue (month, revenue, expenses) values
('Jan', 40000, 15000),
('Feb', 62000, 28000),
('Mar', 54000, 26000),
('Apr', 68000, 39000),
('May', 92000, 43000),
('Jun', 84000, 47000),
('Jul', 68000, 33000),
('Aug', 64000, 35000),
('Sep', 96000, 46000),
('Oct', 94000, 44000),
('Nov', 114000, 52000),
('Dec', 102000, 61000);

insert into testimonials (author, role, company, content)
values
('Youssef Z.', 'CEO', 'Live Event Production', 'Un créatif exceptionnel, capable de transformer une idée en une expérience inoubliable.'),
('Sara B.', 'Marketing Director', 'Brand Agency', 'Vision forte, exécution premium et excellente compréhension du détail.'),
('Amine K.', 'Founder', 'Tech Solutions', 'Travail impeccable, respect des délais et qualité au rendez-vous.');
