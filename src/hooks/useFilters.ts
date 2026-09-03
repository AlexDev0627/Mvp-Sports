import { useState } from "react";
import type { Product, League, Category } from "../types";

export interface FilterState {
    category?: Category;
    league?: League;
    team?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
}

export function useFilters(initial: FilterState = {}) {
    const [filters, setFilters] = useState<FilterState>(initial);

    const apply = (items: Product[]) =>
        items.filter((p) => {
            if (filters.category && p.category !== filters.category) return false;
            if (filters.league && p.league !== filters.league) return false;
            if (filters.team && p.team !== filters.team) return false;
            if (filters.minPrice !== undefined && p.price < filters.minPrice)
                return false;
            if (filters.maxPrice !== undefined && p.price > filters.maxPrice)
                return false;
            if (filters.search) {
                const q = filters.search.toLowerCase();
                const hay = `${p.name} ${p.description}`.toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });

    const reset = () => setFilters(initial);

    return { filters, setFilters, apply, reset } as const;
}
