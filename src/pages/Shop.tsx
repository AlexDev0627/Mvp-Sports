import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProducts, useCategories } from "../hooks/useProducts";
import { useFilters } from "../hooks/useFilters";
import { Container } from "../components/layout/Container";
import { ProductGrid } from "../components/product/ProductGrid";
import { Select } from "../components/ui/Input";
import { Meta } from "../components/seo/Meta";
import type { Category } from "../types";

export function Shop() {
    const { category: catParam } = useParams<{ category?: string }>();
    const products = useProducts();
    const categories = useCategories();
    const { filters, setFilters, apply } = useFilters({
        category: catParam as Category | undefined,
    });

    const filtered = useMemo(() => apply(products), [products, filters, apply]);

    const activeCategory = categories.find((c) => c.id === filters.category);

    return (
        <>
            <Meta
                title={
                    activeCategory
                        ? `${activeCategory.label} — MvpSports`
                        : "Tienda — MvpSports"
                }
                description="Catálogo completo de jerseys, guantes, bates, pelotas y gorras de béisbol."
            />
            <Container size="xl" className="pt-20 pb-10 md:pt-30 md:pb-16">
                <header className="mb-8">
                    <p className="eyebrow mb-2">Catálogo</p>
                    <h1>
                        {activeCategory ? activeCategory.label : "Toda la tienda"}
                    </h1>
                    {activeCategory && (
                        <p className="text-[var(--color-midnight)]/70 mt-2 max-w-xl">
                            {activeCategory.description}
                        </p>
                    )}
                </header>

                <div className="grid md:grid-cols-[220px_1fr] gap-8">
                    <aside className="space-y-5">
                        <Select
                            name="category"
                            label="Categoría"
                            value={filters.category ?? ""}
                            onChange={(e) =>
                                setFilters((f) => ({
                                    ...f,
                                    category: (e.target.value || undefined) as Category | undefined,
                                }))
                            }
                            options={[
                                { value: "", label: "Todas" },
                                ...categories.map((c) => ({ value: c.id, label: c.label })),
                            ]}
                        />
                        <Select
                            name="league"
                            label="Liga"
                            value={filters.league ?? ""}
                            onChange={(e) =>
                                setFilters((f) => ({
                                    ...f,
                                    league: (e.target.value || undefined) as
                                        | "MLB"
                                        | "LVBP"
                                        | "Other"
                                        | undefined,
                                }))
                            }
                            options={[
                                { value: "", label: "Todas" },
                                { value: "MLB", label: "MLB" },
                                { value: "LVBP", label: "LVBP" },
                                { value: "Other", label: "Otras" },
                            ]}
                        />
                    </aside>

                    <div>
                        <p className="text-sm text-[var(--color-midnight)]/60 mb-4 font-mono">
                            {filtered.length}{" "}
                            {filtered.length === 1 ? "producto" : "productos"}
                        </p>
                        <ProductGrid products={filtered} />
                    </div>
                </div>
            </Container>
        </>
    );
}
