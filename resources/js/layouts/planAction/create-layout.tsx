import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, ArrowRight, LucideIcon } from "lucide-react";

interface Props {
    children: React.ReactNode,
    title: string
    text: string
    icon: LucideIcon
    onSubmit?: () => void
    processing: boolean
    toBack?: string
    toNext?: string
}


export default ({ children, title, icon: Icon, text, onSubmit, processing, toBack, toNext }: Props) => {

    return (
        <div className="flex min-h-dvh items-center justify-center flex-col w-full">
            <Head title={`Nuevo plan: ${title}`} />
            <article className="w-full max-w-xl flex flex-col gap-4">
                <header className="justify-between flex gap-3">
                    <div>
                        <h1 className="text-xl font-bold">{title}</h1>
                        <p className="text-muted-foreground text-sm text-pretty">{text}</p>
                    </div>
                    <div>
                        <Icon />
                    </div>
                </header>
                <div>{children}</div>
                <footer className="flex gap-2 justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant={"secondary"} disabled={!toBack} asChild={!!toBack}>
                            {toBack ? (
                                <Link href={toBack}>
                                    <ArrowLeft /> Regresar
                                </Link>
                            ) : (
                                <>
                                    <ArrowLeft /> Regresar
                                </>
                            )}
                        </Button>
                        {toNext ? (
                            <Button asChild>
                                <Link href={toNext}>
                                    <ArrowRight /> Continuar
                                </Link>
                            </Button>
                        ) : (
                            <Button onClick={onSubmit} disabled={processing}>{processing ? "Procesando..." : "Continuar"} {processing ? <Spinner /> : <ArrowRight />}</Button>
                        )}
                    </div>
                </footer>
            </article>
        </div>
    )
}