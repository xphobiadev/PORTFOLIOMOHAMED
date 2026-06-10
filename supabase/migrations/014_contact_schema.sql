-- ============================================================
-- CONTACT INFO SCHEMA
-- Multilingual contact information
-- ============================================================

create table if not exists contact_info (
  id uuid primary key default gen_random_uuid(),
  
  -- Main Section
  kicker_fr text default 'CONTACT',
  kicker_en text default 'CONTACT',
  kicker_ar text default 'اتصل بنا',
  
  title_before_fr text default 'UN PROJET EN ',
  title_before_en text default 'A PROJECT IN ',
  title_before_ar text default 'هل لديك مشروع في ',
  
  title_highlight_fr text default 'TÊTE ?',
  title_highlight_en text default 'MIND?',
  title_highlight_ar text default 'ذهنك؟',
  
  desc_fr text default 'Collaborons et créons ensemble des expériences inoubliables.',
  desc_en text default 'Let''s collaborate and build unforgettable experiences together.',
  desc_ar text default 'لنعمل معاً وننشئ تجارب لا تُنسى.',
  
  -- Info Cards
  email text default 'hello@mb-creative.ma',
  phone text default '+212 6 00 89 15 94',
  
  location_fr text default 'Casablanca, Maroc',
  location_en text default 'Casablanca, Morocco',
  location_ar text default 'الدار البيضاء، المغرب',
  
  availability_fr text default 'Disponible pour projets freelance et collaborations.',
  availability_en text default 'Available for freelance projects and collaborations.',
  availability_ar text default 'متاح للمشاريع الحرة والتعاون.',
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table contact_info enable row level security;
create policy "public read contact_info" on contact_info for select using (true);
create policy "public write contact_info" on contact_info for all using (true) with check (true);

-- Insert initial row if not exists
insert into contact_info (id) values (gen_random_uuid()) on conflict do nothing;
