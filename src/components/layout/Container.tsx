import type { ReactNode } from "react";
import { cn } from "../../lib/format";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    as?: "div" | "section" | "header" | "footer" | "main";
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeClass = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[1400px]",
};

export function Container({
    children,
    className,
    as: Tag = "div",
    size = "lg",
}: ContainerProps) {
    return (
        <Tag className={cn("w-full mx-auto px-5 md:px-8", sizeClass[size], className)}>
            {children}
        </Tag>
    );
}
