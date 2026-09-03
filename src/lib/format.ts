// MvpSports — Small utilities

export function formatPrice(value: number, currency: "USD" | "VES" = "USD") {
    if (currency === "USD") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
        }).format(value);
    }
    return new Intl.NumberFormat("es-VE", {
        style: "currency",
        currency: "VES",
        maximumFractionDigits: 2,
    }).format(value);
}

export function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

export function pluralize(count: number, singular: string, plural: string) {
    return count === 1 ? singular : plural;
}
