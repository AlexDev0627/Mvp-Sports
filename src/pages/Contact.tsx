import { Container } from "../components/layout/Container";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Meta } from "../components/seo/Meta";

export function Contact() {
    return (
        <>
            <Meta
                title="Contacto — MvpSports"
                description="Escríbenos por WhatsApp, email o el formulario de contacto."
            />
            <Container size="md" className="py-16">
                <p className="eyebrow mb-3">Hablemos</p>
                <h1 className="mb-6">Contacto</h1>

                <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                        <p className="text-[var(--color-midnight)]/80">
                            ¿Duda sobre tallas, un pedido o un producto? Escríbenos y
                            respondemos rápido.
                        </p>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <span className="eyebrow block">WhatsApp</span>
                                <a
                                    href="https://wa.me/584140000000"
                                    className="text-[var(--color-cyan)] hover:underline"
                                >
                                    +58 414 000 0000
                                </a>
                            </li>
                            <li>
                                <span className="eyebrow block">Email</span>
                                <a
                                    href="mailto:hola@mvpsports.ve"
                                    className="text-[var(--color-cyan)] hover:underline"
                                >
                                    hola@mvpsports.ve
                                </a>
                            </li>
                            <li>
                                <span className="eyebrow block">Horario</span>
                                <span>Lun–Vie 9:00–18:00 (UTC-4)</span>
                            </li>
                        </ul>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert("Mensaje enviado (mock).");
                        }}
                        className="space-y-4"
                    >
                        <Input label="Nombre" name="name" required />
                        <Input label="Email" name="email" type="email" required />
                        <label className="block">
                            <span className="block mb-1.5 eyebrow">Mensaje</span>
                            <textarea
                                name="message"
                                required
                                rows={5}
                                className="w-full px-3 py-2 rounded-md border border-[var(--color-midnight)]/15 bg-[var(--color-vapor)] focus:border-[var(--color-cyan)] focus:outline-none"
                            />
                        </label>
                        <Button type="submit" size="md">
                            Enviar
                        </Button>
                    </form>
                </div>
            </Container>
        </>
    );
}
