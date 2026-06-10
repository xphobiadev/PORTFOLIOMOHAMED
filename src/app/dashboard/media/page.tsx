import { DashboardShell, DashboardSidebar } from "@/components/admin/dashboard-shell";
import { getMedia } from "@/lib/actions/media";
import MediaGallery from "./client";

export default async function MediaPage() {
    let media = [];
    try {
        media = await getMedia();
    } catch (err) {
        console.error("Failed to fetch media. Run migration first.", err);
    }

    return (
        <DashboardShell sidebar={<DashboardSidebar />}>
            <div className="p-5 lg:p-8">
                <MediaGallery media={media} />
            </div>
        </DashboardShell>
    );
}
