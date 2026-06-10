-- ============================================================
-- 015: REMOVE VIDEO PRODUCTION AND MOTION GRAPHICS PROJECTS
-- Keep the public portfolio focused on brand, design, web, photo,
-- audio, and visual concept work.
-- ============================================================

BEGIN;

DELETE FROM projects
WHERE category IN ('video-production', 'motion-graphics')
   OR lower(coalesce(category, '')) IN (
    'production vidéo',
    'production video',
    'video production',
    'motion graphics',
    'motion design'
  );

DELETE FROM works_categories
WHERE slug IN ('video-production', 'motion-graphics')
   OR lower(coalesce(name_fr, '')) IN ('production vidéo', 'motion graphics', 'motion design')
   OR lower(coalesce(name_en, '')) IN ('video production', 'motion graphics', 'motion design');

DELETE FROM home_featured_projects
USING portfolio
WHERE home_featured_projects.portfolio_id = portfolio.id
  AND (
    lower(coalesce(portfolio.category, '')) IN (
      'production vidéo',
      'production video',
      'video production',
      'motion graphics',
      'motion design'
    )
    OR lower(coalesce(portfolio.category_fr, '')) IN ('production vidéo', 'motion graphics', 'motion design')
    OR lower(coalesce(portfolio.category_en, '')) IN ('video production', 'motion graphics', 'motion design')
  );

DELETE FROM portfolio
WHERE lower(coalesce(category, '')) IN (
    'production vidéo',
    'production video',
    'video production',
    'motion graphics',
    'motion design'
  )
   OR lower(coalesce(category_fr, '')) IN ('production vidéo', 'motion graphics', 'motion design')
   OR lower(coalesce(category_en, '')) IN ('video production', 'motion graphics', 'motion design');

UPDATE home_services
SET is_visible = false
WHERE lower(coalesce(title_fr, '')) IN ('production vidéo', 'motion design')
   OR lower(coalesce(title_en, '')) IN ('video production', 'motion design', 'motion graphics');

UPDATE home_hero
SET
  title_1_fr = 'PORTFOLIO',
  title_1_en = 'PORTFOLIO',
  title_2_fr = 'DESIGN',
  title_2_en = 'DESIGN',
  title_3_fr = 'DIGITAL',
  title_3_en = 'DIGITAL',
  subtitle_fr = 'Identités visuelles, interfaces et expériences digitales construites avec précision.',
  subtitle_en = 'Brand systems, interfaces, and digital experiences built with clarity and precision.',
  cta_primary_label_fr = 'Voir les projets',
  cta_primary_label_en = 'View works',
  cta_primary_url = '/works',
  cta_secondary_label_fr = 'Contact',
  cta_secondary_label_en = 'Contact',
  cta_secondary_url = '/contact';

UPDATE works_hero
SET
  title_fr = 'MES PROJETS',
  title_en = 'MY WORKS',
  subtitle_fr = 'Une sélection resserrée de projets en identité, design, web, photographie et concepts visuels.',
  subtitle_en = 'A focused selection of brand, design, web, photography, and visual concept work.';

COMMIT;
