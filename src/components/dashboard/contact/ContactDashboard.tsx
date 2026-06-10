"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { updateContactInfo } from "@/lib/services/contact.service";
import { useDashboardLanguage } from "@/hooks/useDashboardLanguage";
import { LanguageTabs } from "@/components/dashboard/LanguageTabs";
import { Loader2, Save } from "lucide-react";

export function ContactDashboard({ initialData }: { initialData: any }) {
    const [data, setData] = useState(initialData || {});
    const [saving, setSaving] = useState(false);
    const { lang, setLang, bindField } = useDashboardLanguage();

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateContactInfo(data);
            toast.success("Contact information updated!");
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl space-y-10 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Contact Page</h2>
                    <p className="text-white/50">Manage contact information and UI text.</p>
                </div>
                <div className="flex items-center gap-4">
                    <LanguageTabs currentLang={lang} onChange={setLang} />
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 rounded-full bg-mb-gold px-6 py-3 text-sm font-bold text-black hover:bg-mb-gold/90 disabled:opacity-50 transition-all shadow-lg shadow-mb-gold/20"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Header Section */}
            <div className="rounded-[32px] border border-white/5 bg-[#101010] p-8 space-y-6">
                <h3 className="text-lg font-bold border-b border-white/5 pb-4">Header & Titles</h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/30">Kicker ({lang.toUpperCase()})</label>
                        <input
                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-mb-gold/50 transition-colors"
                            {...bindField(data, setData, "kicker")}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/30">Title Highlight ({lang.toUpperCase()})</label>
                        <input
                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-mb-gold/50 transition-colors"
                            {...bindField(data, setData, "title_highlight")}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/30">Title Before ({lang.toUpperCase()})</label>
                        <input
                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-mb-gold/50 transition-colors"
                            {...bindField(data, setData, "title_before")}
                        />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/30">Description ({lang.toUpperCase()})</label>
                        <textarea
                            rows={3}
                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-mb-gold/50 transition-colors resize-none"
                            {...bindField(data, setData, "desc")}
                        />
                    </div>
                </div>
            </div>

            {/* Contact Details */}
            <div className="rounded-[32px] border border-white/5 bg-[#101010] p-8 space-y-6">
                <h3 className="text-lg font-bold border-b border-white/5 pb-4">Contact Details</h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/30">Email Address</label>
                        <input
                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-mb-gold/50 transition-colors"
                            value={data.email || ""}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/30">Phone Number</label>
                        <input
                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-mb-gold/50 transition-colors"
                            value={data.phone || ""}
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/30">Location ({lang.toUpperCase()})</label>
                        <input
                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-mb-gold/50 transition-colors"
                            {...bindField(data, setData, "location")}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-white/30">Availability ({lang.toUpperCase()})</label>
                        <textarea
                            rows={2}
                            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-mb-gold/50 transition-colors resize-none"
                            {...bindField(data, setData, "availability")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
