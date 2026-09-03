import { Link } from "react-router-dom";
import { useTeams } from "../../hooks/useProducts";
import { Container } from "../layout/Container";
import { ScoreLine } from "../ui/ScoreLine";

export function TeamGrid() {
    const teams = useTeams();
    const mlb = teams.filter((t) => t.league === "MLB");
    const lvbp = teams.filter((t) => t.league === "LVBP");

    return (
        <section className="py-16 md:py-24">
            <Container size="xl">
                <div className="mb-10">
                    <ScoreLine number="02" label="Lineup" className="mb-6" />
                    <h2>Equipos</h2>
                </div>

                <div className="space-y-10">
                    <div>
                        <h3 className="mb-4 font-mono text-[12px] tracking-[0.18em] uppercase text-[color-mix(in_srgb,var(--color-midnight)_60%,transparent)]">
                            Major League Baseball
                        </h3>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-[color-mix(in_srgb,var(--color-midnight)_10%,transparent)] border border-[color-mix(in_srgb,var(--color-midnight)_10%,transparent)]">
                            {mlb.map((t) => (
                                <li key={t.id}>
                                    <Link
                                        to={`/teams/${t.id}`}
                                        className="block bg-[var(--color-vapor)] p-5 h-full hover:bg-[var(--color-paper)] transition-colors"
                                    >
                                        <p className="font-mono text-[10px] tracking-[0.15em] text-[color-mix(in_srgb,var(--color-midnight)_50%,transparent)] mb-1.5">
                                            {t.city}
                                        </p>
                                        <p className="font-semibold text-[15px] leading-tight text-[var(--color-midnight)]">
                                            {t.name}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-mono text-[12px] tracking-[0.18em] uppercase text-[color-mix(in_srgb,var(--color-midnight)_60%,transparent)]">
                            Liga Venezolana de Béisbol Profesional
                        </h3>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-[color-mix(in_srgb,var(--color-midnight)_10%,transparent)] border border-[color-mix(in_srgb,var(--color-midnight)_10%,transparent)]">
                            {lvbp.map((t) => (
                                <li key={t.id}>
                                    <Link
                                        to={`/teams/${t.id}`}
                                        className="block bg-[var(--color-vapor)] p-5 h-full hover:bg-[var(--color-paper)] transition-colors"
                                    >
                                        <p className="font-mono text-[10px] tracking-[0.15em] text-[color-mix(in_srgb,var(--color-midnight)_50%,transparent)] mb-1.5">
                                            {t.city}
                                        </p>
                                        <p className="font-semibold text-[15px] leading-tight text-[var(--color-midnight)]">
                                            {t.name}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </section>
    );
}
