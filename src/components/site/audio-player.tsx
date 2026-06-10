"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Music } from "lucide-react";
import { motion } from "framer-motion";

interface AudioPlayerProps {
    url: string;
    fileName: string;
}

export function AudioPlayer({ url, fileName }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const onTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const onLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => setIsPlaying(false);
        audio.addEventListener("ended", handleEnded);
        return () => audio.removeEventListener("ended", handleEnded);
    }, []);

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0f0f0f] p-4 transition-all duration-300 hover:border-mb-gold/30 hover:bg-[#151515]">
            <audio
                ref={audioRef}
                src={url}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
            />
            
            <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-mb-gold text-black transition-transform duration-300 hover:scale-110 active:scale-95"
                >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-1" fill="currentColor" />}
                </button>

                {/* Info & Controls */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="truncate text-sm font-semibold text-white/90">
                            {fileName.split('_').slice(1).join('_') || fileName}
                        </h4>
                        <span className="text-[10px] font-medium tabular-nums text-white/40">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div 
                            className="absolute inset-y-0 left-0 bg-mb-gold"
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentTime / duration) * 100}%` }}
                            transition={{ type: "spring", bounce: 0, duration: 0.1 }}
                        />
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="absolute inset-0 z-10 w-full cursor-pointer opacity-0"
                        />
                    </div>
                </div>

                {/* Animated Bars (Visible when playing) */}
                {isPlaying && (
                    <div className="flex items-end gap-[2px] h-4 w-4 mb-1">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="w-full bg-mb-gold"
                                animate={{
                                    height: ["20%", "100%", "20%"]
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
            
            {/* Background Music Icon */}
            <div className="absolute -right-2 -bottom-2 opacity-[0.03] pointer-events-none transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                <Music size={80} />
            </div>
        </div>
    );
}
