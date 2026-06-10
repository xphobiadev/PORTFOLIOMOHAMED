-- Project Media: images, videos, audios linked to projects
create table if not exists project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  url text not null,
  file_type text not null check (file_type in ('image', 'video', 'audio')),
  file_name text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- RLS: fully open (matching existing pattern for local dashboard)
alter table project_media enable row level security;
create policy "public absolute project_media" on project_media for all using (true) with check (true);

-- Index for fast lookups
create index idx_project_media_project_id on project_media(project_id);
