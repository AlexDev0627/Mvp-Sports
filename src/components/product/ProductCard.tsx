import { Link } from "react-router-dom";
import type { Product, Team } from "../../types";
import { Badge } from "../ui/Badge";
import teamsData from "../../data/teams.json";

const teams = teamsData as Team[];

interface ProductCardProps {
    product: Product;
}

function teamMark(teamId: string | undefined): { label: string; color: string } | null {
    if (!teamId) return null;
    const team = teams.find((t) => t.id === teamId);
    if (!team) return null;
    const letters = team.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();
    const color =
        team.league === "MLB"
            ? "#0A4FA0"
            : team.league === "LVBP"
                ? "#5C1A1B"
                : "#1A1814";
    return { label: letters, color };
}

function categoryLabel(cat: Product["category"]): string {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
}

export function ProductCard({ product }: ProductCardProps) {
    const mark = teamMark(product.team);

    return (
        <Link
            to={`/product/${product.slug}`}
            className="group block focus:outline-none"
        >
            <article className="relative bg-[var(--color-vapor)] border border-[color-mix(in_srgb,var(--color-midnight)_8%,transparent)] rounded-md overflow-hidden transition-all duration-200 group-hover:border-[var(--color-cyan)] group-hover:shadow-[0_8px_24px_-8px_color-mix(in_srgb,var(--color-cyan)_50%,transparent)]">
                {/* Image area: 1:1, real product image with type-mark fallback */}
                <div className="relative aspect-square bg-[color-mix(in_srgb,var(--color-ice)_60%,var(--color-vapor))] overflow-hidden p-3 sm:p-4">
                    {/* Real product image — only renders when an image exists */}
                    {product.images[0] && (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            loading="lazy"
                            className="absolute inset-3 sm:inset-4 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] h-[calc(100%-1.5rem)] sm:h-[calc(100%-2rem)] object-contain transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                    )}

                    {/* Type-mark fallback — only when no image available */}
                    {!product.images[0] && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span
                                className="font-display text-[2.5rem] sm:text-[3.5rem] leading-none text-[color-mix(in_srgb,var(--color-midnight)_75%,transparent)]"
                                aria-hidden
                            >
                                {product.category.slice(0, 2).toUpperCase()}
                            </span>
                            <span className="mt-1.5 sm:mt-2 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--color-midnight)_40%,transparent)]">
                                {product.league}
                            </span>
                        </div>
                    )}

                    {/* Team badge top-left — smaller on mobile */}
                    {mark && (
                        <div
                            className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-white shadow-sm z-10"
                            style={{ background: mark.color }}
                            aria-label={`Equipo ${mark.label}`}
                        >
                            {mark.label}
                        </div>
                    )}

                    {/* Tag top-right — smaller on mobile */}
                    {product.bestseller ? (
                        <Badge tone="accent" className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 text-[9px] sm:text-[10px] z-10">
                            Bestseller
                        </Badge>
                    ) : product.featured ? (
                        <Badge className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 text-[9px] sm:text-[10px] z-10">
                            Nuevo
                        </Badge>
                    ) : null}
                </div>

                {/* Footer — tighter spacing on mobile */}
                <div className="p-3 sm:p-4 border-t border-[color-mix(in_srgb,var(--color-midnight)_8%,transparent)]">
                    <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-[color-mix(in_srgb,var(--color-midnight)_50%,transparent)] mb-0.5 sm:mb-1">
                        {categoryLabel(product.category)} · {product.league}
                    </p>
                    <h3 className="font-semibold text-[12px] sm:text-[14px] leading-snug text-[var(--color-midnight)] group-hover:text-[var(--color-cyan)] transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
                        {product.name}
                    </h3>
                    <div className="mt-2 sm:mt-3 flex items-end justify-between">
                        <span className="font-mono text-[14px] sm:text-[17px] font-bold tabular-nums text-[var(--color-midnight)]">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-[var(--color-cyan)] opacity-0 group-hover:opacity-100 transition-opacity">
                            Ver →
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
