import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "../store/cartStore";
import { Container } from "../components/layout/Container";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Meta } from "../components/seo/Meta";
import { formatPrice } from "../lib/format";

const schema = z.object({
    name: z.string().min(2, "Indícanos tu nombre"),
    email: z.string().email("Email inválido"),
    address: z.string().min(5, "Dirección requerida"),
    city: z.string().min(2, "Ciudad requerida"),
    phone: z.string().min(7, "Teléfono requerido"),
});

type FormData = z.infer<typeof schema>;

export function Checkout() {
    const navigate = useNavigate();
    const items = useCart((s) => s.items);
    const subtotal = useCart((s) => s.subtotal);
    const clear = useCart((s) => s.clear);
    const [submitting, setSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const shipping = subtotal >= 100 ? 0 : 8.5;
    const total = subtotal + shipping;

    function onSubmit() {
        setSubmitting(true);
        // Mock processing
        setTimeout(() => {
            const id = `MV-${Date.now().toString(36).toUpperCase()}`;
            clear();
            navigate(`/order/${id}/confirmation`);
        }, 700);
    }

    if (items.length === 0) {
        return (
            <Container size="md" className="py-20 text-center">
                <h1>Carrito vacío</h1>
                <p className="mt-2 text-[var(--color-midnight)]/70">
                    No tienes artículos para pagar.
                </p>
            </Container>
        );
    }

    return (
        <>
            <Meta title="Checkout — MvpSports" />
            <Container size="xl" className="pt-[5.625rem] pb-10 md:pt-[8.625rem] md:pb-16">
                <header className="mb-8">
                    <p className="eyebrow mb-2">Finalizar</p>
                    <h1>Checkout</h1>
                </header>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid lg:grid-cols-[1fr_360px] gap-10"
                >
                    <div className="space-y-4">
                        <Input
                            label="Nombre completo"
                            {...register("name")}
                            error={errors.name?.message}
                        />
                        <Input
                            label="Email"
                            type="email"
                            {...register("email")}
                            error={errors.email?.message}
                        />
                        <Input
                            label="Dirección de envío"
                            {...register("address")}
                            error={errors.address?.message}
                        />
                        <div className="grid sm:grid-cols-2 gap-4">
                            <Input
                                label="Ciudad"
                                {...register("city")}
                                error={errors.city?.message}
                            />
                            <Input
                                label="Teléfono"
                                {...register("phone")}
                                error={errors.phone?.message}
                            />
                        </div>
                        <p className="text-xs text-[var(--color-midnight)]/60 font-mono">
                            Pago: contra entrega o transferencia (mock).
                        </p>
                    </div>

                    <aside className="border border-[color-mix(in_srgb,var(--color-midnight)_15%,transparent)] bg-[var(--color-vapor)] p-6 h-fit">
                        <h2 className="font-display text-2xl mb-5">Resumen</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-[var(--color-midnight)]/70">Subtotal</dt>
                                <dd className="font-mono tabular-nums">
                                    {formatPrice(subtotal)}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-[var(--color-midnight)]/70">Envío</dt>
                                <dd className="font-mono tabular-nums">
                                    {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                                </dd>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-[var(--color-midnight)]/10 text-base">
                                <dt className="font-medium">Total</dt>
                                <dd className="font-mono font-bold tabular-nums">
                                    {formatPrice(total)}
                                </dd>
                            </div>
                        </dl>
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full mt-5"
                            disabled={submitting}
                        >
                            {submitting ? "Procesando..." : "Confirmar pedido"}
                        </Button>
                    </aside>
                </form>
            </Container>
        </>
    );
}
