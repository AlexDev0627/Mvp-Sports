import { cn } from "../../lib/format";

interface ScoreLineProps {
    number: string; // e.g., "01"
    label: string; // e.g., "STARTERS"
    className?: string;
}

/**
 * Signature element v2 (frontend-design skill):
 * Broadcast scoreboard rule: ── 01 ───────── STARTERS ─────────
 * Hairline horizontal rule with a monospace number centered above.
 * Owns the structural role previously held by StitchShadow — used
 * between major sections, never as decoration on a card.
 */
export function ScoreLine({ number, label, className }: ScoreLineProps) {
    return (
        <div
            className={cn("flex items-center gap-3 select-none", className)}
            role="separator"
        >
            <span
                aria-hidden
                className="flex-1 h-px bg-[color-mix(in_srgb,var(--color-midnight)_15%,transparent)]"
            />
            <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--color-midnight)]">
                {number}
            </span>
            <span
                aria-hidden
                className="w-3 h-px bg-[color-mix(in_srgb,var(--color-midnight)_30%,transparent)]"
            />
            <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--color-midnight)] font-medium">
                {label}
            </span>
            <span
                aria-hidden
                className="flex-1 h-px bg-[color-mix(in_srgb,var(--color-midnight)_15%,transparent)]"
            />
        </div>
    );
}
