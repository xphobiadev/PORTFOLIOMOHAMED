import { notFound } from "next/navigation";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { headers } from "next/headers";
import { localizeRow } from "@/lib/services/i18n.service";
import { Locale } from "@/types/i18n";
import { getProjectBySlug, getProjectMedia, getWorksCategories } from "@/lib/actions/works";
import { WorkDetailContent } from "@/components/site/work-detail-content";
import { hasRemovedProjectCategory, normalizePortfolioCategory } from "@/lib/portfolio-filters";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{ slug: string }>;
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

export default async function WorkDetailPage({ params }: Props) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project || hasRemovedProjectCategory(project)) return notFound();

    const [media, categories] = await Promise.all([
        getProjectMedia(project.id),
        getWorksCategories(),
    ]);

    const reqHeaders = await headers();
    const locale = (reqHeaders.get("x-locale") || "fr") as Locale;

    const p = localizeRow(project, locale, [
        "title",
        "excerpt",
        "description",
        "client_name",
    ]);
    const localizedCategories = (categories || [])
        .filter((category: any) => !hasRemovedProjectCategory(category))
        .map((category: any) => localizeRow(category, locale, ["name"]));
    const category = resolveProjectCategory(project.category, localizedCategories);
    p.category_slug = category?.slug || project.category;
    p.category = category?.name || project.category;

    const ui = {
        back: locale === "en" ? "BACK TO WORKS" : "RETOUR AUX RÉALISATIONS",
        client: locale === "en" ? "Client" : "Client",
        date: locale === "en" ? "Date" : "Date",
        category: locale === "en" ? "Category" : "Catégorie",
        gallery: locale === "en" ? "Gallery" : "Galerie",
        visitProject: locale === "en" ? "Visit Project" : "Voir le projet",
        audio: locale === "en" ? "Audio Tracks" : "Pistes Audio",
    };

    return (
        <main className="bg-mb-bg min-h-screen text-white">
            <Header />
            <WorkDetailContent 
                project={p} 
                media={media} 
                locale={locale} 
                ui={ui} 
            />
            <Footer />
        </main>
    );
}
