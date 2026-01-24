import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"
import { usePage } from "@inertiajs/react"
import { PageProps } from "@inertiajs/core"
import { AccessDetail } from "@/types/access-control"
import FirstDataTop from "@/components/accessControl/show/first-data-top"
import VisitorProfile from "@/components/accessControl/show/visitor-profile"
import Stats from "@/components/accessControl/show/stats"
import VehiclesTable from "@/components/accessControl/show/vehicles-table"
import ToolsTable from "@/components/accessControl/show/tools-table"
import DevicesTable from "@/components/accessControl/show/devices-table"
import Identification from "@/components/accessControl/show/identification"

interface Props extends PageProps {
    uuid: string,
    data: AccessDetail
}

export default () => {

    const { uuid, data } = usePage<Props>().props

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Control de accesos', href: route('access-control.home') },
        { title: 'Detalles', href: route('access-control.show', { uuid }) },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <section className="p-4 flex flex-col gap-4">
                <FirstDataTop booth={data.booth.name} building={data.building.name} created_at={data.created_at} />
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <VisitorProfile name={data.name} motive={data.motive} contractor={data.contractor} />
                    <Stats />
                    <Identification />
                    <VehiclesTable />
                    <ToolsTable />
                    <DevicesTable />
                </section>
            </section>
        </AppLayout>
    )
}