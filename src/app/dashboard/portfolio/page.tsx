import { DashboardShell, DashboardSidebar } from "@/components/admin/dashboard-shell";
import { getPortfolioItems } from "@/lib/actions/portfolio";
import PortfolioClient from "./client";

export default async function PortfolioPage() {
    let data = [];
    try {
        data = await getPortfolioItems();
    } catch (err) {
        console.error("Failed to fetch portfolio. Run migration first.", err);
    }

    return (
        <DashboardShell sidebar={<DashboardSidebar />}>
            <div className="p-5 lg:p-8">
                <PortfolioClient data={data} />
            </div>
        </DashboardShell>
    );
}
