import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useCart } from "../../store/cartStore";
import { Container } from "./Container";
import { cn } from "../../lib/format";
import logo from "../../assets/logo.png";

const links = [
    { to: "/", label: "Inicio" },
    { to: "/shop", label: "Tienda" },
    { to: "/teams", label: "Equipos" },
    { to: "/about", label: "Nosotros" },
    { to: "/contact", label: "Contacto" },
];

const SCROLL_THRESHOLD = 8;

export function Navbar() {
    const count = useCart((s) => s.count);
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY >= SCROLL_THRESHOLD);
        }
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close drawer on route change
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    // Lock body scroll when drawer open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <header
            className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out",
                scrolled
                    ? "shadow-[0_12px_48px_-12px_color-mix(in_srgb,var(--color-navy)_70%,transparent)]"
                    : "shadow-none",
            )}
        >
            {/* Glass layer */}
            <div
                aria-hidden
                className={cn(
                    "absolute inset-0 -z-10 transition-all duration-500",
                    scrolled || open
                        ? "opacity-100 bg-[color-mix(in_srgb,var(--color-midnight)_65%,transparent)] backdrop-blur-xl backdrop-saturate-150"
                        : "opacity-0",
                )}
            />

            <Container size="xl" className="flex items-center justify-between h-16">
                <Link
                    to="/"
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
                    className="flex items-center gap-2 group"
                >
                    <img
                        src={logo}
                        alt="MvpSports"
                        className={cn(
                            "w-auto transition-all duration-500",
                            scrolled || open ? "h-10" : "h-12",
                        )}
                    />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-7">
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
                            className={({ isActive }) =>
                                cn(
                                    "text-[12px] uppercase tracking-[0.15em] font-medium transition-colors duration-300",
                                    scrolled
                                        ? isActive
                                            ? "text-[var(--color-cyan)]"
                                            : "text-[var(--color-vapor)]/85 hover:text-[var(--color-cyan)]"
                                        : "text-[var(--color-vapor)] hover:text-[var(--color-cyan)]",
                                )
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Right cluster: cart + hamburger */}
                <div className="flex items-center gap-2">
                    <Link
                        to="/cart"
                        className={cn(
                            "hidden md:inline-flex items-center gap-2 px-3 py-2 transition-colors duration-300",
                            scrolled
                                ? "text-[var(--color-vapor)]/85 hover:text-[var(--color-cyan)]"
                                : "text-[var(--color-vapor)] hover:text-[var(--color-cyan)]",
                        )}
                        aria-label={`Carrito (${count})`}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                        >
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                        </svg>
                        {count > 0 && (
                            <span className="font-mono text-[12px] tabular-nums">
                                {count.toString()}
                            </span>
                        )}
                    </Link>

                    {/* Hamburger (mobile only) — clean SVG with morph */}
                    <button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        aria-label={open ? "Cerrar menú" : "Abrir menú"}
                        aria-expanded={open}
                        className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-md text-[var(--color-vapor)] hover:bg-[color-mix(in_srgb,var(--color-cyan)_15%,transparent)] hover:text-[var(--color-cyan)] transition-colors"
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            aria-hidden
                        >
                            <line
                                x1="4" y1="7" x2="20" y2="7"
                                className="transition-all duration-300 origin-center"
                                style={{
                                    transform: open ? "translateY(5px) rotate(45deg)" : "none",
                                }}
                            />
                            <line
                                x1="4" y1="12" x2="20" y2="12"
                                className="transition-all duration-300"
                                style={{ opacity: open ? 0 : 1 }}
                            />
                            <line
                                x1="4" y1="17" x2="20" y2="17"
                                className="transition-all duration-300 origin-center"
                                style={{
                                    transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
                                }}
                            />
                        </svg>
                    </button>
                </div>
            </Container>

            {/* Mobile drawer */}
            <div
                className={cn(
                    "md:hidden fixed inset-x-0 top-16 bottom-0 z-40 transition-all duration-300",
                    open
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none",
                )}
                aria-hidden={!open}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-[var(--color-midnight)]/60 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                />
                {/* Panel */}
                <nav
                    className={cn(
                        "relative h-full w-full max-w-xs ml-auto bg-[var(--color-midnight)] border-l border-[color-mix(in_srgb,var(--color-cyan)_25%,transparent)] transition-transform duration-300 ease-out flex flex-col",
                        open ? "translate-x-0" : "translate-x-full",
                    )}
                >
                    <ul className="flex-1 px-6 py-8 space-y-1">
                        {links.map((l, idx) => (
                            <li
                                key={l.to}
                                style={{
                                    transitionDelay: open ? `${idx * 60}ms` : "0ms",
                                }}
                                className={cn(
                                    "transition-all duration-300",
                                    open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
                                )}
                            >
                                <NavLink
                                    to={l.to}
                                    end={l.to === "/"}
                                    className={({ isActive }) =>
                                        cn(
                                            "block py-4 px-3 text-2xl font-display uppercase tracking-wide border-b border-[color-mix(in_srgb,var(--color-vapor)_10%,transparent)] transition-colors",
                                            isActive
                                                ? "text-[var(--color-cyan)]"
                                                : "text-[var(--color-vapor)] hover:text-[var(--color-cyan)]",
                                        )
                                    }
                                >
                                    {l.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="px-6 py-6 border-t border-[color-mix(in_srgb,var(--color-vapor)_10%,transparent)] space-y-4">
                        <Link
                            to="/cart"
                            className="flex items-center justify-between py-3 px-3 rounded-md bg-[color-mix(in_srgb,var(--color-cyan)_12%,transparent)] border border-[color-mix(in_srgb,var(--color-cyan)_30%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-cyan)_20%,transparent)] transition-colors"
                        >
                            <span className="font-display text-lg uppercase tracking-wide text-[var(--color-vapor)]">
                                Carrito
                            </span>
                            {count > 0 && (
                                <span className="font-mono text-sm tabular-nums text-[var(--color-cyan)]">
                                    {count.toString().padStart(2, "0")}
                                </span>
                            )}
                        </Link>
                        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-gold)]">
                            MvpSports
                        </p>
                        <p className="text-xs text-[var(--color-vapor)]/60">
                            Hecho en Caracas · Temporada 2025
                        </p>
                    </div>
                </nav>
            </div>
        </header>
    );
}
