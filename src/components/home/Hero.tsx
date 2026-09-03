import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import hero1 from "../../assets/campo.jpg";
import hero2 from "../../assets/tim-gouw-VvQSzMJ_h0U-unsplash.jpg";
import hero3 from "../../assets/people.jpg";
import hero4 from "../../assets/bola2.jpg";
import hero5 from "../../assets/lateral.jpg";
import hero6 from "../../assets/mlb.jpg";

const slides = [
    { src: hero1, alt: "Béisbol en acción" },
    { src: hero2, alt: "Estadio de béisbol" },
    { src: hero3, alt: "Campo de juego" },
    { src: hero4, alt: "Gear deportivo" },
    { src: hero5, alt: "Gear deportivo" },
    { src: hero6, alt: "MLB" },
];

const ROTATE_MS = 10000;

export function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length);
        }, ROTATE_MS);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="relative isolate overflow-hidden text-[var(--color-vapor)] min-h-screen flex items-center pt-16">
            {/* Base layer: slide 0 always visible underneath, no transition, seamless loop */}
            <img
                src={slides[0].src}
                alt={slides[0].alt}
                aria-hidden={index !== 0}
                className="absolute inset-0 -z-20 w-full h-full object-cover"
                style={{ opacity: index === 0 ? 1 : 0 }}
            />
            {/* Overlays: slides 1..N crossfade on top. Each has its own opacity tween. */}
            {slides.slice(1).map((s, idx) => {
                const i = idx + 1;
                const isCurrent = i === index;
                return (
                    <img
                        key={s.src}
                        src={s.src}
                        alt={s.alt}
                        aria-hidden={!isCurrent}
                        className="absolute inset-0 -z-20 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out"
                        style={{ opacity: isCurrent ? 1 : 0 }}
                    />
                );
            })}
            {/* Gradient overlay: midnight on left, mid center, lighter right */}
            <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-r from-[color-mix(in_srgb,var(--color-midnight)_95%,transparent)] via-[color-mix(in_srgb,var(--color-midnight)_75%,transparent)] to-[color-mix(in_srgb,var(--color-midnight)_40%,transparent)]"
            />
            <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_30%,color-mix(in_srgb,var(--color-cyan)_25%,transparent),transparent_50%)]"
            />
            <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-48 -z-10 bg-gradient-to-b from-transparent via-[color-mix(in_srgb,var(--color-midnight)_70%,transparent)] to-[var(--color-midnight)]"
            />

            <Container size="xl" className="relative z-10 py-20 md:py-28">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-gold)] shadow-[0_0_12px_var(--color-gold)]" />
                        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--color-gold)] font-semibold">
                            Temporada 2025 · LVBP + MLB
                        </p>
                    </div>

                    <h1 className="font-display leading-[0.9] mb-6">
                        <span className="block text-[clamp(2.5rem,7vw,5.5rem)] text-[var(--color-vapor)] [text-shadow:0_4px_30px_rgba(0,0,0,0.5)]">
                            Tu equipo.
                        </span>
                        <span className="block text-[clamp(2.5rem,7vw,5.5rem)] italic text-[var(--color-gold)] [text-shadow:0_0_40px_color-mix(in_srgb,var(--color-gold)_50%,transparent)]">
                            Tu estilo.
                        </span>
                        <span className="block text-[clamp(2.5rem,7vw,5.5rem)] text-[var(--color-cyan)] [text-shadow:0_0_40px_color-mix(in_srgb,var(--color-cyan)_50%,transparent)]">
                            Tu cancha.
                        </span>
                    </h1>

                    <p className="text-[17px] text-[var(--color-vapor)]/85 max-w-xl mb-8 leading-relaxed font-medium">
                        Jerseys, guantes, bates y gorras para el fan del
                        béisbol en{" "}
                        <span className="text-[var(--color-cyan)] font-semibold">
                            Venezuela
                        </span>{" "}
                        y Latam. Réplicas oficiales, marcas que usan los
                        profesionales.
                    </p>

                    <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-10 pb-8 border-b border-[color-mix(in_srgb,var(--color-vapor)_20%,transparent)]">
                        <div>
                            <div className="font-display text-3xl text-[var(--color-cyan)]">
                                500+
                            </div>
                            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-vapor)]/60">
                                Productos
                            </div>
                        </div>
                        <div>
                            <div className="font-display text-3xl text-[var(--color-gold)]">
                                12
                            </div>
                            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-vapor)]/60">
                                Equipos
                            </div>
                        </div>
                        <div>
                            <div className="font-display text-3xl text-[var(--color-vapor)]">
                                24h
                            </div>
                            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-vapor)]/60">
                                Despacho
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link to="/shop">
                            <Button size="lg" className="shadow-[0_0_30px_color-mix(in_srgb,var(--color-cyan)_40%,transparent)]">
                                Ver tienda →
                            </Button>
                        </Link>
                        <Link to="/teams">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="bg-transparent text-[var(--color-vapor)] border-[color-mix(in_srgb,var(--color-vapor)_50%,transparent)] hover:bg-[color-mix(in_srgb,var(--color-vapor)_10%,transparent)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                            >
                                Equipos
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-8 left-5 right-5 md:left-8 md:right-8 flex items-center gap-2 z-20 max-w-7xl mx-auto">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Ir a imagen ${i + 1}`}
                            className="group relative h-1 flex-1 max-w-24 bg-[color-mix(in_srgb,var(--color-vapor)_25%,transparent)] overflow-hidden rounded-full transition-colors hover:bg-[color-mix(in_srgb,var(--color-vapor)_40%,transparent)]"
                        >
                            <span
                                className="absolute inset-y-0 left-0 bg-[var(--color-cyan)] transition-all ease-linear rounded-full"
                                style={{
                                    width:
                                        i === index
                                            ? "100%"
                                            : i < index
                                                ? "100%"
                                                : "0%",
                                    transitionDuration:
                                        i === index
                                            ? `${ROTATE_MS}ms`
                                            : "300ms",
                                }}
                            />
                        </button>
                    ))}
                </div>
            </Container>
        </section>
    );
}
