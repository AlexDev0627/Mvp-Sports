import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, Variant, CartLine } from "../types";
import productsData from "../data/products.json";
import type { Product as P } from "../types";

const products = productsData as P[];

interface CartState {
    items: CartItem[];
    lines: CartLine[];
    count: number;
    subtotal: number;
    add: (productId: string, variantId: string, qty?: number) => void;
    remove: (productId: string, variantId: string) => void;
    updateQty: (productId: string, variantId: string, qty: number) => void;
    clear: () => void;
}

function findProduct(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}
function findVariant(product: Product, id: string): Variant | undefined {
    return product.variants.find((v) => v.id === id);
}

function derive(items: CartItem[]): Pick<CartState, "lines" | "count" | "subtotal"> {
    const lines: CartLine[] = [];
    let count = 0;
    let subtotal = 0;
    for (const i of items) {
        const product = findProduct(i.productId);
        const variant = product && findVariant(product, i.variantId);
        if (!product || !variant) continue;
        lines.push({ ...i, product, variant, lineTotal: product.price * i.qty });
        count += i.qty;
        subtotal += product.price * i.qty;
    }
    return { lines, count, subtotal };
}

export const useCart = create<CartState>()(
    persist(
        (set, _get) => ({
            items: [],
            lines: [],
            count: 0,
            subtotal: 0,

            add: (productId, variantId, qty = 1) => {
                const product = findProduct(productId);
                const variant = product && findVariant(product, variantId);
                if (!product || !variant) return;
                if (variant.stock < qty) return;

                set((state) => {
                    const existing = state.items.find(
                        (i) => i.productId === productId && i.variantId === variantId,
                    );
                    let nextItems: CartItem[];
                    if (existing) {
                        const newQty = Math.min(existing.qty + qty, variant.stock);
                        nextItems = state.items.map((i) =>
                            i.productId === productId && i.variantId === variantId
                                ? { ...i, qty: newQty }
                                : i,
                        );
                    } else {
                        nextItems = [...state.items, { productId, variantId, qty }];
                    }
                    return { items: nextItems, ...derive(nextItems) };
                });
            },

            remove: (productId, variantId) => {
                set((state) => {
                    const nextItems = state.items.filter(
                        (i) => !(i.productId === productId && i.variantId === variantId),
                    );
                    return { items: nextItems, ...derive(nextItems) };
                });
            },

            updateQty: (productId, variantId, qty) => {
                if (qty <= 0) {
                    set((state) => {
                        const nextItems = state.items.filter(
                            (i) => !(i.productId === productId && i.variantId === variantId),
                        );
                        return { items: nextItems, ...derive(nextItems) };
                    });
                    return;
                }
                const product = findProduct(productId);
                const variant = product && findVariant(product, variantId);
                if (!variant) return;
                const clamped = Math.min(qty, variant.stock);
                set((state) => {
                    const nextItems = state.items.map((i) =>
                        i.productId === productId && i.variantId === variantId
                            ? { ...i, qty: clamped }
                            : i,
                    );
                    return { items: nextItems, ...derive(nextItems) };
                });
            },

            clear: () => {
                const empty: CartItem[] = [];
                set({ items: empty, ...derive(empty) });
            },
        }),
        {
            name: "mvpsports-cart",
            // Persist only the items; derived values recompute on rehydrate
            partialize: (state) => ({ items: state.items }) as Pick<CartState, "items">,
            merge: (persistedState, currentState) => {
                const items = (persistedState as { items?: CartItem[] })?.items ?? [];
                return { ...currentState, items, ...derive(items) };
            },
        },
    ),
);
