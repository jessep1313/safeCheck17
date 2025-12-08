import FieldErrorMessage from "@/components/form/field-error-message";
import TiptapEditor from "@/components/form/tip-tap";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useComment from "@/hooks/tours/use-comment";
import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { ArrowRight } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Bitacora de recorridos', href: '/recorridos' },
    { title: 'Temporizador', href: '' },
];

export default function Comment () {

    const { data, errors, onChangeValue, onSubmit, processing } = useComment()

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Deja tus observaciones" text="Describe la incidencia encontrada en el recorrido dentro del recuadro de abajo." />
            <form className="px-4" onSubmit={onSubmit}>
                <fieldset>
                    <TiptapEditor value={data.comment ?? ''} onChange={onChangeValue} />
                    {errors.comment && (<FieldErrorMessage message={errors.comment} />)}
                </fieldset>
                <footer className="mt-5">
                    <Button disabled={processing}>
                        Guardar comentario
                        {processing ? <Spinner /> : <ArrowRight />}
                    </Button>
                </footer>
            </form>
        </AppLayout>
    );
}