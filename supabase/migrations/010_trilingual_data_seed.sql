-- ============================================================
-- 010: TRILINGUAL DATA SEED
-- Populate English + Arabic translations for ALL tables
-- ============================================================

-- ============================================================
-- 1. HOME HERO
-- ============================================================
UPDATE home_hero SET
  title_1_en = 'Director',
  title_1_ar = 'مخرج',
  title_2_en = 'Based in',
  title_2_ar = 'مقيم في',
  title_3_en = 'Morocco',
  title_3_ar = 'المغرب',
  subtitle_en = 'Passionate filmmaker crafting cinematic experiences.',
  subtitle_ar = 'مخرج شغوف يصنع تجارب سينمائية.',
  cta_primary_label_en = 'View Projects',
  cta_primary_label_ar = 'عرض المشاريع',
  cta_secondary_label_en = 'Contact',
  cta_secondary_label_ar = 'تواصل'
WHERE title_1_en IS NULL OR title_1_en = '';

-- ============================================================
-- 2. HOME STATS
-- ============================================================
UPDATE home_stats SET
  label_en = CASE
    WHEN label_fr = 'Projets réalisés' THEN 'Projects Completed'
    WHEN label_fr = 'Clients satisfaits' THEN 'Satisfied Clients'
    WHEN label_fr = 'Années d''expérience' THEN 'Years of Experience'
    WHEN label_fr = 'Prix & distinctions' THEN 'Awards & Honors'
    ELSE label_fr
  END,
  label_ar = CASE
    WHEN label_fr = 'Projets réalisés' THEN 'مشاريع منجزة'
    WHEN label_fr = 'Clients satisfaits' THEN 'عملاء راضون'
    WHEN label_fr = 'Années d''expérience' THEN 'سنوات خبرة'
    WHEN label_fr = 'Prix & distinctions' THEN 'جوائز وتقديرات'
    ELSE label_fr
  END,
  value_en = value_fr,
  value_ar = value_fr
WHERE label_en IS NULL OR label_en = '';

-- ============================================================
-- 3. HOME CTA
-- ============================================================
UPDATE home_cta SET
  title_1_en = 'Let''s',
  title_1_ar = 'هيا',
  title_2_en = 'Create',
  title_2_ar = 'نبدع',
  title_3_en = 'Together',
  title_3_ar = 'معاً',
  cta_label_en = 'Start a project',
  cta_label_ar = 'ابدأ مشروعاً'
WHERE title_1_en IS NULL OR title_1_en = '';

-- ============================================================
-- 4. HOME SERVICES CONTENT
-- ============================================================
UPDATE home_services_content SET
  section_label_en = 'EXPERTISE',
  section_label_ar = 'الخبرات',
  section_title_en = 'Creative',
  section_title_ar = 'خدمات',
  section_subtitle_en = 'Services we offer',
  section_subtitle_ar = 'الخدمات التي نقدمها'
WHERE section_label_en IS NULL OR section_label_en = '';

-- ============================================================
-- 5. HOME SERVICES
-- ============================================================
UPDATE home_services SET
  title_en = CASE
    WHEN title_fr = 'Direction Artistique' THEN 'Art Direction'
    WHEN title_fr = 'Design Graphique' THEN 'Graphic Design'
    WHEN title_fr = 'Production Vidéo' THEN 'Video Production'
    WHEN title_fr = 'Développement Web' THEN 'Web Development'
    WHEN title_fr = 'Scénographie' THEN 'Scenography'
    WHEN title_fr = 'Ingénierie Sonore' THEN 'Sound Engineering'
    WHEN title_fr = 'Motion Design' THEN 'Motion Design'
    WHEN title_fr = 'Photographie' THEN 'Photography'
    WHEN title_fr = 'Branding' THEN 'Branding'
    WHEN title_fr = 'UI/UX Design' THEN 'UI/UX Design'
    ELSE title_fr
  END,
  title_ar = CASE
    WHEN title_fr = 'Direction Artistique' THEN 'الإخراج الفني'
    WHEN title_fr = 'Design Graphique' THEN 'التصميم الجرافيكي'
    WHEN title_fr = 'Production Vidéo' THEN 'إنتاج الفيديو'
    WHEN title_fr = 'Développement Web' THEN 'تطوير المواقع'
    WHEN title_fr = 'Scénographie' THEN 'السينوغرافيا'
    WHEN title_fr = 'Ingénierie Sonore' THEN 'هندسة الصوت'
    WHEN title_fr = 'Motion Design' THEN 'موشن ديزاين'
    WHEN title_fr = 'Photographie' THEN 'التصوير الفوتوغرافي'
    WHEN title_fr = 'Branding' THEN 'الهوية البصرية'
    WHEN title_fr = 'UI/UX Design' THEN 'تصميم واجهات المستخدم'
    ELSE title_fr
  END
WHERE title_en IS NULL OR title_en = '';

-- ============================================================
-- 6. WORKS HERO
-- ============================================================
UPDATE works_hero SET
  label_en = 'PORTFOLIO',
  label_ar = 'أعمالي',
  title_en = 'MY WORKS',
  title_ar = 'أعمالي',
  subtitle_en = 'Passionate filmmaker crafting cinematic experiences.',
  subtitle_ar = 'مخرج شغوف يصنع تجارب سينمائية.'
WHERE label_en IS NULL OR label_en = '';

-- ============================================================
-- 7. WORKS CATEGORIES
-- ============================================================
UPDATE works_categories SET
  name_en = CASE
    WHEN name_fr = 'ALL' THEN 'ALL'
    WHEN name_fr = 'TOUS' THEN 'ALL'
    WHEN name_fr = 'DESIGN' THEN 'DESIGN'
    WHEN name_fr = 'TECH' THEN 'TECH'
    WHEN name_fr = 'PRODUCTION' THEN 'PRODUCTION'
    WHEN name_fr = 'BRANDING' THEN 'BRANDING'
    WHEN name_fr = 'EVENTS' THEN 'EVENTS'
    WHEN name_fr = 'ÉVÉNEMENTS' THEN 'EVENTS'
    WHEN name_fr = 'ENGINEERING' THEN 'ENGINEERING'
    WHEN name_fr = 'INGÉNIERIE' THEN 'ENGINEERING'
    ELSE name_fr
  END,
  name_ar = CASE
    WHEN name_fr = 'ALL' THEN 'الكل'
    WHEN name_fr = 'TOUS' THEN 'الكل'
    WHEN name_fr = 'DESIGN' THEN 'التصميم'
    WHEN name_fr = 'TECH' THEN 'التقنية'
    WHEN name_fr = 'PRODUCTION' THEN 'الإنتاج'
    WHEN name_fr = 'BRANDING' THEN 'العلامة التجارية'
    WHEN name_fr = 'EVENTS' THEN 'الفعاليات'
    WHEN name_fr = 'ÉVÉNEMENTS' THEN 'الفعاليات'
    WHEN name_fr = 'ENGINEERING' THEN 'الهندسة'
    WHEN name_fr = 'INGÉNIERIE' THEN 'الهندسة'
    ELSE name_fr
  END
WHERE name_en IS NULL OR name_en = '';

-- =Section 8 & 14 Removed (Project seeds)= --

-- ============================================================
-- 9. ABOUT HERO (legacy v1)
-- ============================================================
UPDATE about_hero SET
  label_en = 'ABOUT ME',
  label_ar = 'من أنا',
  title_1_en = 'CREATOR',
  title_1_ar = 'مبدع',
  title_2_en = 'OF VISIONS',
  title_2_ar = 'الرؤى',
  subtitle_en = 'I transform ideas into unforgettable visual, sonic, and digital experiences.',
  subtitle_ar = 'أحوّل الأفكار إلى تجارب بصرية وصوتية ورقمية لا تُنسى.'
WHERE label_en IS NULL OR label_en = '';

-- ============================================================
-- 10. ABOUT INFO
-- ============================================================
UPDATE about_info SET
  label_en = CASE
    WHEN label_fr = 'Nom' THEN 'Name'
    WHEN label_fr = 'Âge' THEN 'Age'
    WHEN label_fr = 'Localisation' THEN 'Location'
    WHEN label_fr = 'Email' THEN 'Email'
    WHEN label_fr = 'Téléphone' THEN 'Phone'
    WHEN label_fr = 'Disponibilité' THEN 'Availability'
    WHEN label_fr = 'Langues' THEN 'Languages'
    WHEN label_fr = 'Expérience' THEN 'Experience'
    ELSE label_fr
  END,
  label_ar = CASE
    WHEN label_fr = 'Nom' THEN 'الاسم'
    WHEN label_fr = 'Âge' THEN 'العمر'
    WHEN label_fr = 'Localisation' THEN 'الموقع'
    WHEN label_fr = 'Email' THEN 'البريد الإلكتروني'
    WHEN label_fr = 'Téléphone' THEN 'الهاتف'
    WHEN label_fr = 'Disponibilité' THEN 'التوفر'
    WHEN label_fr = 'Langues' THEN 'اللغات'
    WHEN label_fr = 'Expérience' THEN 'الخبرة'
    ELSE label_fr
  END,
  value_en = CASE
    WHEN label_fr = 'Nom' THEN 'Mohamed Bouliani'
    WHEN label_fr = 'Localisation' THEN 'Casablanca, Morocco'
    WHEN label_fr = 'Disponibilité' THEN 'Available'
    WHEN label_fr = 'Langues' THEN 'French, English, Arabic'
    WHEN label_fr = 'Expérience' THEN '20+ years'
    ELSE value_fr
  END,
  value_ar = CASE
    WHEN label_fr = 'Nom' THEN 'محمد بولياني'
    WHEN label_fr = 'Localisation' THEN 'الدار البيضاء، المغرب'
    WHEN label_fr = 'Disponibilité' THEN 'متاح'
    WHEN label_fr = 'Langues' THEN 'الفرنسية، الإنجليزية، العربية'
    WHEN label_fr = 'Expérience' THEN '+20 سنة'
    ELSE value_fr
  END
WHERE label_en IS NULL OR label_en = '';

-- ============================================================
-- 11. ABOUT STATS (legacy v1)
-- ============================================================
UPDATE about_stats SET
  label_en = CASE
    WHEN label_fr = 'Projets réalisés' THEN 'Projects Completed'
    WHEN label_fr = 'Clients satisfaits' THEN 'Satisfied Clients'
    WHEN label_fr = 'Années d''expérience' THEN 'Years of Experience'
    WHEN label_fr = 'Spécialisations' THEN 'Specializations'
    WHEN label_fr = 'Formations' THEN 'Trainings'
    WHEN label_fr = 'Institutions' THEN 'Institutions'
    ELSE label_fr
  END,
  label_ar = CASE
    WHEN label_fr = 'Projets réalisés' THEN 'مشاريع منجزة'
    WHEN label_fr = 'Clients satisfaits' THEN 'عملاء راضون'
    WHEN label_fr = 'Années d''expérience' THEN 'سنوات خبرة'
    WHEN label_fr = 'Spécialisations' THEN 'تخصصات'
    WHEN label_fr = 'Formations' THEN 'تدريبات'
    WHEN label_fr = 'Institutions' THEN 'مؤسسات'
    ELSE label_fr
  END,
  value_en = value_fr,
  value_ar = value_fr
WHERE label_en IS NULL OR label_en = '';

-- ============================================================
-- 12. ABOUT SKILLS
-- ============================================================
UPDATE about_skills SET
  name_en = CASE
    WHEN name_fr = 'Photographie' THEN 'Photography'
    WHEN name_fr = 'Design Graphique' THEN 'Graphic Design'
    WHEN name_fr = 'Direction Artistique' THEN 'Art Direction'
    WHEN name_fr = 'Vidéo & Motion' THEN 'Video & Motion'
    WHEN name_fr = 'Ingénierie Sonore' THEN 'Sound Engineering'
    WHEN name_fr = 'Scénographie' THEN 'Scenography'
    WHEN name_fr = 'Développement Web' THEN 'Web Development'
    WHEN name_fr = 'UI/UX Design' THEN 'UI/UX Design'
    WHEN name_fr = 'Motion Graphics' THEN 'Motion Graphics'
    WHEN name_fr = 'Montage Vidéo' THEN 'Video Editing'
    WHEN name_fr = 'Production Musicale' THEN 'Music Production'
    WHEN name_fr = 'Identité Visuelle' THEN 'Visual Identity'
    WHEN name_fr = 'Illustration' THEN 'Illustration'
    WHEN name_fr = 'Typographie' THEN 'Typography'
    ELSE name_fr
  END,
  name_ar = CASE
    WHEN name_fr = 'Photographie' THEN 'التصوير الفوتوغرافي'
    WHEN name_fr = 'Design Graphique' THEN 'التصميم الجرافيكي'
    WHEN name_fr = 'Direction Artistique' THEN 'الإخراج الفني'
    WHEN name_fr = 'Vidéo & Motion' THEN 'الفيديو والموشن'
    WHEN name_fr = 'Ingénierie Sonore' THEN 'هندسة الصوت'
    WHEN name_fr = 'Scénographie' THEN 'السينوغرافيا'
    WHEN name_fr = 'Développement Web' THEN 'تطوير المواقع'
    WHEN name_fr = 'UI/UX Design' THEN 'تصميم واجهات المستخدم'
    WHEN name_fr = 'Motion Graphics' THEN 'موشن جرافيكس'
    WHEN name_fr = 'Montage Vidéo' THEN 'مونتاج الفيديو'
    WHEN name_fr = 'Production Musicale' THEN 'إنتاج موسيقي'
    WHEN name_fr = 'Identité Visuelle' THEN 'الهوية البصرية'
    WHEN name_fr = 'Illustration' THEN 'رسم توضيحي'
    WHEN name_fr = 'Typographie' THEN 'خط ورسم حروف'
    ELSE name_fr
  END
WHERE name_en IS NULL OR name_en = '';

-- ============================================================
-- 13. TESTIMONIALS (legacy v1)
-- ============================================================
UPDATE testimonials SET
  author_en = author_fr,
  author_ar = author_fr,
  role_en = CASE
    WHEN role_fr = 'CEO' THEN 'CEO'
    WHEN role_fr = 'Marketing Director' THEN 'Marketing Director'
    WHEN role_fr = 'Directeur Marketing' THEN 'Marketing Director'
    WHEN role_fr = 'Founder' THEN 'Founder'
    WHEN role_fr = 'Fondateur' THEN 'Founder'
    ELSE role_fr
  END,
  role_ar = CASE
    WHEN role_fr = 'CEO' THEN 'الرئيس التنفيذي'
    WHEN role_fr = 'Marketing Director' THEN 'مدير التسويق'
    WHEN role_fr = 'Directeur Marketing' THEN 'مدير التسويق'
    WHEN role_fr = 'Founder' THEN 'المؤسس'
    WHEN role_fr = 'Fondateur' THEN 'المؤسس'
    ELSE role_fr
  END,
  company_en = company_fr,
  company_ar = company_fr,
  content_en = CASE
    WHEN content_fr LIKE 'Un créatif exceptionnel%' THEN 'An exceptional creative, capable of transforming an idea into an unforgettable experience.'
    WHEN content_fr LIKE 'Vision forte%' THEN 'Strong vision, premium execution, and excellent attention to detail.'
    WHEN content_fr LIKE 'Travail impeccable%' THEN 'Impeccable work, respect for deadlines, and quality delivery.'
    ELSE content_fr
  END,
  content_ar = CASE
    WHEN content_fr LIKE 'Un créatif exceptionnel%' THEN 'مبدع استثنائي، قادر على تحويل فكرة إلى تجربة لا تُنسى.'
    WHEN content_fr LIKE 'Vision forte%' THEN 'رؤية قوية، تنفيذ متميز، واهتمام ممتاز بالتفاصيل.'
    WHEN content_fr LIKE 'Travail impeccable%' THEN 'عمل متقن، احترام المواعيد، وجودة في التسليم.'
    ELSE content_fr
  END
WHERE content_en IS NULL OR content_en = '';

-- Section 14 (Simplified): Add i18n columns to portfolio
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS title_fr text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS title_ar text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS category_fr text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS category_en text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS category_ar text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS excerpt_fr text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS excerpt_en text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS excerpt_ar text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS description_fr text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS description_en text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS description_ar text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS client_name_fr text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS client_name_en text;
ALTER TABLE portfolio ADD COLUMN IF NOT EXISTS client_name_ar text;

-- ============================================================
-- 15. ABOUT SPECIALIZATIONS — Proper translated items
-- ============================================================
UPDATE about_specializations SET
  items_en = CASE
    WHEN title_fr = 'Photographie' THEN '["Portraits","Products","Architecture","Events","Fashion","Culinary"]'::jsonb
    WHEN title_fr = 'Design Graphique' THEN '["Visual Identity","Logo Design","UI/UX Design","Packaging","Motion Graphics","Broadcast Design","Film Graphic Design","Editorial Design","Typography","Signage","Illustration","Infographics","Social Media Design","Brand Guidelines","Print Advertising","Web Design"]'::jsonb
    WHEN title_fr LIKE 'Vidéo%' THEN '["Commercials","Motion Design","Video Editing","Color Grading","VFX","2D/3D Animation"]'::jsonb
    WHEN title_fr LIKE 'Ingénierie%' THEN '["Mixing","Mastering","Sound Design","Recording","Podcast","Music Production"]'::jsonb
    WHEN title_fr = 'Scénographie' THEN '["Events","Exhibitions","Booths","Window Displays","Commercial Spaces","TV Sets","Installations","Museum Design"]'::jsonb
    WHEN title_fr LIKE 'Développement%' THEN '["React/Next.js","TypeScript","Node.js","Python","Supabase/PostgreSQL","Three.js/WebGL","GSAP","Docker","Git/CI-CD","REST/GraphQL APIs","Cloud AWS/GCP"]'::jsonb
    ELSE items
  END,
  items_ar = CASE
    WHEN title_fr = 'Photographie' THEN '["بورتريه","منتجات","عمارة","فعاليات","أزياء","طعام"]'::jsonb
    WHEN title_fr = 'Design Graphique' THEN '["هوية بصرية","تصميم شعار","تصميم واجهات","تغليف","موشن جرافيكس","تصميم بث","تصميم أفلام","تصميم تحريري","خط عربي","لافتات","رسم توضيحي","إنفوجرافيك","تصميم سوشيال ميديا","دليل العلامة","إعلانات مطبوعة","تصميم مواقع"]'::jsonb
    WHEN title_fr LIKE 'Vidéo%' THEN '["إعلانات","موشن ديزاين","مونتاج فيديو","تدرج لوني","مؤثرات بصرية","رسوم متحركة ثنائية/ثلاثية الأبعاد"]'::jsonb
    WHEN title_fr LIKE 'Ingénierie%' THEN '["ميكساج","ماسترينج","تصميم صوتي","تسجيل","بودكاست","إنتاج موسيقي"]'::jsonb
    WHEN title_fr = 'Scénographie' THEN '["فعاليات","معارض","أجنحة","واجهات عرض","مساحات تجارية","ديكور تلفزيوني","تركيبات","تصميم متاحف"]'::jsonb
    WHEN title_fr LIKE 'Développement%' THEN '["React/Next.js","TypeScript","Node.js","Python","Supabase/PostgreSQL","Three.js/WebGL","GSAP","Docker","Git/CI-CD","REST/GraphQL APIs","Cloud AWS/GCP"]'::jsonb
    ELSE items
  END;

-- Also rename existing 'items' column to 'items_fr' if not already done
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'about_specializations' AND column_name = 'items'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'about_specializations' AND column_name = 'items_fr'
  ) THEN
    ALTER TABLE about_specializations RENAME COLUMN items TO items_fr;
  END IF;
END $$;

-- ============================================================
-- 16. ABOUT EDUCATION — Translate institution names
-- ============================================================
UPDATE about_education SET
  institution_ar = CASE
    WHEN institution_en = 'Harvard University' THEN 'جامعة هارفارد'
    WHEN institution_en = 'University of Maryland' THEN 'جامعة ماريلاند'
    WHEN institution_en = 'Coursera' THEN 'كورسيرا'
    WHEN institution_en = 'Udemy' THEN 'يوديمي'
    WHEN institution_en = 'Google' THEN 'جوجل'
    WHEN institution_en LIKE 'Amazon%' THEN 'أمازون (AWS)'
    WHEN institution_en = 'Microsoft' THEN 'مايكروسوفت'
    WHEN institution_en = 'IBM' THEN 'آي بي إم'
    WHEN institution_en = 'Oracle' THEN 'أوراكل'
    WHEN institution_en = 'Adobe' THEN 'أدوبي'
    WHEN institution_en LIKE '1337%' THEN '1337 / مدرسة 42'
    ELSE institution_en
  END
WHERE institution_ar = institution_en OR institution_ar IS NULL OR institution_ar = '';

-- ============================================================
-- DONE
-- ============================================================
