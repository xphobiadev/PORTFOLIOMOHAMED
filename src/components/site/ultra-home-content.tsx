"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Eye, Globe2, Layers, Star, TimerReset } from "lucide-react";
import { UltraHomeHero } from "@/components/site/ultra-home-hero";
import { UltraFeaturedWorks } from "@/components/site/ultra-featured-works";
import { UltraProfessionalVision } from "@/components/site/ultra-professional-vision";
import { Locale } from "@/types/i18n";
import { getIcon } from "@/lib/icons";

interface UltraHomeContentProps {
  h: any;
  c: any;
  sc: any;
  stats: any[];
  services: any[];
  featuredProjects: any[];
  ui: any;
  locale: Locale;
}

export function UltraHomeContent({
  h,
  c,
  sc,
  stats,
  services,
  featuredProjects,
  ui,
  locale
}: UltraHomeContentProps) {
  return (
    <>
      <UltraHomeHero h={h} ui={ui} />

      <TrustStrip stats={stats} ui={ui} />

      <SignatureStatement h={h} services={services} ui={ui} />

      {/* Featured Projects */}
      <UltraFeaturedWorks projects={featuredProjects} ui={ui} />

      {/* Vision & Expertise */}
      <UltraProfessionalVision sc={sc} stats={stats} services={services} locale={locale} />

      {/* High-Impact CTA Section */}
      <section className="relative overflow-hidden py-24 lg:py-40 bg-black">
        {c.background_url && (
          c.background_url.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              src={c.background_url}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 z-0 h-full w-full object-cover opacity-30 grayscale contrast-125"
            />
          ) : (
            <img
              src={c.background_url}
              className="absolute inset-0 z-0 h-full w-full object-cover opacity-30 grayscale contrast-125"
              alt=""
            />
          )
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-mb-bg via-transparent to-mb-bg z-[1] pointer-events-none" />

        <div className="container-site relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-12 flex items-center justify-center gap-6">
                <span className="h-[1px] w-20 bg-mb-gold/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-mb-gold">{ui.initiateCollaboration}</span>
                <span className="h-[1px] w-20 bg-mb-gold/30" />
            </div>

            <h2 className="font-display text-[clamp(4rem,15vw,15rem)] font-bold leading-[0.8] tracking-[-0.04em] uppercase mb-20 text-white">
              {c.title_1 && <div className="text-white/10">{c.title_1}</div>}
              {c.title_2 && <div className="italic">{c.title_2}</div>}
              {c.title_3 && <div className="gold-text-shimmer">{c.title_3}</div>}
            </h2>

            <a 
                href={c.cta_url} 
                className="group relative inline-flex items-center gap-8 px-16 py-8 rounded-full bg-white text-black text-[11px] font-bold uppercase tracking-[0.5em] transition-all duration-500 hover:scale-110 hover:bg-mb-gold"
            >
              {c.cta_label || ui.startProject}
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10 group-hover:bg-white/20 transition-colors">
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          </motion.div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] bg-mb-gold/5 blur-[200px] rounded-full" />
            <div className="absolute inset-0 grid-stroke opacity-[0.05]" />
        </div>
      </section>
    </>
  );
}

function SignatureStatement({ h, services, ui }: { h: any; services: any[]; ui: any }) {
  const capabilities = (services || []).slice(0, 4);

  return (
    <section className="relative overflow-hidden border-b border-white/8 bg-[#080808] py-20 lg:py-28">
      <div className="container-site relative z-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-8 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.38em] text-mb-gold">
              <span className="h-[1px] w-10 bg-mb-gold/50" />
              {ui.directorsCut}
            </p>
            <h2 className="max-w-5xl font-display text-[clamp(2.35rem,6vw,6.8rem)] font-bold uppercase leading-[0.9] text-white">
              {ui.signatureTitle}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="border-l border-white/10 pl-7"
          >
            <p className="text-lg font-light leading-9 text-white/62">
              {h.subtitle || ui.signatureFallback}
            </p>
            <div className="mt-8 grid gap-px bg-white/8">
              {(capabilities.length ? capabilities : [
                { id: "film", title: ui.defaultServices[0] },
                { id: "campaign", title: ui.defaultServices[1] },
                { id: "photo", title: ui.defaultServices[2] },
                { id: "edit", title: ui.defaultServices[3] },
              ]).map((service: any, index: number) => {
                const Icon = [Eye, Layers, TimerReset, Star][index % 4];
                return (
                  <div key={service.id || service.title || index} className="flex items-center justify-between gap-5 bg-[#080808] py-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
                      {service.title}
                    </span>
                    <Icon className="h-4 w-4 text-mb-gold/60" />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-1/2 overflow-hidden text-center opacity-[0.025]">
        <span className="font-display text-[18vw] font-bold uppercase leading-none">{ui.signatureBackground}</span>
      </div>
    </section>
  );
}

function TrustStrip({ stats, ui }: { stats: any[]; ui: any }) {
  const highlights = [
    {
      icon: BadgeCheck,
      label: ui.trustSelectedClient,
      value: "RNI",
    },
    {
      icon: Layers,
      label: ui.trustProductionScope,
      value: "Brand / Web / Visual",
    },
    {
      icon: Globe2,
      label: ui.trustBase,
      value: ui.trustBaseValue,
    },
  ];

  const visibleStats = (stats || []).slice(0, 3);

  return (
    <section className="border-y border-white/8 bg-[#090909]">
      <div className="container-site grid gap-px bg-white/8 py-px md:grid-cols-3">
        {(visibleStats.length ? visibleStats : highlights).map((item: any, index: number) => {
          const Icon = getIcon(item.icon);
          return (
            <motion.div
              key={item.id || item.label || index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group flex min-h-32 items-center justify-between gap-6 bg-mb-bg px-6 py-8 md:px-8"
            >
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-white/32">
                  {item.label}
                </p>
                <p className="font-display text-3xl font-bold uppercase leading-none text-white md:text-4xl">
                  {item.value}
                </p>
              </div>
              <Icon className="h-7 w-7 shrink-0 text-mb-gold/55 transition-colors group-hover:text-mb-gold" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
