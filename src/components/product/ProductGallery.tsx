import { useState } from "react";
import type { Product } from "../../types";

interface ProductGalleryProps {
    product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
    const images = product.images.length > 0 ? product.images : [""];
    const [active, setActive] = useState(0);
    const activeSrc = images[active];

    return (
        <div className="space-y-4">
            {/* Main image stage — square frame, subtle border, padded */}
            <div
                className="
                    relative
                    aspect-square
                    bg-[var(--color-ice)]
                    sm:rounded-lg
                    flex items-center justify-center
                    overflow-hidden
                    p-0 sm:p-6
                "
            >
                {activeSrc ? (
                    <img
                        key={activeSrc}
                        src={activeSrc}
                        alt={product.name}
                        className="
                            w-full h-full
                            sm:w-[90%] sm:h-[90%]
                            object-contain
                            sm:rounded-lg
                            transition-opacity duration-300
                        "
                    />
                ) : (
                    <div className="text-center">
                        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--color-midnight)_50%,transparent)] mb-2">
                            {product.league} · {product.category}
                        </p>
                        <p className="font-display text-[8rem] sm:text-[10rem] leading-none text-[color-mix(in_srgb,var(--color-midnight)_85%,transparent)]">
                            {product.category.slice(0, 2).toUpperCase()}
                        </p>
                    </div>
                )}

                {/* Image counter — only when there's more than one image */}
                {images.length > 1 && activeSrc && (
                    <span
                        className="
                            absolute bottom-3 right-3
                            font-mono text-[10px] tracking-wider
                            text-[var(--color-midnight)]
                            bg-[var(--color-vapor)]/80 backdrop-blur-sm
                            px-2 py-0.5 rounded
                        "
                    >
                        {active + 1} / {images.length}
                    </span>
                )}
            </div>

            {/* Thumbnails — square, consistent, same object-contain */}
            {images.length > 1 && (
                <ul className="flex gap-2 flex-wrap">
                    {images.map((src, i) => {
                        const isActive = i === active;
                        return (
                            <li key={i}>
                                <button
                                    type="button"
                                    onClick={() => setActive(i)}
                                    aria-label={`Ver imagen ${i + 1}`}
                                    aria-current={isActive}
                                    className={`
                                        w-16 h-16
                                        rounded-md
                                        border-2
                                        overflow-hidden
                                        transition-colors duration-200
                                        ${
                                            isActive
                                                ? "border-[var(--color-cyan)]"
                                                : "border-[color-mix(in_srgb,var(--color-midnight)_12%,transparent)] hover:border-[color-mix(in_srgb,var(--color-midnight)_35%,transparent)]"
                                        }
                                    `}
                                >
                                    {src ? (
                                        <img
                                            src={src}
                                            alt=""
                                            className="w-full h-full object-contain bg-[var(--color-ice)]"
                                        />
                                    ) : (
                                        <span
                                            aria-hidden
                                            className="block w-full h-full bg-[color-mix(in_srgb,var(--color-midnight)_5%,transparent)]"
                                        />
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
