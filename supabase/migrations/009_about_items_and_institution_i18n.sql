-- Per-locale JSON lists for specialization bullets + institution names (FR/EN/AR)

ALTER TABLE about_specializations
  ADD COLUMN IF NOT EXISTS items_en jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS items_ar jsonb NOT NULL DEFAULT '[]'::jsonb;

UPDATE about_specializations
SET items_en = items
WHERE jsonb_typeof(items_en) = 'array' AND jsonb_array_length(items_en) = 0;

UPDATE about_specializations
SET items_ar = items
WHERE jsonb_typeof(items_ar) = 'array' AND jsonb_array_length(items_ar) = 0;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'about_education' AND column_name = 'institution'
  ) THEN
    ALTER TABLE about_education ADD COLUMN IF NOT EXISTS institution_fr text;
    ALTER TABLE about_education ADD COLUMN IF NOT EXISTS institution_en text;
    ALTER TABLE about_education ADD COLUMN IF NOT EXISTS institution_ar text;

    UPDATE about_education SET institution_fr = institution WHERE institution_fr IS NULL;
    UPDATE about_education SET institution_en = institution WHERE institution_en IS NULL;
    UPDATE about_education SET institution_ar = institution WHERE institution_ar IS NULL;

    ALTER TABLE about_education DROP COLUMN institution;
  END IF;
END $$;
