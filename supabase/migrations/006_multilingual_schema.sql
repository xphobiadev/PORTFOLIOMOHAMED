-- 006_multilingual_schema.sql
-- Renames all text columns to _fr and injects _en and _ar for localization.

-- 1. works_hero
ALTER TABLE works_hero RENAME COLUMN label TO label_fr;
ALTER TABLE works_hero ADD COLUMN label_en text;
ALTER TABLE works_hero ADD COLUMN label_ar text;

ALTER TABLE works_hero RENAME COLUMN title TO title_fr;
ALTER TABLE works_hero ADD COLUMN title_en text;
ALTER TABLE works_hero ADD COLUMN title_ar text;

ALTER TABLE works_hero RENAME COLUMN subtitle TO subtitle_fr;
ALTER TABLE works_hero ADD COLUMN subtitle_en text;
ALTER TABLE works_hero ADD COLUMN subtitle_ar text;

-- 2. works_categories
ALTER TABLE works_categories RENAME COLUMN name TO name_fr;
ALTER TABLE works_categories ADD COLUMN name_en text;
ALTER TABLE works_categories ADD COLUMN name_ar text;

-- 3. projects
ALTER TABLE projects RENAME COLUMN title TO title_fr;
ALTER TABLE projects ADD COLUMN title_en text;
ALTER TABLE projects ADD COLUMN title_ar text;

ALTER TABLE projects RENAME COLUMN excerpt TO excerpt_fr;
ALTER TABLE projects ADD COLUMN excerpt_en text;
ALTER TABLE projects ADD COLUMN excerpt_ar text;

ALTER TABLE projects RENAME COLUMN description TO description_fr;
ALTER TABLE projects ADD COLUMN description_en text;
ALTER TABLE projects ADD COLUMN description_ar text;

ALTER TABLE projects RENAME COLUMN client_name TO client_name_fr;
ALTER TABLE projects ADD COLUMN client_name_en text;
ALTER TABLE projects ADD COLUMN client_name_ar text;

ALTER TABLE projects RENAME COLUMN location TO location_fr;
ALTER TABLE projects ADD COLUMN location_en text;
ALTER TABLE projects ADD COLUMN location_ar text;

-- 4. home_hero
ALTER TABLE home_hero RENAME COLUMN title_1 TO title_1_fr;
ALTER TABLE home_hero ADD COLUMN title_1_en text;
ALTER TABLE home_hero ADD COLUMN title_1_ar text;

ALTER TABLE home_hero RENAME COLUMN title_2 TO title_2_fr;
ALTER TABLE home_hero ADD COLUMN title_2_en text;
ALTER TABLE home_hero ADD COLUMN title_2_ar text;

ALTER TABLE home_hero RENAME COLUMN title_3 TO title_3_fr;
ALTER TABLE home_hero ADD COLUMN title_3_en text;
ALTER TABLE home_hero ADD COLUMN title_3_ar text;

ALTER TABLE home_hero RENAME COLUMN subtitle TO subtitle_fr;
ALTER TABLE home_hero ADD COLUMN subtitle_en text;
ALTER TABLE home_hero ADD COLUMN subtitle_ar text;

ALTER TABLE home_hero RENAME COLUMN cta_primary_label TO cta_primary_label_fr;
ALTER TABLE home_hero ADD COLUMN cta_primary_label_en text;
ALTER TABLE home_hero ADD COLUMN cta_primary_label_ar text;

ALTER TABLE home_hero RENAME COLUMN cta_secondary_label TO cta_secondary_label_fr;
ALTER TABLE home_hero ADD COLUMN cta_secondary_label_en text;
ALTER TABLE home_hero ADD COLUMN cta_secondary_label_ar text;

-- 5. home_stats
ALTER TABLE home_stats RENAME COLUMN label TO label_fr;
ALTER TABLE home_stats ADD COLUMN label_en text;
ALTER TABLE home_stats ADD COLUMN label_ar text;

ALTER TABLE home_stats RENAME COLUMN value TO value_fr;
ALTER TABLE home_stats ADD COLUMN value_en text;
ALTER TABLE home_stats ADD COLUMN value_ar text;

-- 6. home_cta
ALTER TABLE home_cta RENAME COLUMN title_1 TO title_1_fr;
ALTER TABLE home_cta ADD COLUMN title_1_en text;
ALTER TABLE home_cta ADD COLUMN title_1_ar text;

ALTER TABLE home_cta RENAME COLUMN title_2 TO title_2_fr;
ALTER TABLE home_cta ADD COLUMN title_2_en text;
ALTER TABLE home_cta ADD COLUMN title_2_ar text;

ALTER TABLE home_cta RENAME COLUMN title_3 TO title_3_fr;
ALTER TABLE home_cta ADD COLUMN title_3_en text;
ALTER TABLE home_cta ADD COLUMN title_3_ar text;

ALTER TABLE home_cta RENAME COLUMN cta_label TO cta_label_fr;
ALTER TABLE home_cta ADD COLUMN cta_label_en text;
ALTER TABLE home_cta ADD COLUMN cta_label_ar text;

-- 7. home_services_content
ALTER TABLE home_services_content RENAME COLUMN section_label TO section_label_fr;
ALTER TABLE home_services_content ADD COLUMN section_label_en text;
ALTER TABLE home_services_content ADD COLUMN section_label_ar text;

ALTER TABLE home_services_content RENAME COLUMN section_title TO section_title_fr;
ALTER TABLE home_services_content ADD COLUMN section_title_en text;
ALTER TABLE home_services_content ADD COLUMN section_title_ar text;

ALTER TABLE home_services_content RENAME COLUMN section_subtitle TO section_subtitle_fr;
ALTER TABLE home_services_content ADD COLUMN section_subtitle_en text;
ALTER TABLE home_services_content ADD COLUMN section_subtitle_ar text;

-- 8. home_services
ALTER TABLE home_services RENAME COLUMN title TO title_fr;
ALTER TABLE home_services ADD COLUMN title_en text;
ALTER TABLE home_services ADD COLUMN title_ar text;

-- 9. about_hero
ALTER TABLE about_hero RENAME COLUMN label TO label_fr;
ALTER TABLE about_hero ADD COLUMN label_en text;
ALTER TABLE about_hero ADD COLUMN label_ar text;

ALTER TABLE about_hero RENAME COLUMN title_1 TO title_1_fr;
ALTER TABLE about_hero ADD COLUMN title_1_en text;
ALTER TABLE about_hero ADD COLUMN title_1_ar text;

ALTER TABLE about_hero RENAME COLUMN title_2 TO title_2_fr;
ALTER TABLE about_hero ADD COLUMN title_2_en text;
ALTER TABLE about_hero ADD COLUMN title_2_ar text;

ALTER TABLE about_hero RENAME COLUMN subtitle TO subtitle_fr;
ALTER TABLE about_hero ADD COLUMN subtitle_en text;
ALTER TABLE about_hero ADD COLUMN subtitle_ar text;

-- 10. about_info
ALTER TABLE about_info RENAME COLUMN label TO label_fr;
ALTER TABLE about_info ADD COLUMN label_en text;
ALTER TABLE about_info ADD COLUMN label_ar text;

ALTER TABLE about_info RENAME COLUMN value TO value_fr;
ALTER TABLE about_info ADD COLUMN value_en text;
ALTER TABLE about_info ADD COLUMN value_ar text;

-- 11. about_stats
ALTER TABLE about_stats RENAME COLUMN label TO label_fr;
ALTER TABLE about_stats ADD COLUMN label_en text;
ALTER TABLE about_stats ADD COLUMN label_ar text;

ALTER TABLE about_stats RENAME COLUMN value TO value_fr;
ALTER TABLE about_stats ADD COLUMN value_en text;
ALTER TABLE about_stats ADD COLUMN value_ar text;

-- 12. about_skills
ALTER TABLE about_skills RENAME COLUMN name TO name_fr;
ALTER TABLE about_skills ADD COLUMN name_en text;
ALTER TABLE about_skills ADD COLUMN name_ar text;

-- 13. testimonials
ALTER TABLE testimonials RENAME COLUMN author TO author_fr;
ALTER TABLE testimonials ADD COLUMN author_en text;
ALTER TABLE testimonials ADD COLUMN author_ar text;

ALTER TABLE testimonials RENAME COLUMN role TO role_fr;
ALTER TABLE testimonials ADD COLUMN role_en text;
ALTER TABLE testimonials ADD COLUMN role_ar text;

ALTER TABLE testimonials RENAME COLUMN company TO company_fr;
ALTER TABLE testimonials ADD COLUMN company_en text;
ALTER TABLE testimonials ADD COLUMN company_ar text;

ALTER TABLE testimonials RENAME COLUMN content TO content_fr;
ALTER TABLE testimonials ADD COLUMN content_en text;
ALTER TABLE testimonials ADD COLUMN content_ar text;
