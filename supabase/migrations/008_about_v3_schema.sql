-- ============================================================
-- ABOUT V3 — Ultra Pro About Page Schema
-- 6 tables with multilingual support (FR/EN/AR) + seed data
-- ============================================================

-- 1. HERO V3
create table if not exists about_hero_v3 (
  id uuid primary key default gen_random_uuid(),
  title_1_fr text default 'MOHAMED',
  title_1_en text default 'MOHAMED',
  title_1_ar text default 'محمد',
  title_2_fr text default 'BOULIANI',
  title_2_en text default 'BOULIANI',
  title_2_ar text default 'بولياني',
  subtitle_fr text default 'Directeur Artistique & Créateur Multidisciplinaire',
  subtitle_en text default 'Art Director & Multidisciplinary Creator',
  subtitle_ar text default 'مدير فني ومبدع متعدد التخصصات',
  tagline_fr text default 'Plus de 20 ans de passion créative, du design à la scénographie.',
  tagline_en text default 'Over 20 years of creative passion, from design to scenography.',
  tagline_ar text default 'أكثر من 20 عاماً من الشغف الإبداعي، من التصميم إلى السينوغرافيا.',
  portrait_url text default '',
  badge_text_fr text default '20+ ans d''expérience',
  badge_text_en text default '20+ years of experience',
  badge_text_ar text default '+20 سنة خبرة',
  cta_text_fr text default 'Découvrir mon parcours',
  cta_text_en text default 'Discover my journey',
  cta_text_ar text default 'اكتشف مسيرتي',
  cta_url text default '#timeline',
  created_at timestamptz default now()
);

alter table about_hero_v3 enable row level security;
create policy "public read about_hero_v3" on about_hero_v3 for select using (true);
create policy "public write about_hero_v3" on about_hero_v3 for all using (true) with check (true);

insert into about_hero_v3 (id) values (gen_random_uuid()) on conflict do nothing;

-- 2. TIMELINE
create table if not exists about_timeline (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title_fr text not null,
  title_en text default '',
  title_ar text default '',
  description_fr text default '',
  description_en text default '',
  description_ar text default '',
  is_milestone boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table about_timeline enable row level security;
create policy "public read about_timeline" on about_timeline for select using (true);
create policy "public write about_timeline" on about_timeline for all using (true) with check (true);

insert into about_timeline (year, title_fr, title_en, title_ar, description_fr, description_en, description_ar, is_milestone, sort_order) values
('2003', 'Le début de tout', 'The beginning of everything', 'بداية كل شيء', 'Autodidacte passionné, Mohamed découvre le monde du design et de la création visuelle dès l''âge de 6 ans.', 'A passionate self-taught learner, Mohamed discovers design and visual creation at 6 years old.', 'متعلم شغوف ذاتياً، محمد يكتشف عالم التصميم والإبداع البصري في سن السادسة.', true, 1),
('2014', 'Premier pas professionnel', 'First professional step', 'الخطوة المهنية الأولى', 'Début de carrière professionnelle dans le design graphique et la direction artistique.', 'Career start in graphic design and art direction.', 'بداية المسيرة المهنية في التصميم الجرافيكي والإخراج الفني.', false, 2),
('2015', 'Baccalauréat', 'High School Diploma', 'شهادة البكالوريا', 'Obtention du baccalauréat, une étape fondamentale dans le parcours académique.', 'Obtained the high school diploma, a fundamental milestone.', 'الحصول على شهادة البكالوريا.', false, 3),
('2015-2017', 'Études de Droit', 'Law Studies', 'دراسات القانون', 'Deux années d''études de droit qui, bien que formatrices, ne correspondaient pas à sa vocation créative.', 'Two years of law studies that, while formative, did not match his creative calling.', 'سنتان من دراسة القانون لم تتوافق مع شغفه الإبداعي.', false, 4),
('2017-2021', '1337 / École 42', '1337 / School 42', '1337 / مدرسة 42', 'Formation intensive en programmation à l''école 1337 (réseau 42) à Benguerir et Khouribga — une révolution.', 'Intensive programming training at 1337 school (42 network) — a revolution.', 'تدريب مكثف في البرمجة بمدرسة 1337 (شبكة 42).', true, 5),
('2018-2023', 'Formations Prestigieuses', 'Prestigious Training', 'تدريبات مرموقة', 'Certifications de Harvard, Coursera, Google, Amazon, Microsoft, IBM, Oracle et Adobe.', 'Certifications from Harvard, Coursera, Google, Amazon, Microsoft, IBM, Oracle, and Adobe.', 'شهادات من هارفارد وكورسيرا وجوجل وأمازون ومايكروسوفت و IBM وأوراكل وأدوبي.', true, 6),
('2021', 'Freelance & Indépendance', 'Freelance & Independence', 'عمل حر واستقلالية', 'Lancement en freelance, combinant design, développement et production vidéo pour des clients variés.', 'Freelance launch, combining design, development, and video production.', 'انطلاق العمل الحر، الجمع بين التصميم والتطوير والإنتاج.', false, 7),
('2023-Auj.', 'Création & Expansion', 'Creation & Expansion', 'إبداع وتوسع', 'Expansion des activités : direction artistique, scénographie, production audiovisuelle et développement web avancé.', 'Expanding activities: art direction, scenography, audiovisual production, and advanced web development.', 'توسيع الأنشطة: الإخراج الفني، السينوغرافيا، الإنتاج السمعي البصري.', true, 8);

-- 3. SPECIALIZATIONS
create table if not exists about_specializations (
  id uuid primary key default gen_random_uuid(),
  title_fr text not null,
  title_en text default '',
  title_ar text default '',
  color text default '#c9a45c',
  icon text default 'palette',
  items jsonb default '[]'::jsonb,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table about_specializations enable row level security;
create policy "public read about_specializations" on about_specializations for select using (true);
create policy "public write about_specializations" on about_specializations for all using (true) with check (true);

insert into about_specializations (title_fr, title_en, title_ar, color, icon, items, sort_order) values
('Photographie', 'Photography', 'التصوير الفوتوغرافي', '#e74c3c', 'camera', '["Portraits","Produits","Architecture","Événementiel","Mode","Culinaire"]', 1),
('Design Graphique', 'Graphic Design', 'التصميم الجرافيكي', '#c9a45c', 'palette', '["Identité Visuelle","Logo Design","UI/UX Design","Packaging","Motion Graphics","Broadcast Design","Film Graphic Design","Editorial Design","Typographie","Signalétique","Illustration","Infographie","Social Media Design","Brand Guidelines","Publicité Print","Webdesign"]', 2),
('Vidéo & Motion', 'Video & Motion', 'الفيديو والموشن', '#3498db', 'film', '["Films Publicitaires","Motion Design","Montage Vidéo","Étalonnage","VFX","Animation 2D/3D"]', 3),
('Ingénierie Sonore', 'Sound Engineering', 'هندسة الصوت', '#9b59b6', 'music', '["Mixage","Mastering","Sound Design","Enregistrement","Podcast","Production Musicale"]', 4),
('Scénographie', 'Scenography', 'السينوغرافيا', '#1abc9c', 'layout', '["Événements","Expositions","Stands","Vitrines","Espaces Commerciaux","Décors TV","Installations","Muséographie"]', 5),
('Développement & IT', 'Development & IT', 'التطوير والتكنولوجيا', '#f39c12', 'code', '["React/Next.js","TypeScript","Node.js","Python","Supabase/PostgreSQL","Three.js/WebGL","GSAP","Docker","Git/CI-CD","APIs REST/GraphQL","Cloud AWS/GCP"]', 6);

-- 4. EDUCATION
create table if not exists about_education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  title_fr text not null,
  title_en text default '',
  title_ar text default '',
  type text default 'online' check (type in ('university', 'online', 'bootcamp', 'professional')),
  year_start text default '',
  year_end text default '',
  logo_url text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table about_education enable row level security;
create policy "public read about_education" on about_education for select using (true);
create policy "public write about_education" on about_education for all using (true) with check (true);

insert into about_education (institution, title_fr, title_en, title_ar, type, year_start, year_end, sort_order) values
('Harvard University', 'Certificats en informatique et sciences', 'Computer Science & Sciences Certificates', 'شهادات في علوم الحاسوب', 'university', '2020', '2021', 1),
('University of Maryland', 'Certifications spécialisées', 'Specialized Certifications', 'شهادات متخصصة', 'university', '2020', '2021', 2),
('Coursera', 'Multiples certifications professionnelles', 'Multiple Professional Certifications', 'شهادات مهنية متعددة', 'online', '2019', '2023', 3),
('Udemy', 'Formations techniques avancées', 'Advanced Technical Training', 'تدريبات تقنية متقدمة', 'online', '2018', '2023', 4),
('Google', 'Certifications Google (UX, Analytics, Ads)', 'Google Certifications (UX, Analytics, Ads)', 'شهادات جوجل', 'professional', '2020', '2022', 5),
('Amazon (AWS)', 'Certifications Cloud AWS', 'AWS Cloud Certifications', 'شهادات أمازون السحابية', 'professional', '2021', '2022', 6),
('Microsoft', 'Certifications Azure & Microsoft 365', 'Azure & Microsoft 365 Certifications', 'شهادات مايكروسوفت', 'professional', '2021', '2023', 7),
('IBM', 'Data Science & AI certifications', 'Data Science & AI Certifications', 'شهادات علوم البيانات والذكاء الاصطناعي', 'professional', '2020', '2022', 8),
('Oracle', 'Certifications Database & Java', 'Database & Java Certifications', 'شهادات أوراكل', 'professional', '2021', '2022', 9),
('Adobe', 'Adobe Certified Expert (Photoshop, Illustrator, Premiere)', 'Adobe Certified Expert', 'خبير أدوبي معتمد', 'professional', '2019', '2023', 10),
('1337 / École 42', 'Formation intensive en programmation (réseau 42)', 'Intensive Programming (42 network)', 'تدريب مكثف في البرمجة (شبكة 42)', 'bootcamp', '2017', '2021', 11);

-- 5. STATS V3
create table if not exists about_stats_v3 (
  id uuid primary key default gen_random_uuid(),
  value int not null,
  suffix text default '+',
  label_fr text not null,
  label_en text default '',
  label_ar text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table about_stats_v3 enable row level security;
create policy "public read about_stats_v3" on about_stats_v3 for select using (true);
create policy "public write about_stats_v3" on about_stats_v3 for all using (true) with check (true);

insert into about_stats_v3 (value, suffix, label_fr, label_en, label_ar, sort_order) values
(20, '+', 'Années d''expérience', 'Years of experience', 'سنة خبرة', 1),
(30, '+', 'Spécialisations', 'Specializations', 'تخصص', 2),
(50, '+', 'Formations & certifications', 'Trainings & certifications', 'تدريب وشهادة', 3),
(10, '+', 'Institutions prestigieuses', 'Prestigious institutions', 'مؤسسة مرموقة', 4),
(150, '+', 'Projets réalisés', 'Projects completed', 'مشروع منجز', 5),
(6, '', 'Ans au premier contact créatif', 'Years old at first creative contact', 'سنوات عند أول تجربة إبداعية', 6);

-- 6. TESTIMONIALS V3
create table if not exists about_testimonials_v3 (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  role_fr text default '',
  role_en text default '',
  role_ar text default '',
  company text default '',
  quote_fr text not null,
  quote_en text default '',
  quote_ar text default '',
  avatar_url text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table about_testimonials_v3 enable row level security;
create policy "public read about_testimonials_v3" on about_testimonials_v3 for select using (true);
create policy "public write about_testimonials_v3" on about_testimonials_v3 for all using (true) with check (true);

insert into about_testimonials_v3 (author, role_fr, role_en, role_ar, company, quote_fr, quote_en, quote_ar, sort_order) values
('Karim Alami', 'Directeur Marketing', 'Marketing Director', 'مدير التسويق', 'Maroc Telecom', 'Mohamed est un créatif exceptionnel. Sa capacité à transformer une idée abstraite en une expérience visuelle inoubliable est tout simplement remarquable.', 'Mohamed is an exceptional creative. His ability to transform abstract ideas into unforgettable visual experiences is remarkable.', 'محمد مبدع استثنائي. قدرته على تحويل الأفكار المجردة إلى تجارب بصرية لا تُنسى رائعة.', 1),
('Sofia Bennani', 'CEO', 'CEO', 'الرئيسة التنفيذية', 'Studio Créatif Atlas', 'Travailler avec Mohamed a été une révélation. Son attention aux détails et sa vision artistique sont inégalées dans l''industrie.', 'Working with Mohamed was a revelation. His attention to detail and artistic vision are unmatched.', 'العمل مع محمد كان اكتشافاً. اهتمامه بالتفاصيل ورؤيته الفنية لا مثيل لهما.', 2),
('Youssef El Idrissi', 'Producteur Exécutif', 'Executive Producer', 'المنتج التنفيذي', 'MediaPro Casablanca', 'La polyvalence de Mohamed est impressionnante — du design graphique à la production vidéo, il excelle dans chaque domaine avec la même passion.', 'Mohamed''s versatility is impressive — from graphic design to video production, he excels in every domain.', 'تعدد مواهب محمد مثير للإعجاب — من التصميم إلى الإنتاج، يتفوق في كل مجال.', 3);
