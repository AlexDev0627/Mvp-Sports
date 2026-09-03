import { useTeams } from "../hooks/useProducts";
import { Container } from "../components/layout/Container";
import { Meta } from "../components/seo/Meta";
import { Link } from "react-router-dom";

export function TeamIndex() {
    const teams = useTeams();
    const mlb = teams.filter((t) => t.league === "MLB");
    const lvbp = teams.filter((t) => t.league === "LVBP");

    return (
        <>
            <Meta
                title="Equipos — MvpSports"
                description="Compra por tu equipo favorito. MLB y LVBP."
            />
            <Container size="xl" className="pt-[5.625rem] pb-10 md:pt-[8.625rem] md:pb-16">
                <header className="mb-10">
                    <p className="eyebrow mb-2">02 — Lineup</p>
                    <h1>Equipos</h1>
                </header>

                <section className="mb-12">
                    <h2 className="mb-6">MLB</h2>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {mlb.map((t) => (
                            <li key={t.id}>
                                <Link
                                    to={`/teams/${t.id}`}
                                    className="block p-4 rounded-md border border-[var(--color-midnight)]/10 bg-[var(--color-vapor)] hover:border-[var(--color-cyan)] transition-colors"
                                >
                                    <p className="eyebrow text-[var(--color-cyan)]">
                                        {t.league}
                                    </p>
                                    <p className="font-display text-xl mt-1 leading-tight">
                                        {t.name}
                                    </p>
                                    <p className="text-xs text-[var(--color-midnight)]/60 mt-1">
                                        {t.city}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="mb-6">LVBP</h2>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {lvbp.map((t) => (
                            <li key={t.id}>
                                <Link
                                    to={`/teams/${t.id}`}
                                    className="block p-4 rounded-md border border-[var(--color-midnight)]/10 bg-[var(--color-vapor)] hover:border-[var(--color-cyan)] transition-colors"
                                >
                                    <p className="eyebrow text-[var(--color-cyan)]">
                                        {t.league}
                                    </p>
                                    <p className="font-display text-xl mt-1 leading-tight">
                                        {t.name}
                                    </p>
                                    <p className="text-xs text-[var(--color-midnight)]/60 mt-1">
                                        {t.city}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </Container>
        </>
    );
}
