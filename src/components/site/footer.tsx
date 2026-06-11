"use client";

import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";
import { getFooterUi } from "@/lib/i18n/site-ui";
import { ArrowUpRight } from "lucide-react";

const BEHANCE_URL = "https://www.behance.net/simodev";

export function Footer() {
    const { locale } = useLanguage();
    const ui = getFooterUi(locale);

    return (
        <footer className="relative overflow-hidden bg-black pt-32 pb-12 border-t border-white/5">
            {/* Background Aesthetic */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
                <div className="absolute left-1/2 top-0 h-[420px] w-full max-w-[1000px] -translate-x-1/2 rounded-full bg-mb-gold/10 blur-[100px] sm:h-[500px] sm:blur-[120px]" />
            </div>

            <div className="container-site relative z-10">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                    {/* Left Branding Area */}
                    <div>
                        <div className="mb-8 flex items-center gap-3">
                            <span className="font-display text-4xl font-bold tracking-tight text-white">MB</span>
                            <span className="h-3 w-3 rounded-full bg-mb-gold" />
                        </div>
                        <p className="max-w-md text-lg font-light leading-relaxed text-white/50">
                            {ui.blurb}
                        </p>
                        
                        <div className="mt-12 flex gap-6">
                            <a href="#" aria-label="Instagram" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 transition-all hover:border-mb-gold/50 hover:bg-mb-gold/10 hover:text-mb-gold">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 transition-all hover:border-mb-gold/50 hover:bg-mb-gold/10 hover:text-mb-gold">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                            <a
                                href={BEHANCE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Behance"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 font-display text-sm font-bold text-white/40 transition-all hover:border-mb-gold/50 hover:bg-mb-gold/10 hover:text-mb-gold"
                            >
                                Be
                            </a>
                        </div>
                    </div>

                    {/* Right Links Grid */}
                    <div className="grid grid-cols-2 gap-12 sm:gap-16">
                        <div>
                            <h4 className="mb-8 text-xs font-bold tracking-[0.3em] text-white/30 uppercase">
                                {ui.navTitle}
                            </h4>
                            <div className="flex flex-col gap-5 text-sm">
                                <FooterLink href="/">{ui.home}</FooterLink>
                                <FooterLink href="/works">{ui.works}</FooterLink>
                                <FooterLink href="/about">{ui.about}</FooterLink>
                                <FooterLink href="/contact">{ui.contact}</FooterLink>
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-8 text-xs font-bold tracking-[0.3em] text-white/30 uppercase">
                                {ui.resourcesTitle}
                            </h4>
                            <div className="flex flex-col gap-5 text-sm">
                                <FooterLink href="#">{ui.blog}</FooterLink>
                                <FooterLink href="#">{ui.faq}</FooterLink>
                                <FooterLink href="#">{ui.press}</FooterLink>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-32 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row">
                    <p className="text-xs font-medium tracking-widest text-white/30 uppercase">
                        © {new Date().getFullYear()} MB CREATIVE. ALL RIGHTS RESERVED.
                    </p>
                    
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group mt-6 flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase transition-colors hover:text-mb-gold sm:mt-0"
                    >
                        BACK TO TOP
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:border-mb-gold/50 group-hover:bg-mb-gold/10">
                            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                    </button>
                </div>
            </div>
            
            {/* Massive Background Text Aesthetic */}
            <div className="pointer-events-none absolute -bottom-16 left-0 right-0 hidden overflow-hidden text-center opacity-[0.02] select-none sm:block">
                <span className="whitespace-nowrap font-display text-8xl font-bold leading-none tracking-normal md:text-9xl lg:text-[12rem]">CREATIVE</span>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link 
            href={href} 
            className="group flex w-fit items-center text-white/60 transition-colors hover:text-mb-gold"
        >
            <span className="relative">
                {children}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-mb-gold transition-all duration-300 group-hover:w-full" />
            </span>
        </Link>
    );
}
