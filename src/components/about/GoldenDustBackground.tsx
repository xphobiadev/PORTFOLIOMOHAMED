"use client";

import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 800;
const GOLD_COLOR = new THREE.Color("#c9a45c");

export function GoldenDustBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef<number>(0);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const lowPower =
            window.matchMedia("(max-width: 1023px)").matches ||
            window.matchMedia("(pointer: coarse)").matches;
        if (reduceMotion || lowPower) return;

        // Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particles
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);
        const opacities = new Float32Array(PARTICLE_COUNT);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            sizes[i] = Math.random() * 3 + 0.5;
            opacities[i] = Math.random() * 0.6 + 0.2;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            color: GOLD_COLOR,
            size: 0.04,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: true,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Animation
        let time = 0;
        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);
            time += 0.001;

            // Slow rotation
            particles.rotation.y = time * 0.5;
            particles.rotation.x = time * 0.2;

            // Mouse parallax
            particles.position.x += (mouseRef.current.x * 0.3 - particles.position.x) * 0.02;
            particles.position.y += (mouseRef.current.y * 0.3 - particles.position.y) * 0.02;

            // Float individual particles
            const pos = geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                pos[i * 3 + 1] += Math.sin(time * 2 + i * 0.1) * 0.001;
            }
            geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(frameRef.current);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [handleMouseMove]);

    return (
        <div
            ref={containerRef}
            className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_20%,rgba(201,164,92,.08),transparent_55%)]"
            aria-hidden="true"
        />
    );
}
