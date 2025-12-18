import Charts from '@/components/dashboard/charts';
import StadisticCards from '@/components/dashboard/stadistic-cards';
import TableIncidences from '@/components/dashboard/table-incidences';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Estadisticas */}
                <StadisticCards />
                {/* Graficas */}
                <Charts />
                {/* Contenido */}
                <TableIncidences />
            </div>
        </AppLayout>
    );
}
