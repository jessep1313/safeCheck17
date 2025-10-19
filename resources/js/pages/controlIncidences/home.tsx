import AppHeader from "@/layouts/app-header"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Control de incidencias', href: '/control-incidencias' },
];

export default () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader
                title="Control de incidencias"
            />
        </AppLayout>
    )
}