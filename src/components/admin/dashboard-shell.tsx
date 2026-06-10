"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function DashboardShell({
  sidebar,
  children
}: {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    setMobileNav(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileNav) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileNav]);

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <div className="min-h-screen lg:grid lg:grid-cols-[292px_1fr]">
        {mobileNav ? (
          <button
            type="button"
            aria-label="Close navigation"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileNav(false)}
          />
        ) : null}

        <aside
          id="dashboard-sidebar"
          className={`fixed inset-y-0 left-0 z-50 w-[292px] border-r border-white/5 bg-[radial-gradient(circle_at_top,rgba(200,162,74,0.12),transparent_26%),linear-gradient(180deg,#101010,#090909)] transition-transform duration-300 ease-out lg:static lg:z-auto lg:translate-x-0 ${mobileNav ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
        >
          <div className="flex h-14 items-center justify-end border-b border-white/5 px-3 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10"
              onClick={() => setMobileNav(false)}
            >
              <X size={18} />
            </button>
          </div>
          {sidebar}
        </aside>

        <section className="min-w-0 lg:min-h-screen">
          <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/5 bg-[#090909]/95 px-4 py-3 backdrop-blur-md lg:hidden">
            <button
              type="button"
              aria-expanded={mobileNav}
              aria-controls="dashboard-sidebar"
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10"
              onClick={() => setMobileNav(true)}
            >
              <Menu size={18} />
            </button>
            <span className="font-display text-lg font-bold">Studio Admin</span>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}

const sidebarGroups = [
  {
    title: "Overview",
    links: [
      { label: "Dashboard", href: "/dashboard" },
    ]
  },
  {
    title: "Content",
    links: [
      { label: "Home", href: "/dashboard/home" },
      { label: "Works", href: "/dashboard/works" },
      { label: "Projects", href: "/dashboard/projects" },
      { label: "Services", href: "/dashboard/services" },
      { label: "About", href: "/dashboard/about" },
      { label: "Contact", href: "/dashboard/contact" },
      { label: "Testimonials", href: "/dashboard/testimonials" },
    ]
  },
  {
    title: "System",
    links: [
      { label: "Users", href: "/dashboard/users" },
      { label: "Roles", href: "/dashboard/roles" },
      { label: "Settings", href: "/dashboard/settings" },
    ]
  }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col p-5">
      <Link href="/" className="mb-8 rounded-[28px] border border-white/8 bg-white/[0.02] px-4 py-5">
        <div className="flex items-center gap-2">
          <span className="font-display text-4xl font-bold">MB</span>
          <span className="h-2 w-2 rounded-full bg-mb-gold" />
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/30">Studio dashboard</p>
        <p className="mt-1 max-w-[16rem] text-sm text-white/45">Manage pages, projects, and client-facing content.</p>
      </Link>

      <div className="space-y-7">
        {sidebarGroups.map((group) => (
          <div key={group.title}>
            <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white/28">
              {group.title}
            </p>
            <div className="space-y-1.5">
              {group.links.map(({ label, href }) => {
                const isActive =
                  href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-all ${isActive
                      ? "border border-mb-gold/25 bg-mb-gold/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                      : "border border-transparent text-white/58 hover:border-white/8 hover:bg-white/[0.03] hover:text-white"
                      }`}
                  >
                    <span>{label}</span>
                    <span className={`h-2 w-2 rounded-full transition-opacity ${isActive ? "bg-mb-gold opacity-100" : "bg-white/10 opacity-0"}`} />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto rounded-[26px] border border-white/8 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <p className="text-xs uppercase tracking-[0.22em] text-white/28">Account</p>
        <p className="mt-3 font-medium">Mohamed Bouliani</p>
        <p className="text-sm text-white/45">Super Admin</p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-sm text-mb-gold transition-colors hover:text-white"
        >
          View site <ExternalLink size={14} />
        </Link>
      </div>
    </div>
  );
}
