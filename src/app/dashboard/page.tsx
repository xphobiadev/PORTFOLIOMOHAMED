import {
  DashboardShell,
  DashboardSidebar
} from "@/components/admin/dashboard-shell";
import DashboardClient from "./client";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ data: stats }, { data: monthly }, { data: projects }] =
    await Promise.all([
      supabase.from("dashboard_stats").select("*").limit(1).single(),
      supabase.from("monthly_revenue").select("*"),
      supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true })
    ]);

  const stat = stats ?? {
    total_revenue: 128450,
    projects_completed: 150,
    total_clients: 50,
    open_projects: 12,
    satisfaction_rate: 98
  };

  return (
    <DashboardShell sidebar={<DashboardSidebar />}>
      <DashboardClient
        stat={stat}
        monthly={monthly ?? []}
        projects={projects ?? []}
      />
    </DashboardShell>
  );
}
