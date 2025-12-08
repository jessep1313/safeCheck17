import Datatable from "@/components/datatable/datatable";
import { columns } from "@/components/tours/column";
import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Control de incidencias', href: '/control-de-incidencias' },
    { title: 'Recorridos', href: '/control-de-incidencias/recorridos' },
];

export default function tours () {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Incidencias de recorridos" text="Control de incidencias encontradas en los rondines" />
            <section className="px-4">
                <Datatable columns={columns()} routeName="incidences-control.rounds" />
            </section>
        </AppLayout>
    )
}