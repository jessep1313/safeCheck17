import AppLayout from '@/layouts/app-layout';
import StepsLayout from '@/layouts/inspectForm/steps-layout';
import { BreadcrumbItem } from '@/types';

export default () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Inspecciones', href: '/inspecciones' },
        { title: 'Crear', href: '/inspecciones/crear' },
        { title: 'Puntos', href: '/inspecciones/crear/puntos' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <StepsLayout />
        </AppLayout>
    );
};
