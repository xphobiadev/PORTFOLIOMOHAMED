"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springX = useSpring(cursorX, { damping: 25, stiffness: 300 });
    const springY = useSpring(cursorY, { damping: 25, stiffness: 300 });

    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [cursorX, cursorY, isVisible]);

    useEffect(() => {
        const coarse =
            typeof window !== "undefined" &&
            window.matchMedia?.("(pointer: coarse)")?.matches;
        if (coarse || "ontouchstart" in window) return;

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleElementHover = () => {
            const interactiveEls = document.querySelectorAll("a, button, input, textarea, select, [role='button'], [data-cursor-hover]");
            interactiveEls.forEach(el => {
                el.addEventListener("mouseenter", () => setIsHovering(true));
                el.addEventListener("mouseleave", () => setIsHovering(false));
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        // Run initially and on DOM changes
        handleElementHover();
        const observer = new MutationObserver(handleElementHover);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            observer.disconnect();
        };
    }, [handleMouseMove]);

    if (!isVisible) return null;

    const dotSize = isClicking ? 8 : isHovering ? 48 : 12;
    const ringSize = isHovering ? 64 : 24;

    return (
        <>
            {/* Main dot */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
                style={{
                    x: springX,
                    y: springY,
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: "#c9a45c",
                    mixBlendMode: "difference",
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{ width: dotSize, height: dotSize }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
            />
            {/* Trailing ring */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border-[1.5px] border-[#c9a45c]/50"
                style={{
                    x: springX,
                    y: springY,
                    width: ringSize,
                    height: ringSize,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{ width: ringSize, height: ringSize, opacity: isHovering ? 0.8 : 0.4 }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
            />
        </>
    );
}
