import { DashboardShell, DashboardSidebar } from "@/components/admin/dashboard-shell";

export default function PaymentsPage() {
    return (
        <DashboardShell sidebar={<DashboardSidebar />}>
            <div className="p-5 lg:p-8">
                <h1 className="font-display text-5xl font-bold">Payments</h1>
                <p className="mt-2 text-white/45">Track payments and transactions.</p>
            </div>
        </DashboardShell>
    );
}
