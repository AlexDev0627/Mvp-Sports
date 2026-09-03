import { Link } from "react-router-dom";
import {
    useJerseysWithImages,
} from "../hooks/useProducts";
import { Hero } from "../components/home/Hero";
import { FeaturedSection } from "../components/home/FeaturedSection";
import { TeamsBanner } from "../components/home/TeamsBanner";
import { TeamGrid } from "../components/home/TeamGrid";
import { Meta } from "../components/seo/Meta";
import { Container } from "../components/layout/Container";

export function Home() {
    const jerseys = useJerseysWithImages();
    return (
        <>
            <Meta
                title="MvpSports — Gear up. Game on."
                description="Tienda de ropa y artículos de béisbol. Réplicas MLB y LVBP, guantes, bates y más para el fan casual en Venezuela y Latam."
            />
            <Hero />
            <FeaturedSection
                number="01"
                label="Starters"
                title="Jerseys destacados"
                products={jerseys}
            >
                <Link
                    to="/shop/jerseys"
                    className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-midnight)] hover:text-[var(--color-cyan)] transition-colors"
                >
                    Ver jerseys →
                </Link>
            </FeaturedSection>
            <TeamsBanner />
            <TeamGrid />
            <FeaturedSection
                number="03"
                label="Heavy hitters"
                title="Más vendidos"
                products={jerseys}
            />

            {/* Editorial closing band */}
            <section className="py-16 md:py-24 border-t border-[color-mix(in_srgb,var(--color-midnight)_10%,transparent)]">
                <Container size="xl">
                    <div className="grid md:grid-cols-3 gap-10">
                        <div>
                            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color-mix(in_srgb,var(--color-midnight)_60%,transparent)] mb-2">
                                04 — Envíos
                            </p>
                            <h3 className="mb-2 text-[17px]">Toda Venezuela</h3>
                            <p className="text-sm text-[color-mix(in_srgb,var(--color-midnight)_70%,transparent)]">
                                3-5 días hábiles. Gratis sobre $100.
                            </p>
                        </div>
                        <div>
                            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color-mix(in_srgb,var(--color-midnight)_60%,transparent)] mb-2">
                                05 — Devoluciones
                            </p>
                            <h3 className="mb-2 text-[17px]">14 días</h3>
                            <p className="text-sm text-[color-mix(in_srgb,var(--color-midnight)_70%,transparent)]">
                                Cambios y devoluciones gratis dentro del período.
                            </p>
                        </div>
                        <div>
                            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[color-mix(in_srgb,var(--color-midnight)_60%,transparent)] mb-2">
                                06 — Soporte
                            </p>
                            <h3 className="mb-2 text-[17px]">WhatsApp directo</h3>
                            <p className="text-sm text-[color-mix(in_srgb,var(--color-midnight)_70%,transparent)]">
                                Lun–Vie 9:00–18:00. Respuesta en minutos.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
}
