"use client";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SectionTitle } from "@/components/site/section-title";
import { useState } from "react";
import { Send, Mail, MapPin, Clock, Phone, CheckCircle2, Radio } from "lucide-react";
import { toast } from "sonner";
import { getContactUi } from "@/lib/i18n/site-ui";
import { motion } from "framer-motion";
import type { Locale } from "@/types/i18n";

export function ContactClient({ 
    contactData, 
    locale 
}: { 
    contactData: any, 
    locale: Locale 
}) {
    const [loading, setLoading] = useState(false);
    const c = getContactUi(locale);

    // Merge DB data with i18n fallbacks
    const info = {
        kicker: contactData?.[`kicker_${locale}`] || c.kicker,
        titleBefore: contactData?.[`title_before_${locale}`] || c.titleBefore,
        titleHighlight: contactData?.[`title_highlight_${locale}`] || c.titleHighlight,
        desc: contactData?.[`desc_${locale}`] || c.desc,
        email: contactData?.email || "hello@mb-creative.ma",
        phone: contactData?.phone || c.phoneValue,
        location: contactData?.[`location_${locale}`] || c.locationValue,
        availability: contactData?.[`availability_${locale}`] || c.availabilityText,
    };

    const briefSteps = locale === "en"
        ? ["Creative direction", "Production planning", "Final delivery"]
        : ["Direction créative", "Planification de production", "Livraison finale"];

    async function onSubmit(formData: FormData) {
        setLoading(true);

        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message")
        };

        const res = await fetch("/api/contact", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
        });

        setLoading(false);

        if (!res.ok) {
            toast.error(c.toastErr);
            return;
        }

        toast.success(c.toastOk);
        (document.getElementById("contact-form") as HTMLFormElement)?.reset();
    }

    return (
        <main className="bg-mb-bg relative overflow-hidden min-h-screen flex flex-col">
            <Header />

            <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute inset-0 grid-stroke opacity-[0.06]" />
                <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_80%_20%,rgba(200,162,74,0.12),transparent_34%)]" />
            </div>

            <section className="container-site relative z-10 min-w-0 flex-1 pb-32 pt-44">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end"
                >
                    <SectionTitle
                            kicker={info.kicker}
                            title={
                                <>
                                    {info.titleBefore}
                                    <span className="gold-text-shimmer">{info.titleHighlight}</span>
                                </>
                            }
                            desc={info.desc}
                        />

                    <div className="border-l border-white/10 pl-7">
                        <div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em] text-mb-gold">
                            <Radio size={14} />
                            {locale === "en" ? "Inquiry signal" : "Signal de projet"}
                        </div>
                        <div className="grid gap-px bg-white/8">
                            {briefSteps.map((step, index) => (
                                <div key={step} className="flex items-center gap-4 bg-mb-bg py-4">
                                    <span className="font-display text-2xl font-bold text-white/16 tabular-nums">0{index + 1}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/52">{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="mt-20 grid gap-8 lg:grid-cols-[minmax(0,1.18fr)_0.82fr]">
                    <motion.form 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        id="contact-form" 
                        action={onSubmit} 
                        className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0c0c0c]/92 p-6 shadow-2xl backdrop-blur-xl md:p-10"
                    >
                        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-mb-gold/0 via-mb-gold/70 to-mb-gold/0" />
                        <div className="mb-10 flex items-center justify-between gap-6 border-b border-white/10 pb-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-white/32">
                                    {locale === "en" ? "Project brief" : "Brief projet"}
                                </p>
                                <h2 className="mt-3 font-display text-3xl font-bold uppercase text-white">
                                    {locale === "en" ? "Start with intent" : "Partir d'une intention"}
                                </h2>
                            </div>
                            <CheckCircle2 className="h-8 w-8 shrink-0 text-mb-gold/70" />
                        </div>
                        
                        <div className="grid gap-8 md:grid-cols-2">
                            <div>
                                <label className="mb-3 block text-xs font-bold tracking-[0.2em] text-white/50">{c.name}</label>
                                <input name="name" className="w-full border border-white/10 bg-black/50 px-5 py-4 text-sm text-white transition-colors focus:border-mb-gold/60 focus:outline-none" placeholder={c.namePh} required />
                            </div>
                            <div>
                                <label className="mb-3 block text-xs font-bold tracking-[0.2em] text-white/50">{c.email}</label>
                                <input name="email" type="email" className="w-full border border-white/10 bg-black/50 px-5 py-4 text-sm text-white transition-colors focus:border-mb-gold/60 focus:outline-none" placeholder={c.emailPh} required />
                            </div>
                        </div>

                        <div className="mt-8">
                            <label className="mb-3 block text-xs font-bold tracking-[0.2em] text-white/50">{c.subject}</label>
                            <input name="subject" className="w-full border border-white/10 bg-black/50 px-5 py-4 text-sm text-white transition-colors focus:border-mb-gold/60 focus:outline-none" placeholder={c.subjectPh} required />
                        </div>

                        <div className="mt-8">
                            <label className="mb-3 block text-xs font-bold tracking-[0.2em] text-white/50">{c.message}</label>
                            <textarea name="message" className="min-h-[220px] w-full resize-y border border-white/10 bg-black/50 px-5 py-4 text-sm text-white transition-colors focus:border-mb-gold/60 focus:outline-none" placeholder={c.messagePh} required />
                        </div>

                        <button disabled={loading} className="btn-gold mt-10 w-full md:w-auto">
                            <Send size={16} />
                            <span>{loading ? c.sending : c.send}</span>
                        </button>
                    </motion.form>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-px bg-white/8"
                    >
                        <div className="group flex items-start gap-6 bg-mb-bg p-7 transition-colors hover:bg-[#111]">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-mb-gold/40 group-hover:bg-mb-gold/10 group-hover:text-mb-gold">
                                <Phone size={20} className="text-white/40 group-hover:text-mb-gold transition-colors" />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-[0.2em] text-white/40 mb-2">{c.phoneTitle}</p>
                                <p className="text-lg text-white font-light tracking-wide">{info.phone}</p>
                            </div>
                        </div>

                        <div className="group flex items-start gap-6 bg-mb-bg p-7 transition-colors hover:bg-[#111]">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-mb-gold/40 group-hover:bg-mb-gold/10 group-hover:text-mb-gold">
                                <Mail size={20} className="text-white/40 group-hover:text-mb-gold transition-colors" />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-[0.2em] text-white/40 mb-2">{c.emailLabel}</p>
                                <p className="text-lg text-white font-light tracking-wide">{info.email}</p>
                            </div>
                        </div>
                        
                        <div className="group flex items-start gap-6 bg-mb-bg p-7 transition-colors hover:bg-[#111]">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-mb-gold/40 group-hover:bg-mb-gold/10 group-hover:text-mb-gold">
                                <MapPin size={20} className="text-white/40 group-hover:text-mb-gold transition-colors" />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-[0.2em] text-white/40 mb-2">{c.locationTitle}</p>
                                <p className="text-lg text-white font-light tracking-wide">{info.location}</p>
                            </div>
                        </div>
                        
                        <div className="group flex items-start gap-6 bg-mb-bg p-7 transition-colors hover:bg-[#111]">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-mb-gold/40 group-hover:bg-mb-gold/10 group-hover:text-mb-gold">
                                <Clock size={20} className="text-white/40 group-hover:text-mb-gold transition-colors" />
                            </div>
                            <div>
                                <p className="text-xs font-bold tracking-[0.2em] text-white/40 mb-2">{c.availabilityTitle}</p>
                                <p className="text-base text-white/60 font-light leading-relaxed">{info.availability}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
