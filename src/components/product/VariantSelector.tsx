import type { Variant } from "../../types";

interface VariantSelectorProps {
    variants: Variant[];
    selectedId: string;
    onChange: (id: string) => void;
}

function variantLabel(v: Variant) {
    if (v.size) return v.size;
    if (v.weight) return v.weight;
    if (v.color) return v.color;
    if (v.handedness) return v.handedness;
    return v.sku;
}

export function VariantSelector({
    variants,
    selectedId,
    onChange,
}: VariantSelectorProps) {
    return (
        <div>
            <p className="eyebrow mb-2">Variante</p>
            <ul className="flex flex-wrap gap-2">
                {variants.map((v) => {
                    const out = v.stock === 0;
                    const selected = v.id === selectedId;
                    return (
                        <li key={v.id}>
                            <button
                                type="button"
                                onClick={() => onChange(v.id)}
                                disabled={out}
                                aria-pressed={selected}
                                className={[
                                    "min-w-12 h-10 px-3 rounded-md border-2 font-mono text-sm tabular-nums transition-colors",
                                    out && "opacity-40 cursor-not-allowed line-through",
                                    selected
                                        ? "border-[var(--color-cyan)] bg-[var(--color-cyan)] text-[var(--color-vapor)]"
                                        : "border-[var(--color-midnight)]/15 hover:border-[var(--color-midnight)]",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                {variantLabel(v)}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
