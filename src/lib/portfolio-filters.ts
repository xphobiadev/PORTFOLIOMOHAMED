const REMOVED_PROJECT_CATEGORY_KEYS = new Set([
  "video-production",
  "production-video",
  "motion-graphics",
  "motion-design",
]);

export function normalizePortfolioCategory(value: unknown) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isRemovedProjectCategory(value: unknown) {
  return REMOVED_PROJECT_CATEGORY_KEYS.has(normalizePortfolioCategory(value));
}

export function hasRemovedProjectCategory(row: Record<string, any> | null | undefined) {
  if (!row) return false;

  return [
    row.category,
    row.category_slug,
    row.category_fr,
    row.category_en,
    row.name,
    row.name_fr,
    row.name_en,
    row.title,
    row.title_fr,
    row.title_en,
    row.slug,
  ].some(isRemovedProjectCategory);
}
