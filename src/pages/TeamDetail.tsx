import { Link, useParams } from "react-router-dom";
import {
    useProductsByTeam,
    useTeamById,
} from "../hooks/useProducts";
import { Container } from "../components/layout/Container";
import { ProductGrid } from "../components/product/ProductGrid";
import { Meta } from "../components/seo/Meta";

export function TeamDetail() {
    const { teamId } = useParams<{ teamId: string }>();
    const team = useTeamById(teamId);
    const products = useProductsByTeam(teamId ?? "");

    if (!team) {
        return (
            <Container size="md" className="py-20 text-center">
                <h1>Equipo no encontrado</h1>
                <Link
                    to="/teams"
                    className="inline-block mt-6 text-[var(--color-cyan)] hover:underline"
                >
                    ← Volver a equipos
                </Link>
            </Container>
        );
    }

    return (
        <>
            <Meta
                title={`${team.name} — MvpSports`}
                description={`Productos oficiales de ${team.name}.`}
            />
            <Container size="xl" className="pt-[5.625rem] pb-10 md:pt-[8.625rem] md:pb-16">
                <nav className="text-xs text-[var(--color-midnight)]/60 mb-6 font-mono uppercase tracking-wider">
                    <Link to="/teams" className="hover:text-[var(--color-cyan)]">
                        Equipos
                    </Link>{" "}
                    / <span className="text-[var(--color-midnight)]">{team.name}</span>
                </nav>
                <header className="mb-10">
                    <p className="eyebrow mb-2">{team.league} · {team.city}</p>
                    <h1>{team.name}</h1>
                </header>
                <ProductGrid
                    products={products}
                    emptyMessage="Pronto tendremos productos de este equipo."
                />
            </Container>
        </>
    );
}
