import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/format";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    children: ReactNode;
}

const variantClass: Record<Variant, string> = {
    primary:
        "bg-[var(--color-midnight)] text-[var(--color-vapor)] hover:bg-[var(--color-cyan)]",
    secondary:
        "bg-[var(--color-vapor)] text-[var(--color-midnight)] border border-[color-mix(in_srgb,var(--color-midnight)_25%,transparent)] hover:border-[var(--color-midnight)]",
    ghost:
        "bg-transparent text-[var(--color-midnight)] hover:text-[var(--color-cyan)]",
    danger:
        "bg-[var(--color-bat-red)] text-[var(--color-vapor)] hover:opacity-90",
};

const sizeClass: Record<Size, string> = {
    sm: "h-9 px-3 text-[13px]",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-[15px]",
};

export function Button({
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.08em] transition-colors",
                "rounded-sm disabled:opacity-40 disabled:cursor-not-allowed",
                variantClass[variant],
                sizeClass[size],
                className,
            )}
            {...rest}
        >
            {children}
        </button>
    );
}
