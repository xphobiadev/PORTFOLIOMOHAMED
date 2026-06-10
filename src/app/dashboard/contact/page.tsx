import { DashboardShell, DashboardSidebar } from "@/components/admin/dashboard-shell";
import { ContactDashboard } from "@/components/dashboard/contact/ContactDashboard";
import { getContactInfo } from "@/lib/services/contact.service";

export default async function ContactDashboardPage() {
    let data = null;
    try {
        data = await getContactInfo();
    } catch (err) {
        console.error("Failed to fetch contact info.", err);
    }

    return (
        <DashboardShell sidebar={<DashboardSidebar />}>
            <div className="p-5 lg:p-8">
                <ContactDashboard initialData={data} />
            </div>
        </DashboardShell>
    );
}
