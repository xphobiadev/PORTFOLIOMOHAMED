import { DashboardShell, DashboardSidebar } from "@/components/admin/dashboard-shell";
import { getProjects } from "@/lib/actions/projects";
import ProjectsClient from "./client";

export default async function ProjectsPage() {
    let data = [];
    try {
        data = await getProjects();
    } catch (err) {
        console.error("Failed to fetch projects. Run migration first.", err);
    }

    return (
        <DashboardShell sidebar={<DashboardSidebar />}>
            <div className="p-5 lg:p-8">
                <ProjectsClient data={data} />
            </div>
        </DashboardShell>
    );
}
