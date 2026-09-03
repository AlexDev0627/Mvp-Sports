import type { Product } from "../../types";
import { Container } from "../layout/Container";
import { ProductGrid } from "../product/ProductGrid";
import { ScoreLine } from "../ui/ScoreLine";


interface FeaturedSectionProps {
    number: string;
    label: string;
    title: string;
    products: Product[];
    children?: React.ReactNode;
}

export function FeaturedSection({
    number,
    label,
    title,
    products,
    children,
}: FeaturedSectionProps) {
    return (
        <section className="py-16 md:py-24">
            <Container size="xl">
                <div className="mb-10">
                    <ScoreLine number={number} label={label} className="mb-6" />
                    <div className="flex items-end justify-between gap-4 flex-wrap">
                        <h2>{title}</h2>
                        {children}
                    </div>
                </div>
                <ProductGrid products={products} scroll />
            </Container>
        </section>
    );
}
