import type { ReactNode } from "react";
import { cn } from "../../lib/format";

type Tone = "default" | "accent" | "danger";

interface BadgeProps {
    tone?: Tone;
    children: ReactNode;
    className?: string;
}

const toneClass: Record<Tone, string> = {
    default:
        "bg-[color-mix(in_srgb,var(--color-midnight)_6%,transparent)] text-[var(--color-midnight)]",
    accent:
        "bg-[var(--color-cyan)] text-[var(--color-vapor)]",
    danger:
        "bg-[var(--color-bat-red)] text-[var(--color-vapor)]",
};

export function Badge({ tone = "default", children, className }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2 py-0.5 font-mono uppercase tracking-[0.1em] text-[10px]",
                toneClass[tone],
                className,
            )}
        >
            {children}
        </span>
    );
}
