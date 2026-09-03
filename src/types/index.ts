// MvpSports — Domain types

export type Category =
    | "jerseys"
    | "gloves"
    | "balls"
    | "bats"
    | "caps"
    | "apparel";

export type League = "MLB" | "LVBP" | "Other";

export interface Variant {
    id: string;
    size?: string;
    color?: string;
    handedness?: "LHP" | "RHP";
    weight?: string;
    sku: string;
    stock: number;
}

export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    currency: "USD" | "VES";
    images: string[];
    category: Category;
    league: League;
    team?: string;
    variants: Variant[];
    inStock: number;
    featured?: boolean;
    bestseller?: boolean;
    createdAt: string;
}

export interface Team {
    id: string;
    name: string;
    league: League;
    logo: string;
    city: string;
}

export interface CartItem {
    productId: string;
    variantId: string;
    qty: number;
}

export interface CartLine extends CartItem {
    product: Product;
    variant: Variant;
    lineTotal: number;
}

export interface CategoryMeta {
    id: Category;
    label: string;
    description: string;
    icon: string;
}
