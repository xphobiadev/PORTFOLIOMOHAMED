"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) {
                toast.error("Invalid credentials.");
                setLoading(false);
                return;
            }

            toast.success("Authentication successful");
            router.push("/dashboard");
            router.refresh();
        } catch (err) {
            toast.error("Something went wrong");
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-black relative flex items-center justify-center overflow-hidden noise">
            {/* Aesthetic Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mb-gold/5 blur-[150px] rounded-full" />
            </div>

            <Link href="/" className="absolute top-10 left-10 z-50 text-white/50 hover:text-white transition-colors">
                &larr; Back to Home
            </Link>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md px-6"
            >
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-mb-gold">
                            <ShieldCheck size={32} />
                        </div>
                    </div>
                    <h1 className="font-display text-4xl font-bold uppercase tracking-widest text-white">Restricted<span className="text-mb-gold">.</span></h1>
                    <p className="text-sm font-light text-white/40 tracking-widest mt-4 uppercase">Authorized Personnel Only</p>
                </div>

                <form onSubmit={onSubmit} className="bg-[#101010]/80 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mb-gold/0 via-mb-gold/50 to-mb-gold/0" />

                    <div className="space-y-6">
                        <div>
                            <label className="mb-3 block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">Username</label>
                            <div className="relative">
                                <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
                                <input 
                                    name="username" 
                                    className="w-full bg-black/50 border border-white/10 rounded-full pl-12 pr-6 py-4 text-sm text-white focus:outline-none focus:border-mb-gold/50 transition-colors" 
                                    placeholder="Enter username" 
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-3 block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" />
                                <input 
                                    name="password" 
                                    type="password"
                                    className="w-full bg-black/50 border border-white/10 rounded-full pl-12 pr-6 py-4 text-sm text-white focus:outline-none focus:border-mb-gold/50 transition-colors" 
                                    placeholder="Enter password" 
                                    required 
                                />
                            </div>
                        </div>
                    </div>

                    <button disabled={loading} type="submit" className="btn-gold w-full mt-10 !rounded-full group">
                        <span>{loading ? "Authenticating..." : "Access Dashboard"}</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </form>
            </motion.div>
        </main>
    );
}
