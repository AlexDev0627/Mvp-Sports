import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "../../lib/format";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className, id, ...rest }: InputProps) {
    const inputId = id ?? rest.name;
    return (
        <label className="block" htmlFor={inputId}>
            {label && (
                <span className="block mb-1.5 eyebrow">{label}</span>
            )}
            <input
                id={inputId}
                className={cn(
                    "w-full h-11 px-3 rounded-md border bg-[var(--color-vapor)]",
                    "border-[var(--color-midnight)]/15 focus:border-[var(--color-cyan)] focus:outline-none",
                    "text-[var(--color-midnight)] placeholder:text-[var(--color-midnight)]/40",
                    error && "border-[var(--color-bat-red)]",
                    className,
                )}
                {...rest}
            />
            {error && (
                <span className="block mt-1 text-sm text-[var(--color-bat-red)]">
                    {error}
                </span>
            )}
        </label>
    );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: Array<{ value: string; label: string }>;
}

export function Select({
    label,
    error,
    options,
    className,
    id,
    ...rest
}: SelectProps) {
    const selectId = id ?? rest.name;
    return (
        <label className="block" htmlFor={selectId}>
            {label && <span className="block mb-1.5 eyebrow">{label}</span>}
            <select
                id={selectId}
                className={cn(
                    "w-full h-11 px-3 rounded-md border bg-[var(--color-vapor)]",
                    "border-[var(--color-midnight)]/15 focus:border-[var(--color-cyan)] focus:outline-none",
                    "text-[var(--color-midnight)]",
                    error && "border-[var(--color-bat-red)]",
                    className,
                )}
                {...rest}
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            {error && (
                <span className="block mt-1 text-sm text-[var(--color-bat-red)]">
                    {error}
                </span>
            )}
        </label>
    );
}
