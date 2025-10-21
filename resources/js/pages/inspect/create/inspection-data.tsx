import AppLayout from '@/layouts/app-layout';
import StepsLayout from '@/layouts/inspectForm/steps-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

export default () => {
    const { uuid } = usePage().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Inspecciones', href: '/inspecciones' },
        { title: 'Crear', href: '/inspecciones/crear' },
        { title: 'Datos de inspección', href: `/inspecciones/crear/${uuid}/datos-inspeccion` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <StepsLayout />
        </AppLayout>
    );
};
