"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/providers/LanguageProvider";

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: t("ACCUEIL", "HOME") },
    { href: "/works", label: t("RÉALISATIONS", "MY WORKS") },
    { href: "/about", label: t("À PROPOS", "ABOUT ME") },
    { href: "/contact", label: t("CONTACT", "CONTACT") }
  ];

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const panelFrom = "100%";

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-site pt-6">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 flex items-center justify-between gap-3 rounded-full px-5 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2">
            <span className="font-display text-2xl font-bold sm:text-3xl">MB</span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-mb-gold" />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex lg:gap-8">
            {links.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap text-xs tracking-[0.18em] transition lg:tracking-[0.22em] ${isActive ? "font-bold text-mb-gold" : "text-white/80 hover:text-mb-gold"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mx-1 hidden h-4 w-px bg-white/20 sm:block" />
            <LanguageSwitcher />
          </nav>

          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="site-mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              id="site-mobile-nav"
              role="dialog"
              aria-modal="true"
              initial={{ x: panelFrom }}
              animate={{ x: 0 }}
              exit={{ x: panelFrom }}
              transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 z-50 flex h-[100dvh] w-[min(100%,20rem)] flex-col border-l border-white/10 bg-[#0c0c0c] shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <span className="font-display text-lg font-bold tracking-wide">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {links.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-2xl px-4 py-4 text-sm font-medium tracking-[0.12em] transition ${isActive ? "bg-mb-gold/15 text-mb-gold" : "text-white/85 hover:bg-white/5"
                        }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
