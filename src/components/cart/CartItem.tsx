import { Link } from "react-router-dom";
import type { CartLine } from "../../types";
import { useCart } from "../../store/cartStore";
import { formatPrice } from "../../lib/format";

interface CartItemProps {
    line: CartLine;
}

function variantSummary(v: CartLine["variant"]) {
    const parts: string[] = [];
    if (v.size) parts.push(v.size);
    if (v.color) parts.push(v.color);
    if (v.weight) parts.push(v.weight);
    if (v.handedness) parts.push(v.handedness);
    return parts.join(" · ");
}

export function CartItem({ line }: CartItemProps) {
    const updateQty = useCart((s) => s.updateQty);
    const remove = useCart((s) => s.remove);
    const { product, variant, qty, lineTotal } = line;

    return (
        <li className="flex gap-4 py-5 border-b border-[var(--color-midnight)]/10">
            <Link
                to={`/product/${product.slug}`}
                className="shrink-0 w-24 h-28 bg-[var(--color-ice)] border border-[color-mix(in_srgb,var(--color-midnight)_10%,transparent)] flex items-center justify-center"
                aria-label={product.name}
            >
                <span className="font-display text-3xl text-[color-mix(in_srgb,var(--color-midnight)_40%,transparent)]">
                    {product.category.slice(0, 2).toUpperCase()}
                </span>
            </Link>
            <div className="flex-1 min-w-0">
                <Link
                    to={`/product/${product.slug}`}
                    className="font-display text-xl leading-tight hover:text-[var(--color-cyan)]"
                >
                    {product.name}
                </Link>
                <p className="text-xs text-[var(--color-midnight)]/60 mt-1 font-mono">
                    {variantSummary(variant)} · SKU {variant.sku}
                </p>
                <div className="flex items-center justify-between gap-3 mt-3">
                    <div className="inline-flex items-center border border-[var(--color-midnight)]/15 rounded-md">
                        <button
                            type="button"
                            onClick={() => updateQty(product.id, variant.id, qty - 1)}
                            className="w-9 h-9 hover:bg-[var(--color-midnight)]/5"
                            aria-label="Restar"
                        >
                            −
                        </button>
                        <span className="w-10 text-center font-mono tabular-nums">
                            {qty}
                        </span>
                        <button
                            type="button"
                            onClick={() => updateQty(product.id, variant.id, qty + 1)}
                            className="w-9 h-9 hover:bg-[var(--color-midnight)]/5"
                            aria-label="Sumar"
                        >
                            +
                        </button>
                    </div>
                    <span className="font-mono text-base tabular-nums">
                        {formatPrice(lineTotal, product.currency)}
                    </span>
                </div>
            </div>
            <button
                type="button"
                onClick={() => remove(product.id, variant.id)}
                className="self-start text-xs uppercase tracking-wider text-[var(--color-midnight)]/50 hover:text-[var(--color-bat-red)]"
                aria-label={`Quitar ${product.name}`}
            >
                Quitar
            </button>
        </li>
    );
}
