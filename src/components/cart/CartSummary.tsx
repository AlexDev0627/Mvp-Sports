import { useNavigate } from "react-router-dom";
import { useCart } from "../../store/cartStore";
import { Button } from "../ui/Button";
import { formatPrice } from "../../lib/format";

export function CartSummary() {
    const subtotal = useCart((s) => s.subtotal);
    const count = useCart((s) => s.count);
    const navigate = useNavigate();
    const shipping = subtotal === 0 ? 0 : subtotal >= 100 ? 0 : 8.5;
    const total = subtotal + shipping;

    return (
        <aside
            className="border border-[color-mix(in_srgb,var(--color-midnight)_15%,transparent)] bg-[var(--color-vapor)] p-6"
            aria-label="Resumen del carrito"
        >
            <h2 className="font-display text-2xl mb-5">Resumen</h2>
            <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                    <dt className="text-[color-mix(in_srgb,var(--color-midnight)_70%,transparent)]">
                        Subtotal ({count} {count === 1 ? "artículo" : "artículos"})
                    </dt>
                    <dd className="font-mono tabular-nums">
                        {formatPrice(subtotal)}
                    </dd>
                </div>
                <div className="flex justify-between">
                    <dt className="text-[color-mix(in_srgb,var(--color-midnight)_70%,transparent)]">
                        Envío
                    </dt>
                    <dd className="font-mono tabular-nums">
                        {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                    </dd>
                </div>
                {subtotal > 0 && subtotal < 100 && (
                    <p className="text-xs text-[var(--color-cyan)] pt-1">
                        Te faltan {formatPrice(100 - subtotal)} para envío gratis.
                    </p>
                )}
                <div className="flex justify-between pt-4 mt-2 border-t border-[color-mix(in_srgb,var(--color-midnight)_10%,transparent)] text-[15px]">
                    <dt className="font-medium">Total</dt>
                    <dd className="font-mono font-bold tabular-nums">
                        {formatPrice(total)}
                    </dd>
                </div>
            </dl>
            <Button
                size="lg"
                className="w-full mt-6"
                onClick={() => navigate("/checkout")}
                disabled={count === 0}
            >
                Ir a pagar
            </Button>
        </aside>
    );
}
