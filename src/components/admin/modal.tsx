import React from "react";
import { X } from "lucide-react";

export function Modal({
    isOpen,
    onClose,
    title,
    children
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-display text-2xl font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
