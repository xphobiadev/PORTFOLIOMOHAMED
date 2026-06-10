import { DashboardShell, DashboardSidebar } from "@/components/admin/dashboard-shell";

export default function OrdersPage() {
    return (
        <DashboardShell sidebar={<DashboardSidebar />}>
            <div className="p-5 lg:p-8">
                <h1 className="font-display text-5xl font-bold">Orders</h1>
                <p className="mt-2 text-white/45">View and manage orders.</p>
            </div>
        </DashboardShell>
    );
}
