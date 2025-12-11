import { getColumns } from "@/components/audits/columns";
import Datatable from "@/components/datatable/datatable";
import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Reportes', href: '/reportes' },
];

export default () => {

    const columns = getColumns();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader
                title="Auditorías"
            />

            <section className="px-4">
                <Datatable columns={columns} routeName="audit.home" />
            </section>
        </AppLayout>
    );
};
