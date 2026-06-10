"use client";

export function FilmGrain() {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-[100]"
            aria-hidden="true"
            style={{ opacity: 0.025 }}
        >
            <svg width="100%" height="100%">
                <filter id="film-grain">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect
                    width="100%"
                    height="100%"
                    filter="url(#film-grain)"
                />
            </svg>
        </div>
    );
}
