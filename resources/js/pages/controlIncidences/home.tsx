import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Datatable from "@/components/datatable/datatable";
import { getColumns } from "@/components/incidences/columns";
import { getActions } from "@/components/incidences/actions";
import { Incidence } from "@/types/incidences";

interface Props extends PageProps {
    breadcrumbs: BreadcrumbItem[]
    title: string
}

export default () => {

    const { breadcrumbs, title } = usePage<Props>().props
    const createPlanAction = (incidence: Incidence) => {
        console.log(incidence)
    }
    const columns = getColumns()
    const actions = getActions(createPlanAction)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title={title} text="Control de incidencias" />
            <article className="container">
                <Datatable columns={columns} actions={actions} routeName="incidences-control.inspections" />
            </article>
        </AppLayout>
    );
}