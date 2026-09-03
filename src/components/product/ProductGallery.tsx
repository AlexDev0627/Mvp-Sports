import { useState } from "react";
import type { Product } from "../../types";

interface ProductGalleryProps {
    product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
    const images = product.images.length > 0 ? product.images : [""];
    const [active, setActive] = useState(0);

    return (
        <div className="space-y-3">
            <div className="aspect-[4/5] bg-[var(--color-ice)] border border-[color-mix(in_srgb,var(--color-midnight)_10%,transparent)] flex items-center justify-center overflow-hidden">
                <div className="text-center">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--color-midnight)_50%,transparent)] mb-2">
                        {product.league} · {product.category}
                    </p>
                    <p className="font-display text-[10rem] leading-none text-[color-mix(in_srgb,var(--color-midnight)_85%,transparent)]">
                        {product.category.slice(0, 2).toUpperCase()}
                    </p>
                </div>
            </div>
            {images.length > 1 && (
                <ul className="flex gap-2">
                    {images.map((src, i) => (
                        <li key={i}>
                            <button
                                type="button"
                                onClick={() => setActive(i)}
                                aria-label={`Imagen ${i + 1}`}
                                className={`w-16 h-20 rounded-md border-2 transition-colors ${active === i
                                    ? "border-[var(--color-cyan)]"
                                    : "border-[var(--color-midnight)]/15 hover:border-[var(--color-midnight)]/40"
                                    }`}
                            >
                                {src ? (
                                    <img
                                        src={src}
                                        alt=""
                                        className="w-full h-full object-cover rounded-[4px]"
                                    />
                                ) : (
                                    <span
                                        aria-hidden
                                        className="block w-full h-full bg-[var(--color-midnight)]/5"
                                    />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
