import { Container } from "../components/layout/Container";
import { Meta } from "../components/seo/Meta";

export function About() {
    return (
        <>
            <Meta
                title="Nosotros — MvpSports"
                description="La historia detrás de MvpSports y por qué vendemos béisbol en Latam."
            />
            <Container size="md" className="py-16">
                <p className="eyebrow mb-3">Nuestra historia</p>
                <h1 className="mb-6">Hecho por fans, para fans</h1>
                <div className="prose-like space-y-4 text-[var(--color-midnight)]/80 leading-relaxed">
                    <p>
                        MvpSports nació en Valencia con una idea simple: hacer que el gear
                        de béisbol sea accesible y auténtico para los fans de Venezuela y
                        toda Latam. Demasiadas veces encontramos jerseys genéricos,
                        precios inflados o envíos de dos meses.
                    </p>
                    <p>
                        Trabajamos con réplicas oficiales MLB y LVBP, guantes y bates de
                        marcas que usan los profesionales, y mantenemos un stock pequeño
                        pero curado. Si no está en nuestra tienda, es porque no lo
                        pondríamos en nuestro propio juego.
                    </p>
                    <p>
                        Gracias por apoyar un emprendimiento local. Cada compra ayuda a
                        mantener vivo el béisbol en nuestra región.
                    </p>
                </div>
            </Container>
        </>
    );
}
