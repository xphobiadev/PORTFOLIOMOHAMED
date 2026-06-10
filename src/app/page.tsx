import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import {
  getHomeHero,
  getHomeStats,
  getFeaturedProjects,
  getHomeCta,
  getHomeServicesContent,
  getHomeServices
} from "@/lib/actions/home";
import { getPortfolioItems } from "@/lib/actions/portfolio";
import { headers } from "next/headers";
import { localizeRow } from "@/lib/services/i18n.service";
import { Locale } from "@/types/i18n";
import { UltraHomeContent } from "@/components/site/ultra-home-content";
import { hasRemovedProjectCategory } from "@/lib/portfolio-filters";

export const dynamic = "force-dynamic";

function translateLegacyFrenchText(value: string | undefined) {
  if (!value) return value;

  const legacyFrenchMap: Record<string, string> = {
    "Director": "PORTFOLIO",
    "Based in": "DESIGN",
    "Morocco": "DIGITAL",
    "Passionate filmmaker crafting cinematic experiences.": "Identités visuelles, interfaces et expériences digitales construites avec précision.",
    "View Projects": "Voir les projets",
    "Contact": "Contact",
    "Let's": "CRÉONS",
    "Create": "QUELQUE CHOSE",
    "Together": "ENSEMBLE",
    "Start a project": "Démarrer un projet",
    "EXPERTISE": "EXPERTISE",
    "Creative": "Créatif",
    "Services we offer": "Services proposés",
  };

  return legacyFrenchMap[value] || value;
}

function translateLegacyHomeText(value: string | undefined, locale: Locale) {
  if (!value) return value;

  const professionalSubtitle =
    locale === "en"
      ? "Brand systems, interfaces, and digital experiences built with clarity and precision."
      : "Identités visuelles, interfaces et expériences digitales construites avec précision.";

  const legacyHomeMap: Record<string, string> = {
    "Director": "PORTFOLIO",
    "RÉALISATEUR": "PORTFOLIO",
    "CRÉATEUR VISUEL": "PORTFOLIO",
    "VISUAL CREATOR": "PORTFOLIO",
    "Based in": "DESIGN",
    "RÉCITS": "DESIGN",
    "STORIES": "DESIGN",
    "Morocco": "DIGITAL",
    "MAROC": "DIGITAL",
    "CINÉMATIQUES": "DIGITAL",
    "CINEMATIC": "DIGITAL",
    "Passionate filmmaker crafting cinematic experiences.": professionalSubtitle,
    "Réalisateur passionné créant des expériences cinématographiques.": professionalSubtitle,
    "Direction créative, image de marque, production visuelle et expériences digitales pour des projets ambitieux au Maroc et à l’international.": professionalSubtitle,
    "View Projects": locale === "en" ? "View works" : "Voir les projets",
  };

  return legacyHomeMap[value] || value;
}

export default async function HomePage() {
  const [
    hero,
    statsData,
    featuredData,
    cta,
    servicesContent,
    servicesData,
    portfolioItems
  ] = await Promise.all([
    getHomeHero(),
    getHomeStats(),
    getFeaturedProjects(),
    getHomeCta(),
    getHomeServicesContent(),
    getHomeServices(),
    getPortfolioItems()
  ]);

  const reqHeaders = await headers();
  const locale = (reqHeaders.get("x-locale") || "fr") as Locale;

  // Fallbacks
  const h = localizeRow(hero || {
    title_1_fr: "PORTFOLIO", title_2_fr: "DESIGN", title_3_fr: "DIGITAL",
    title_1_en: "PORTFOLIO", title_2_en: "DESIGN", title_3_en: "DIGITAL",
    subtitle_fr: "Identités visuelles, interfaces et expériences digitales construites avec précision.",
    subtitle_en: "Brand systems, interfaces, and digital experiences built with clarity and precision.",
    cta_primary_label_fr: "Voir les projets", cta_primary_label_en: "View works", cta_primary_url: "/works",
    cta_secondary_label_fr: "Contact", cta_secondary_label_en: "Contact", cta_secondary_url: "/contact"
  }, locale, ["title_1", "title_2", "title_3", "subtitle", "cta_primary_label", "cta_secondary_label"]);
  h.title_1 = translateLegacyHomeText(h.title_1, locale);
  h.title_2 = translateLegacyHomeText(h.title_2, locale);
  h.title_3 = translateLegacyHomeText(h.title_3, locale);
  h.subtitle = translateLegacyHomeText(h.subtitle, locale);
  h.cta_primary_label = translateLegacyHomeText(h.cta_primary_label, locale);
  if (locale === "fr") {
    h.cta_secondary_label = translateLegacyFrenchText(h.cta_secondary_label);
  }

  const c = localizeRow(cta || {
    title_1_fr: "CRÉONS", title_2_fr: "QUELQUE CHOSE", title_3_fr: "D'EXTRAORDINAIRE",
    title_1_en: "LET'S CREATE", title_2_en: "SOMETHING", title_3_en: "EXTRAORDINARY",
    cta_label_fr: "Démarrer un projet", cta_label_en: "Start a project", cta_url: "/contact"
  }, locale, ["title_1", "title_2", "title_3", "cta_label"]);
  if (locale === "fr") {
    c.title_1 = translateLegacyFrenchText(c.title_1);
    c.title_2 = translateLegacyFrenchText(c.title_2);
    c.title_3 = translateLegacyFrenchText(c.title_3);
    c.cta_label = translateLegacyFrenchText(c.cta_label);
  }

  const sc = localizeRow(servicesContent || {
    section_label_fr: "CE QUE JE FAIS", section_title_fr: "TRAVAILLONS ENSEMBLE", section_subtitle_fr: "Je transforme vos idées",
    section_label_en: "WHAT I DO", section_title_en: "LET'S WORK TOGETHER", section_subtitle_en: "I turn your ideas into reality"
  }, locale, ["section_label", "section_title", "section_subtitle"]);
  if (locale === "fr") {
    sc.section_label = translateLegacyFrenchText(sc.section_label);
    sc.section_title = translateLegacyFrenchText(sc.section_title);
    sc.section_subtitle = translateLegacyFrenchText(sc.section_subtitle);
  }

  // Filter visibility & localize
  const stats = (statsData || []).filter(s => s.is_visible).map(s => localizeRow(s, locale, ["label", "value"]));
  const services = (servicesData || [])
    .filter(s => s.is_visible && !hasRemovedProjectCategory(s))
    .map(s => localizeRow(s, locale, ["title"]));

  // Map featured projects
  const cleanPortfolioItems = (portfolioItems || []).filter((item: any) => !hasRemovedProjectCategory(item));
  const featured = (featuredData || []).map(f => {
    return cleanPortfolioItems?.find((p: any) => p.id === f.portfolio_id);
  }).filter(Boolean).map(p => localizeRow(p, locale, ["title", "excerpt", "category", "cover_url", "slug"]));
  const featuredProjects = featured.slice(0, 3);

  const ui = {
    selectedWorks: locale === "en" ? "SELECTED WORKS" : "TRAVAUX SÉLECTIONNÉS",
    selected: locale === "en" ? "SELECTED" : "PROJETS",
    productions: locale === "en" ? "WORKS" : "SÉLECTIONNÉS",
    viewFullIndex: locale === "en" ? "VIEW FULL INDEX" : "VOIR L'INDEX COMPLET",
    play: locale === "en" ? "PLAY" : "VOIR",
    featuredCase: locale === "en" ? "Featured case" : "Projet phare",
    discoverMore: locale === "en" ? "DISCOVER MORE" : "DÉCOUVRIR",
    heroMeta: locale === "en" ? "Brand / Web / Visual" : "Marque / Web / Visuel",
    liveReel: locale === "en" ? "LIVE INDEX" : "INDEX ACTIF",
    heroBase: locale === "en" ? "CASABLANCA / MOROCCO" : "CASABLANCA / MAROC",
    scroll: locale === "en" ? "SCROLL" : "DÉFILER",
    filmmaker: locale === "en" ? "DESIGN SYSTEMS" : "SYSTÈMES VISUELS",
    creativeDirection: locale === "en" ? "BRAND / WEB / VISUAL" : "MARQUE / WEB / VISUEL",
    initiateCollaboration: locale === "en" ? "INITIATE COLLABORATION" : "LANCER UNE COLLABORATION",
    startProject: locale === "en" ? "START PROJECT" : "DÉMARRER UN PROJET",
    directorsCut: locale === "en" ? "Creative Standard" : "Standard créatif",
    signatureTitle:
      locale === "en"
        ? "Strategic visuals built to look sharp, read clearly, and convert."
        : "Des visuels stratégiques, précis, lisibles et pensés pour convertir.",
    signatureFallback:
      locale === "en"
        ? "Every project is shaped with clear hierarchy, refined art direction, and a premium finish across screens."
        : "Chaque projet est construit avec une hiérarchie claire, une direction artistique soignée et une finition premium sur tous les écrans.",
    signatureBackground: locale === "en" ? "Point of View" : "Point de vue",
    trustSelectedClient: locale === "en" ? "Selected Client" : "Client sélectionné",
    trustProductionScope: locale === "en" ? "Core Focus" : "Positionnement",
    trustBase: locale === "en" ? "Base" : "Base",
    trustBaseValue: locale === "en" ? "Morocco" : "Maroc",
    defaultServices:
      locale === "en"
        ? ["Brand systems", "Digital experiences", "Photography", "Creative direction"]
        : ["Systèmes de marque", "Expériences digitales", "Photographie", "Direction créative"],
    featuredProjects: locale === "en" ? "FEATURED PROJECTS" : "PROJETS VEDETTES",
    noFeaturedProjects:
      locale === "en"
        ? "No featured projects selected yet"
        : "Aucun projet vedette sélectionné pour le moment",
  };

  return (
    <main className="relative overflow-hidden bg-mb-bg noise">
      <Header />
      <UltraHomeContent
        h={h}
        c={c}
        sc={sc}
        stats={stats}
        services={services}
        featuredProjects={featuredProjects}
        ui={ui}
        locale={locale}
      />
      <WhatsAppButton />
      <Footer />
      
      {/* Global Cinematic Elements */}
      <div className="pointer-events-none fixed inset-0 z-[-1]">
        <div className="absolute inset-0 grid-stroke opacity-[0.03]" />
      </div>
    </main>
  );
}
