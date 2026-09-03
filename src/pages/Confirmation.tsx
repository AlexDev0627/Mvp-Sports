import { Link, useParams } from "react-router-dom";
import { Container } from "../components/layout/Container";
import { Meta } from "../components/seo/Meta";

export function Confirmation() {
    const { id } = useParams<{ id: string }>();
    return (
        <>
            <Meta title="Pedido confirmado — MvpSports" />
            <Container size="md" className="py-20 text-center">
                <p className="eyebrow mb-3">Pedido confirmado</p>
                <h1 className="mb-4">Gracias por tu compra</h1>
                <p className="text-[var(--color-midnight)]/70 max-w-md mx-auto">
                    Recibirás un email con los detalles. Tu número de pedido es:
                </p>
                <p className="font-mono text-2xl mt-3 mb-8 tabular-nums">{id}</p>
                <Link
                    to="/shop"
                    className="inline-block px-5 py-2.5 rounded-full bg-[var(--color-cyan)] text-[var(--color-vapor)] uppercase tracking-wider text-sm font-medium hover:bg-[var(--color-navy)]"
                >
                    Seguir comprando
                </Link>
            </Container>
        </>
    );
}
