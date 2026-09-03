import { Link } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Meta } from "../components/seo/Meta";

export function NotFound() {
    return (
        <>
            <Meta title="404 — MvpSports" />
            <Container size="md" className="py-24 text-center">
                <p className="font-mono text-7xl text-[var(--color-cyan)] mb-3">
                    404
                </p>
                <h1 className="mb-3">Out of bounds</h1>
                <p className="text-[var(--color-midnight)]/70 mb-8">
                    La página que buscas no existe o fue movida.
                </p>
                <Link
                    to="/"
                    className="inline-block px-5 py-2.5 rounded-full bg-[var(--color-cyan)] text-[var(--color-vapor)] uppercase tracking-wider text-sm font-medium hover:bg-[var(--color-navy)]"
                >
                    Volver al home
                </Link>
            </Container>
        </>
    );
}
