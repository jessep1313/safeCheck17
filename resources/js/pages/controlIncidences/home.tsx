import AppHeader from "@/layouts/app-header";
import AppLayout from '@/layouts/app-layout';
import Datatable from "@/components/datatable/datatable";
import { getColumns } from "@/components/incidences/columns";
import { getActions } from "@/components/incidences/actions";
import { Incidence } from "@/types/incidences";
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Control de incidencias', href: '/control-de-incidencias' },
    { title: 'Inspecciones', href: '/control-de-incidencias/inspecciones' },
];

export default () => {
    const createPlanAction = (incidence: Incidence) => {};
    const columns = getColumns();
    const actions = getActions(createPlanAction);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title={'Incidencias de inspecciones'} text="Control de incidencias" />
            <article className="container">
                <Datatable columns={columns} actions={actions} routeName="incidences-control.home" />
            </article>
        </AppLayout>
    );
};