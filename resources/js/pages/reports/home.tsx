import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Reportes', href: '/reportes' },
];

export default () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader
                title="Reportes"
            />
        </AppLayout>
    );
};
