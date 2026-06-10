-- ============================================================
-- 012: FIX LEGACY ENGLISH CONTENT STORED IN *_fr COLUMNS
-- The original home/works seed data was created in English before
-- multilingual columns existed. After the schema migration renamed
-- those original columns to *_fr, some records kept English text in
-- the French columns. This migration repairs those legacy values.
-- ============================================================

UPDATE home_hero
SET
  title_1_fr = CASE WHEN title_1_fr = 'Director' THEN 'RÉALISATEUR' ELSE title_1_fr END,
  title_2_fr = CASE WHEN title_2_fr = 'Based in' THEN 'BASÉ AU' ELSE title_2_fr END,
  title_3_fr = CASE WHEN title_3_fr = 'Morocco' THEN 'MAROC' ELSE title_3_fr END,
  subtitle_fr = CASE
    WHEN subtitle_fr = 'Passionate filmmaker crafting cinematic experiences.'
      THEN 'Réalisateur passionné créant des expériences cinématographiques.'
    ELSE subtitle_fr
  END,
  cta_primary_label_fr = CASE WHEN cta_primary_label_fr = 'View Projects' THEN 'Voir les projets' ELSE cta_primary_label_fr END,
  cta_secondary_label_fr = CASE WHEN cta_secondary_label_fr = 'Contact' THEN 'Contact' ELSE cta_secondary_label_fr END;

UPDATE home_cta
SET
  title_1_fr = CASE WHEN title_1_fr = 'Let''s' THEN 'CRÉONS' ELSE title_1_fr END,
  title_2_fr = CASE WHEN title_2_fr = 'Create' THEN 'QUELQUE CHOSE' ELSE title_2_fr END,
  title_3_fr = CASE WHEN title_3_fr = 'Together' THEN 'ENSEMBLE' ELSE title_3_fr END,
  cta_label_fr = CASE WHEN cta_label_fr = 'Start a project' THEN 'Démarrer un projet' ELSE cta_label_fr END;

UPDATE home_services_content
SET
  section_label_fr = CASE WHEN section_label_fr = 'EXPERTISE' THEN 'EXPERTISE' ELSE section_label_fr END,
  section_title_fr = CASE WHEN section_title_fr = 'Creative' THEN 'Créatif' ELSE section_title_fr END,
  section_subtitle_fr = CASE WHEN section_subtitle_fr = 'Services we offer' THEN 'Services proposés' ELSE section_subtitle_fr END;

UPDATE works_hero
SET
  title_fr = CASE WHEN title_fr = 'MY WORKS' THEN 'MES PROJETS' ELSE title_fr END,
  subtitle_fr = CASE
    WHEN subtitle_fr = 'Passionate filmmaker crafting cinematic experiences.'
      THEN 'Réalisateur passionné créant des expériences cinématographiques.'
    ELSE subtitle_fr
  END;
