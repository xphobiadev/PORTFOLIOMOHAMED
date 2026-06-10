import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WorksGallery } from "@/components/site/works-gallery";
import { headers } from "next/headers";
import { localizeRow } from "@/lib/services/i18n.service";
import { Locale } from "@/types/i18n";
import { WorksHero, WorksStatsStrip } from "@/components/site/works-hero";
import {
  getWorksHero,
  getWorksCategories,
  getAllProjects
} from "@/lib/actions/works";
import { hasRemovedProjectCategory, normalizePortfolioCategory } from "@/lib/portfolio-filters";

export const dynamic = "force-dynamic";

function translateLegacyWorksFrenchText(value: string | undefined) {
  if (!value) return value;

  const legacyFrenchMap: Record<string, string> = {
    "MY WORKS": "MES PROJETS",
    "Passionate filmmaker crafting cinematic experiences.": "Une sélection resserrée de projets en identité, design, web, photographie et concepts visuels.",
  };

  return legacyFrenchMap[value] || value;
}

function normalizeCategoryKey(value: string | undefined) {
  return normalizePortfolioCategory(value);
}

function resolveProjectCategory(categorySlug: string | undefined, categories: any[]) {
  const categoryKey = normalizeCategoryKey(categorySlug);

  return categories.find((category: any) => {
    return [
      category.slug,
      category.name,
      category.name_fr,
      category.name_en,
    ].some((value) => normalizeCategoryKey(value) === categoryKey);
  });
}

function isRniProject(project: Record<string, any>) {
  const searchableText = [
    project.title,
    project.title_fr,
    project.title_en,
    project.slug,
    project.client_name,
    project.client_name_fr,
    project.client_name_en,
    project.category,
    project.category_slug,
  ]
    .filter(Boolean)
    .join(" ");

  return /(^|[^a-z0-9])rni([^a-z0-9]|$)/i.test(searchableText);
}

export default async function WorksPage() {
  let hero = null, categories = [], projects = [];

  try {
    [hero, categories, projects] = await Promise.all([
      getWorksHero(),
      getWorksCategories(),
      getAllProjects()
    ]);
  } catch (err) {
    console.error("Works database error:", err);
  }

  const reqHeaders = await headers();
  const locale = (reqHeaders.get("x-locale") || "fr") as Locale;

  // Fallback defaults mapped
  const h = localizeRow(hero || {
    label_fr: "PORTFOLIO", label_en: "PORTFOLIO",
    title_fr: "MES PROJETS", title_en: "MY WORKS",
    subtitle_fr: "Découvrez un aperçu de mes réalisations.",
    subtitle_en: "Discover a selection of my work."
  }, locale, ["label", "title", "subtitle"]);
  if (locale === "fr") {
    h.title = translateLegacyWorksFrenchText(h.title);
    h.subtitle = translateLegacyWorksFrenchText(h.subtitle);
  }

  const cats = (categories?.filter(c => c.is_visible && !hasRemovedProjectCategory(c)) || [])
    .map(c => localizeRow(c, locale, ["name"]));

  // Only public published projects mapped
  const publicProjects = (projects || [])
    .filter(p => p.status === 'published' && !hasRemovedProjectCategory(p))
    .map(p => {
      const localizedProject = localizeRow(p, locale, ["title", "excerpt", "description", "client_name", "location"]);
      const category = resolveProjectCategory(p.category, cats);
      return {
        ...localizedProject,
        category_slug: category?.slug || p.category,
        category: category?.name || p.category,
      };
    })
    .map((project, index) => ({ project, index }))
    .sort((a, b) => {
      const aPriority = isRniProject(a.project) ? 0 : 1;
      const bPriority = isRniProject(b.project) ? 0 : 1;

      return aPriority - bPriority || a.index - b.index;
    })
    .map(({ project }) => project);

  const worksStats = [
    {
      label: locale === "en" ? "Published pieces" : "Pièces publiées",
      value: publicProjects.length.toString().padStart(2, "0"),
    },
    {
      label: locale === "en" ? "Priority client" : "Client prioritaire",
      value: publicProjects.some(isRniProject) ? "RNI" : "MB",
    },
    {
      label: locale === "en" ? "Disciplines" : "Disciplines",
      value: cats.length.toString().padStart(2, "0"),
    },
  ];

  // Split title if it contains multiple words to color the last word gold
  const fallbackTitle = h.title || "";
  const titleWords = fallbackTitle.split(" ");
  const lastWord = titleWords.length > 1 ? titleWords.pop() : "";

  return (
    <main className="relative min-h-screen overflow-hidden bg-mb-bg noise">
      <Header />

      <WorksHero 
        label={h.label}
        titleWords={titleWords}
        lastWord={lastWord}
        subtitle={h.subtitle}
      />

      <WorksStatsStrip stats={worksStats} />

      <section className="container-site relative z-10 py-14 lg:py-20">
        <div>
          <WorksGallery categories={cats} projects={publicProjects} locale={locale} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
