import { HomeDashboard } from "@/components/dashboard/home/HomeDashboard";
import {
    getHomeHero,
    getHomeStats,
    getFeaturedProjects,
    getHomeServicesContent,
    getHomeServices,
    getHomeCta
} from "@/lib/actions/home";
import { getPortfolioItems } from "@/lib/actions/portfolio";

export const dynamic = "force-dynamic";

export default async function HomeDashboardPage() {
    let hero = null, stats = [], featuredProjects = [], availablePortfolio = [], servicesContent = null, services = [], cta = null;

    try {
        [
            hero,
            stats,
            featuredProjects,
            availablePortfolio,
            servicesContent,
            services,
            cta
        ] = await Promise.all([
            getHomeHero(),
            getHomeStats(),
            getFeaturedProjects(),
            getPortfolioItems(),
            getHomeServicesContent(),
            getHomeServices(),
            getHomeCta()
        ]);
    } catch (err) {
        console.error("Home DB missing data.", err);
    }

    return (
        <div className="p-8">
            <div className="mb-10">
                <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-white mb-2">Home Page</h1>
                <p className="text-white/50">Manage the 5 primary sections of your landing page directly.</p>
            </div>

            <HomeDashboard
                hero={hero}
                stats={stats}
                featuredProjects={featuredProjects}
                availablePortfolio={availablePortfolio}
                servicesContent={servicesContent}
                services={services}
                cta={cta}
            />
        </div>
    );
}
