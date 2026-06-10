-- ============================================================
-- 011: PROJECTS & CATEGORIES TRILINGUAL SEED DATA
-- Add multilingual seed data for works_categories and projects
-- ============================================================

-- Add unique constraint on slug for works_categories if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'works_categories_slug_key'
  ) THEN
    ALTER TABLE works_categories ADD CONSTRAINT works_categories_slug_key UNIQUE (slug);
  END IF;
END $$;

-- ============================================================
-- WORKS CATEGORIES - Trilingual Seed Data
-- ============================================================
UPDATE works_categories SET
  name_en = CASE name_fr
    WHEN 'ALL' THEN 'ALL'
    WHEN 'DESIGN' THEN 'DESIGN'
    WHEN 'TECH' THEN 'TECH'
    WHEN 'PRODUCTION' THEN 'PRODUCTION'
    WHEN 'BRANDING' THEN 'BRANDING'
    WHEN 'EVENTS' THEN 'EVENTS'
    WHEN 'ENGINEERING' THEN 'ENGINEERING'
    ELSE name_fr
  END,
  name_ar = CASE name_fr
    WHEN 'ALL' THEN 'الكل'
    WHEN 'DESIGN' THEN 'التصميم'
    WHEN 'TECH' THEN 'التقنية'
    WHEN 'PRODUCTION' THEN 'الإنتاج'
    WHEN 'BRANDING' THEN 'الهوية'
    WHEN 'EVENTS' THEN 'الفعاليات'
    WHEN 'ENGINEERING' THEN 'الهندسة'
    ELSE name_fr
  END
WHERE name_en IS NULL OR name_en = '';

-- ============================================================
-- Insert additional categories if they don't exist
-- ============================================================
INSERT INTO works_categories (name_fr, name_en, name_ar, slug, sort_order) VALUES
  ('MUSIC', 'MUSIC', 'الموسيقى', 'music', 7),
  ('ARCHITECTURE', 'ARCHITECTURE', 'العمارة', 'architecture', 8),
  ('FASHION', 'FASHION', 'الأزياء', 'fashion', 9)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- PROJECTS - Trilingual Sample Data (Removed)
-- ============================================================

-- ============================================================
-- Verify counts
-- ============================================================
DO $$
BEGIN
  RAISE NOTICE 'Categories trilingual data update completed';
END $$;