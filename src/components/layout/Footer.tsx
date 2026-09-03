import { Link } from "react-router-dom";
import { Container } from "./Container";
import logo from "../../assets/logo.png";
import mlbBadge from "../../assets/mlb2.jpg";

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="mt-auto bg-[var(--color-midnight)] text-[var(--color-vapor)]">
            <Container size="xl" className="py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                <div>
                    <Link to="/" className="inline-block mb-4">
                        <img
                            src={logo}
                            alt="MvpSports"
                            className="h-15 w-auto"
                            onClick={() =>
                                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                            }
                        />
                    </Link>
                    <p className="text-[13px] text-[color-mix(in_srgb,var(--color-vapor)_65%,transparent)] max-w-xs leading-relaxed">
                        Gear de béisbol para el fan casual en Venezuela y Latam.
                        Réplicas oficiales MLB y LVBP, guantes, bates y más.
                    </p>
                </div>

                <div>
                    <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-gold)] mb-3">
                        Tienda
                    </h4>
                    <ul className="space-y-2 text-[13px]">
                        <li><Link
                            to="/"
                            className="hover:text-[var(--color-gold)] transition-colors"
                            onClick={() =>
                                window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                            }
                        >
                            Inicio
                        </Link>
                        </li>
                        <li>
                            <Link
                                to="/shop"
                                className="hover:text-[var(--color-gold)] transition-colors"
                            >
                                Catálogo
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/shop/jerseys"
                                className="hover:text-[var(--color-gold)] transition-colors"
                            >
                                Jerseys
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/shop/gloves"
                                className="hover:text-[var(--color-gold)] transition-colors"
                            >
                                Guantes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/shop/bats"
                                className="hover:text-[var(--color-gold)] transition-colors"
                            >
                                Bates
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-gold)] mb-3">
                        Compañía
                    </h4>
                    <ul className="space-y-2 text-[13px]">
                        <li>
                            <Link
                                to="/about"
                                className="hover:text-[var(--color-gold)] transition-colors"
                            >
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="hover:text-[var(--color-gold)] transition-colors"
                            >
                                Contacto
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/teams"
                                className="hover:text-[var(--color-gold)] transition-colors"
                            >
                                Equipos
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-gold)] mb-3">
                        Partner oficial
                    </h4>
                    <a
                        href="https://www.mlb.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                    >
                        <img
                            src={mlbBadge}
                            alt="MLB"
                            className="h-16 w-auto rounded-md hover:opacity-80 transition-opacity"
                        />
                    </a>
                    <p className="mt-3 text-[12px] text-[color-mix(in_srgb,var(--color-vapor)_55%,transparent)]">
                        Productos con licencia oficial MLB.
                    </p>
                </div>
            </Container>
            <div className="border-t border-[color-mix(in_srgb,var(--color-vapor)_15%,transparent)]">
                <Container
                    size="xl"
                    className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[color-mix(in_srgb,var(--color-vapor)_45%,transparent)]"
                >
                    <span>© {year} MvpSports. Todos los derechos reservados.</span>
                    <span className="font-mono tracking-[0.1em]">
                        Diseñado por{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://my-portfolio-pi-lac-63.vercel.app/"
                            className="hover:text-[var(--color-gold)] transition-colors"
                        >
                            Yofrank
                        </a>
                    </span>
                </Container>
            </div>
        </footer>
    );
}
