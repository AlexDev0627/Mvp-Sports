import { useRef } from "react";
import type { Product } from "../../types";
import { ProductCard } from "./ProductCard";
import { cn } from "../../lib/format";

interface ProductGridProps {
    products: Product[];
    emptyMessage?: string;
    scroll?: boolean; // when true, render as horizontal scroll carousel
    className?: string;
}

function ChevronLeft() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <polyline points="15 18 9 12 15 6" />
        </svg>
    );
}
function ChevronRight() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
        >
            <polyline points="9 18 15 12 9 6" />
        </svg>
    );
}

export function ProductGrid({
    products,
    emptyMessage = "No hay productos que coincidan con tu búsqueda.",
    scroll = false,
    className,
}: ProductGridProps) {
    const trackRef = useRef<HTMLUListElement | null>(null);

    if (products.length === 0) {
        return (
            <div className="py-16 text-center text-[color-mix(in_srgb,var(--color-midnight)_60%,transparent)]">
                {emptyMessage}
            </div>
        );
    }

    function scrollBy(delta: number) {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: delta, behavior: "smooth" });
    }

    if (scroll) {
        return (
            <div className={cn("relative", className)}>
                <ul
                    ref={trackRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-5 px-5 md:-mx-8 md:px-8 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-[color-mix(in_srgb,var(--color-midnight)_15%,transparent)] [&::-webkit-scrollbar-thumb]:rounded-full"
                >
                    {products.map((p) => (
                        <li
                            key={p.id}
                            className="shrink-0 w-[68vw] xs:w-[55vw] sm:w-[42vw] md:w-[300px] lg:w-[320px] snap-start"
                        >
                            <ProductCard product={p} />
                        </li>
                    ))}
                </ul>
                {/* Controls */}
                <button
                    type="button"
                    onClick={() => scrollBy(-360)}
                    aria-label="Anterior"
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 items-center justify-center rounded-full bg-[var(--color-vapor)] border border-[color-mix(in_srgb,var(--color-midnight)_15%,transparent)] shadow-md text-[var(--color-midnight)] hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan)] transition-colors"
                >
                    <ChevronLeft />
                </button>
                <button
                    type="button"
                    onClick={() => scrollBy(360)}
                    aria-label="Siguiente"
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-11 h-11 items-center justify-center rounded-full bg-[var(--color-vapor)] border border-[color-mix(in_srgb,var(--color-midnight)_15%,transparent)] shadow-md text-[var(--color-midnight)] hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan)] transition-colors"
                >
                    <ChevronRight />
                </button>
            </div>
        );
    }

    return (
        <ul
            className={cn(
                "grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                className,
            )}
        >
            {products.map((p) => (
                <li key={p.id}>
                    <ProductCard product={p} />
                </li>
            ))}
        </ul>
    );
}
