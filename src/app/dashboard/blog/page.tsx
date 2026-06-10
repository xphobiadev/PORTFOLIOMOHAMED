import { DashboardShell, DashboardSidebar } from "@/components/admin/dashboard-shell";

export default function BlogPage() {
    return (
        <DashboardShell sidebar={<DashboardSidebar />}>
            <div className="p-5 lg:p-8">
                <h1 className="font-display text-5xl font-bold">Blog</h1>
                <p className="mt-2 text-white/45">Create and manage blog posts.</p>
            </div>
        </DashboardShell>
    );
}
