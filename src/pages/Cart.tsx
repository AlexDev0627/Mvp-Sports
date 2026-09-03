import { Link } from "react-router-dom";
import { useCart } from "../store/cartStore";
import { Container } from "../components/layout/Container";
import { CartItem } from "../components/cart/CartItem";
import { CartSummary } from "../components/cart/CartSummary";
import { Meta } from "../components/seo/Meta";

export function Cart() {
    const lines = useCart((s) => s.lines);
    const count = useCart((s) => s.count);

    return (
        <>
            <Meta title="Carrito — MvpSports" />
            <Container size="xl" className="pt-[5.625rem] pb-10 md:pt-[8.625rem] md:pb-16">
                <header className="mb-8">
                    <p className="eyebrow mb-2">Tu selección</p>
                    <h1>Carrito</h1>
                </header>

                {lines.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-[color-mix(in_srgb,var(--color-midnight)_70%,transparent)] mb-6">
                            Tu carrito está vacío.
                        </p>
                        <Link
                            to="/shop"
                            className="inline-block px-5 py-2.5 rounded-full bg-[var(--color-cyan)] text-[var(--color-vapor)] uppercase tracking-wider text-sm font-medium hover:bg-[var(--color-navy)]"
                        >
                            Ir a la tienda
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-[1fr_360px] gap-10">
                        <ul>
                            {lines.map((line) => (
                                <CartItem
                                    key={`${line.productId}-${line.variantId}`}
                                    line={line}
                                />
                            ))}
                        </ul>
                        <CartSummary />
                    </div>
                )}

                {count > 0 && lines.length === 0 && (
                    <p className="text-xs text-[color-mix(in_srgb,var(--color-midnight)_60%,transparent)] text-center mt-4">
                        ({count} artículo{count === 1 ? "" : "s"} — sincronizando…)
                    </p>
                )}
            </Container>
        </>
    );
}
