"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { KpiCard } from "@/components/admin/kpi-card";
import { RevenueChart } from "@/components/admin/revenue-chart";
import { money } from "@/lib/utils";

const dashboardShortcuts = [
  { label: "Dashboard", href: "/dashboard", description: "Overview and studio metrics" },
  { label: "Home", href: "/dashboard/home", description: "Edit landing page content" },
  { label: "Works", href: "/dashboard/works", description: "Manage works page sections" },
  { label: "Projects", href: "/dashboard/projects", description: "Edit projects and portfolio entries" },
  { label: "Services", href: "/dashboard/services", description: "Manage services content" },
  { label: "About", href: "/dashboard/about", description: "Update about page content" },
  { label: "Testimonials", href: "/dashboard/testimonials", description: "Review social proof content" },
  { label: "Users", href: "/dashboard/users", description: "Manage user access" },
  { label: "Roles", href: "/dashboard/roles", description: "Configure permissions" },
  { label: "Settings", href: "/dashboard/settings", description: "Adjust platform settings" },
];

type Stat = {
  total_revenue: number;
  projects_completed: number;
  total_clients: number;
  open_projects: number;
  satisfaction_rate: number;
};

type RevenueItem = {
  month: string;
  revenue: number;
  expenses: number;
};

export default function DashboardClient({
  stat,
  monthly,
  projects,
}: {
  stat: Stat;
  monthly: RevenueItem[];
  projects: any[];
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    if (!normalizedQuery) return projects;

    return projects.filter((project) =>
      [project.title, project.client_name, project.category, project.status, project.slug]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery))
    );
  }, [projects, normalizedQuery]);

  const filteredShortcuts = useMemo(() => {
    if (!normalizedQuery) return dashboardShortcuts.slice(0, 4);

    return dashboardShortcuts.filter((item) =>
      [item.label, item.description].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [normalizedQuery]);

  const topProjects = filteredProjects.slice(0, 5);

  const recentActivity = useMemo(() => {
    const baseActivity = filteredProjects.slice(0, 5).map((project, index) => ({
      title: `${project.title || "Untitled project"} ${project.status === "published" ? "published" : "updated"}`,
      time: `${index + 1}h ago`,
    }));

    if (baseActivity.length > 0) return baseActivity;

    return [
      { title: "No matching activity found", time: "Try another search" },
    ];
  }, [filteredProjects]);

  return (
    <div className="p-5 lg:p-8">
      <div className="rounded-[32px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(200,162,74,0.10),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:p-8">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-mb-gold/20 bg-mb-gold/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-mb-gold">
              Studio Admin
            </div>
            <h1 className="font-display text-4xl font-bold leading-none sm:text-5xl xl:text-6xl">
              Dashboard
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/48">
              Clean overview of revenue, active work, and recent content activity across the studio.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/60">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">Updated today</span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">5 core metrics</span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                {filteredProjects.length} matching projects
              </span>
            </div>
          </div>

          <div className="w-full xl:max-w-md">
            <div className="flex items-center gap-3 rounded-[24px] border border-white/8 bg-black/20 px-5 py-4">
              <Search size={18} className="text-white/35" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white/78 outline-none placeholder:text-white/28"
                placeholder="Search pages, projects, or settings..."
              />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/32">Projects live</p>
                <p className="mt-2 text-2xl font-semibold">{filteredProjects.length}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/32">Monthly revenue</p>
                <p className="mt-2 text-2xl font-semibold">{money(stat.total_revenue)}</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/32">Client score</p>
                <p className="mt-2 text-2xl font-semibold">{stat.satisfaction_rate}%</p>
              </div>
            </div>

            <div className="mt-4 rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/32">Quick access</p>
              <div className="mt-3 space-y-2">
                {filteredShortcuts.length > 0 ? (
                  filteredShortcuts.slice(0, 4).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between rounded-2xl border border-white/6 bg-black/10 px-4 py-3 transition-colors hover:border-white/12 hover:bg-white/[0.03]"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-xs text-white/35">{item.description}</p>
                      </div>
                      <ArrowUpRight size={14} className="text-mb-gold" />
                    </Link>
                  ))
                ) : (
                  <div className="rounded-2xl border border-white/6 bg-black/10 px-4 py-3 text-sm text-white/40">
                    No matching dashboard sections found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <KpiCard label="TOTAL REVENUE" value={stat.total_revenue} delta="+12.5%" tone="green" />
          <KpiCard label="PROJECTS COMPLETED" value={stat.projects_completed} delta="+8.2%" tone="green" />
          <KpiCard label="TOTAL CLIENTS" value={stat.total_clients} delta="+15.3%" tone="green" />
          <KpiCard label="OPEN PROJECTS" value={stat.open_projects} delta="-4.7%" tone="red" />
          <KpiCard label="SATISFACTION RATE" value={`${stat.satisfaction_rate}%`} delta="+2.1%" tone="green" />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_1fr_.85fr]">
          <RevenueChart data={monthly ?? []} />

          <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold">Recent Projects</h3>
                <p className="text-sm text-white/40">Latest studio work in progress</p>
              </div>
              <Link href="/dashboard/projects" className="inline-flex items-center gap-2 text-sm text-mb-gold hover:text-white">
                View all <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {topProjects.length > 0 ? (
                topProjects.map((project) => (
                  <Link
                    key={project.id}
                    href="/dashboard/projects"
                    className="block rounded-2xl border border-white/6 bg-white/[0.02] p-4 transition-colors hover:border-white/12"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">{project.title}</p>
                        <p className="mt-1 text-sm text-white/38">{project.client_name || "Independent project"}</p>
                      </div>
                      <span className="rounded-full border border-mb-gold/20 bg-mb-gold/10 px-3 py-1 text-xs text-mb-gold">
                        {project.status || "draft"}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-white/38">Budget</span>
                      <span className="font-medium text-white">{money(project.budget ?? 0)}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-2xl border border-white/6 bg-white/[0.02] p-4 text-sm text-white/40">
                  No projects match the current search.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <h3 className="font-display text-2xl font-bold">Activity Feed</h3>
            <p className="mt-1 text-sm text-white/40">Recent actions across the platform</p>

            <div className="mt-6 space-y-4">
              {recentActivity.map((item) => (
                <div key={`${item.title}-${item.time}`} className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] p-4">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-mb-gold" />
                  <div>
                    <p className="text-sm">{item.title}</p>
                    <p className="mt-1 text-xs text-white/35">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/6 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/30">Studio pulse</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                <div>
                  <p className="text-2xl font-semibold">{stat.open_projects}</p>
                  <p className="text-sm text-white/38">Open projects</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">{stat.total_clients}</p>
                  <p className="text-sm text-white/38">Active clients</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">{stat.projects_completed}</p>
                  <p className="text-sm text-white/38">Completed jobs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
