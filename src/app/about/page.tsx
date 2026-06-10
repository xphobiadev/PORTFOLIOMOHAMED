import { UltraProAboutPage } from "@/components/about/UltraProAboutPage";
import {
  getAboutHeroV3, getAboutTimeline, getAboutSpecializations,
  getAboutEducation, getAboutStatsV3, getAboutTestimonialsV3
} from "@/lib/services/about.v3.service";
import { headers } from "next/headers";
import type { Locale } from "@/types/i18n";
import { getAboutUiCopy } from "@/lib/i18n/about-ui";
import {
  localizeAboutHero,
  localizeTimelineItem,
  localizeSpecialization,
  localizeEducationRow,
  localizeStatV3,
  localizeTestimonialV3
} from "@/lib/i18n/about-page-data";
import type {
  AboutHeroV3,
  AboutTimelineItem,
  AboutSpecialization,
  AboutEducation,
  AboutStatV3,
  AboutTestimonialV3
} from "@/types/about.v3";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const reqHeaders = await headers();
  const locale = (reqHeaders.get("x-locale") || "fr") as Locale;

  let hero: AboutHeroV3 | null = null;
  let timeline: unknown[] = [];
  let specializations: unknown[] = [];
  let education: unknown[] = [];
  let stats: unknown[] = [];
  let testimonials: unknown[] = [];

  try {
    [hero, timeline, specializations, education, stats, testimonials] = await Promise.all([
      getAboutHeroV3(),
      getAboutTimeline(),
      getAboutSpecializations(),
      getAboutEducation(),
      getAboutStatsV3(),
      getAboutTestimonialsV3()
    ]);
  } catch (err) {
    console.error("Error fetching about v3 data:", err);
  }

  if (!hero) {
    hero = {
      id: "",
      title_1_fr: "MOHAMED", title_1_en: "MOHAMED", title_1_ar: "",
      title_2_fr: "BOULIANI", title_2_en: "BOULIANI", title_2_ar: "",
      subtitle_fr: "Directeur créatif", subtitle_en: "Creative Director", subtitle_ar: "",
      tagline_fr: "Créer des expériences uniques.", tagline_en: "Creating unique experiences.", tagline_ar: "",
      badge_text_fr: "20+ ans", badge_text_en: "20+ yrs", badge_text_ar: "",
      cta_text_fr: "Découvrir", cta_text_en: "Discover", cta_text_ar: "",
      cta_url: "#timeline", portrait_url: ""
    };
  }

  const heroLocalized = localizeAboutHero(hero, locale)!;
  const timelineLocalized = (timeline as AboutTimelineItem[]).map((t) => localizeTimelineItem(t, locale));
  const specsLocalized = (specializations as AboutSpecialization[]).map((s) => localizeSpecialization(s, locale));
  const educationLocalized = (education as AboutEducation[]).map((e) =>
    localizeEducationRow(e as AboutEducation & Record<string, unknown>, locale)
  );
  const statsLocalized = (stats as AboutStatV3[]).map((s) => localizeStatV3(s, locale));
  const testimonialsLocalized = (testimonials as AboutTestimonialV3[]).map((t) => localizeTestimonialV3(t, locale));

  const aboutUi = getAboutUiCopy(locale);

  return (
    <UltraProAboutPage
      locale={locale}
      aboutUi={aboutUi}
      hero={heroLocalized}
      timeline={timelineLocalized}
      specializations={specsLocalized}
      education={educationLocalized}
      stats={statsLocalized}
      testimonials={testimonialsLocalized}
    />
  );
}

