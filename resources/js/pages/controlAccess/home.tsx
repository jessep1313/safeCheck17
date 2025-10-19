import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Control de acesos', href: '/control-accesos' }]

export default () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader
                title="Control de accesos"
            />
        </AppLayout>
    )
};
