import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product, Variant } from "../../types";
import { useCart } from "../../store/cartStore";
import { Button } from "../ui/Button";
import { VariantSelector } from "./VariantSelector";

interface AddToCartProps {
    product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
    const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const add = useCart((s) => s.add);
    const navigate = useNavigate();

    const variant: Variant | undefined = product.variants.find(
        (v) => v.id === variantId,
    );
    const inStock = variant ? variant.stock : 0;

    function handleAdd() {
        if (!variant) return;
        add(product.id, variant.id, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    function handleBuyNow() {
        if (!variant) return;
        add(product.id, variant.id, qty);
        navigate("/cart");
    }

    return (
        <div className="space-y-5">
            <VariantSelector
                variants={product.variants}
                selectedId={variantId}
                onChange={setVariantId}
            />

            <div>
                <p className="eyebrow mb-2">Cantidad</p>
                <div className="inline-flex items-center border border-[var(--color-midnight)]/15 rounded-md overflow-hidden">
                    <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 hover:bg-[var(--color-midnight)]/5"
                        aria-label="Restar"
                    >
                        −
                    </button>
                    <span className="w-12 text-center font-mono tabular-nums">
                        {qty}
                    </span>
                    <button
                        type="button"
                        onClick={() => setQty((q) => Math.min(inStock, q + 1))}
                        className="w-10 h-10 hover:bg-[var(--color-midnight)]/5"
                        aria-label="Sumar"
                    >
                        +
                    </button>
                </div>
                <p className="text-xs text-[var(--color-midnight)]/60 mt-2 font-mono">
                    {inStock > 0
                        ? `${inStock} en stock`
                        : "Agotado en esta variante"}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    size="lg"
                    onClick={handleAdd}
                    disabled={!variant || inStock === 0}
                    className="flex-1"
                >
                    {added ? "¡Añadido!" : "Añadir al carrito"}
                </Button>
                <Button
                    size="lg"
                    variant="secondary"
                    onClick={handleBuyNow}
                    disabled={!variant || inStock === 0}
                >
                    Comprar ya
                </Button>
            </div>
        </div>
    );
}
