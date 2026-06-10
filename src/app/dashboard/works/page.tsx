import { WorksDashboard } from "@/components/dashboard/works/WorksDashboard";
import {
    getWorksHero,
    getWorksCategories,
    getAllProjects
} from "@/lib/actions/works";

export const dynamic = "force-dynamic";

export default async function WorksDashboardPage() {
    let hero = null, categories = [], projects = [];

    try {
        [hero, categories, projects] = await Promise.all([
            getWorksHero(),
            getWorksCategories(),
            getAllProjects()
        ]);
    } catch (err) {
        console.error("Works DB missing data.", err);
    }

    return (
        <div className="p-8">
            <div className="mb-10">
                <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-white mb-2">My Works Page</h1>
                <p className="text-white/50">Manage your portfolio headers, available filters, and the complete gallery of projects.</p>
            </div>

            <WorksDashboard
                hero={hero}
                categories={categories}
                projects={projects}
            />
        </div>
    );
}
