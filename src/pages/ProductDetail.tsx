import { Link, useParams } from "react-router-dom";
import { useProductBySlug } from "../hooks/useProducts";
import { Container } from "../components/layout/Container";
import { ProductGallery } from "../components/product/ProductGallery";
import { AddToCart } from "../components/product/AddToCart";
import { Badge } from "../components/ui/Badge";
import { formatPrice } from "../lib/format";
import { Meta } from "../components/seo/Meta";

export function ProductDetail() {
    const { slug } = useParams<{ slug: string }>();
    const product = useProductBySlug(slug);

    if (!product) {
        return (
            <Container size="md" className="py-20 text-center">
                <h1>Producto no encontrado</h1>
                <p className="mt-2 text-[var(--color-midnight)]/70">
                    El producto que buscas no existe o fue removido.
                </p>
                <Link
                    to="/shop"
                    className="inline-block mt-6 text-[var(--color-cyan)] hover:underline"
                >
                    ← Volver a la tienda
                </Link>
            </Container>
        );
    }

    return (
        <>
            <Meta
                title={`${product.name} — MvpSports`}
                description={product.description}
            />
            <Container size="xl" className="pt-[5.625rem] pb-10 md:pt-[8.625rem] md:pb-16">
                <nav className="text-xs text-[var(--color-midnight)]/60 mb-6 font-mono uppercase tracking-wider">
                    <Link to="/" className="hover:text-[var(--color-cyan)]">
                        Inicio
                    </Link>{" "}
                    /{" "}
                    <Link
                        to={`/shop/${product.category}`}
                        className="hover:text-[var(--color-cyan)]"
                    >
                        {product.category}
                    </Link>{" "}
                    / <span className="text-[var(--color-midnight)]">{product.name}</span>
                </nav>

                {/* Mobile: bloque apilado. Desktop: 2 columnas (imagen | info) */}
                <div className="md:grid md:grid-cols-2 md:gap-8 lg:gap-12 md:items-start">
                    {/* === Columna izquierda (mobile: orden 2). Imagen === */}
                    <div className="order-2 md:order-1 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Badge tone="default">{product.league}</Badge>
                            <Badge tone="default">{product.category}</Badge>
                        </div>
                        <ProductGallery product={product} />
                    </div>

                    {/* === Columna derecha (mobile: orden 1). Info === */}
                    <div className="order-1 md:order-2 pt-6 md:pt-20 lg:pt-24 flex flex-col">
                        <h1 className="!text-4xl sm:!text-5xl md:!text-6xl">
                            {product.name}
                        </h1>
                        <p className="font-mono text-3xl tabular-nums mt-4 mb-6">
                            {formatPrice(product.price, product.currency)}
                        </p>
                        <p className="text-[var(--color-midnight)]/80 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="my-8 h-px bg-[var(--color-midnight)]/10" />

                        <AddToCart product={product} />
                    </div>
                </div>
            </Container>
        </>
    );
}
