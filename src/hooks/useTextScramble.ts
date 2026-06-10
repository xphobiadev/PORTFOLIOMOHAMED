"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface UseTextScrambleOptions {
    text: string;
    speed?: number;       // ms per character reveal (default 30)
    delay?: number;       // ms initial delay (default 0)
    scrambleDuration?: number; // how many frames each char scrambles (default 3)
}

export function useTextScramble({
    text,
    speed = 30,
    delay = 0,
    scrambleDuration = 3,
}: UseTextScrambleOptions) {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const frameRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    const scramble = useCallback(() => {
        let started = false;

        const animate = (timestamp: number) => {
            if (!started) {
                startTimeRef.current = timestamp + delay;
                started = true;
            }

            const elapsed = timestamp - startTimeRef.current;
            if (elapsed < 0) {
                frameRef.current = requestAnimationFrame(animate);
                return;
            }

            const revealedCount = Math.min(
                Math.floor(elapsed / speed),
                text.length
            );

            let result = "";
            for (let i = 0; i < text.length; i++) {
                if (i < revealedCount) {
                    result += text[i];
                } else if (i < revealedCount + scrambleDuration) {
                    result += CHARS[Math.floor(Math.random() * CHARS.length)];
                } else {
                    result += " ";
                }
            }

            setDisplayText(result);

            if (revealedCount >= text.length) {
                setDisplayText(text);
                setIsComplete(true);
                return;
            }

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);
    }, [text, speed, delay, scrambleDuration]);

    useEffect(() => {
        setIsComplete(false);
        scramble();

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [scramble]);

    return { displayText, isComplete };
}
