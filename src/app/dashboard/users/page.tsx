import { DashboardShell, DashboardSidebar } from "@/components/admin/dashboard-shell";

export default function UsersPage() {
    return (
        <DashboardShell sidebar={<DashboardSidebar />}>
            <div className="p-5 lg:p-8">
                <h1 className="font-display text-5xl font-bold">Users</h1>
                <p className="mt-2 text-white/45">Manage user accounts.</p>
            </div>
        </DashboardShell>
    );
}
