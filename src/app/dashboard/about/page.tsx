import { DashboardShell, DashboardSidebar } from "@/components/admin/dashboard-shell";
import { AboutDashboardV3 } from "@/components/dashboard/about/AboutDashboardV3";
import {
    getAboutHeroV3, getAboutStatsV3, getAboutTimeline,
    getAboutSpecializations, getAboutEducation, getAboutTestimonialsV3
} from "@/lib/services/about.v3.service";

export default async function AboutDashboardPage() {
    let hero = null, stats: any[] = [], timeline: any[] = [], specializations: any[] = [], education: any[] = [], testimonials: any[] = [];
    try {
        [hero, stats, timeline, specializations, education, testimonials] = await Promise.all([
            getAboutHeroV3(),
            getAboutStatsV3(),
            getAboutTimeline(),
            getAboutSpecializations(),
            getAboutEducation(),
            getAboutTestimonialsV3()
        ]);
    } catch (err) {
        console.error("About V3 DB missing data. Ensure migration 008 ran.", err);
    }

    return (
        <DashboardShell sidebar={<DashboardSidebar />}>
            <div className="p-5 lg:p-8">
                <AboutDashboardV3
                    hero={hero}
                    stats={stats}
                    timeline={timeline}
                    specializations={specializations}
                    education={education}
                    testimonials={testimonials}
                />
            </div>
        </DashboardShell>
    );
}

