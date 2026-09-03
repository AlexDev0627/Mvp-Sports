import { useMemo } from "react";
import productsData from "../data/products.json";
import teamsData from "../data/teams.json";
import categoriesData from "../data/categories.json";
import type { Product, Team, Category, CategoryMeta } from "../types";

const products = productsData as Product[];
const teams = teamsData as Team[];
const categories = categoriesData as CategoryMeta[];

export function useProducts() {
    return products;
}

export function useProductBySlug(slug: string | undefined) {
    return useMemo(
        () => (slug ? products.find((p) => p.slug === slug) : undefined),
        [slug],
    );
}

export function useProductsByCategory(category: Category) {
    return useMemo(
        () => products.filter((p) => p.category === category),
        [category],
    );
}

export function useProductsByTeam(teamId: string) {
    return useMemo(
        () => products.filter((p) => p.team === teamId),
        [teamId],
    );
}

export function useFeaturedProducts() {
    return useMemo(() => products.filter((p) => p.featured), []);
}

export function useBestsellers() {
    return useMemo(() => products.filter((p) => p.bestseller), []);
}

export function useJerseysWithImages() {
    return useMemo(
        () => products.filter((p) => p.category === "jerseys" && p.images.length > 0),
        [],
    );
}

export function useTeams() {
    return teams;
}

export function useTeamById(id: string | undefined) {
    return useMemo(
        () => (id ? teams.find((t) => t.id === id) : undefined),
        [id],
    );
}

export function useCategories() {
    return categories;
}
