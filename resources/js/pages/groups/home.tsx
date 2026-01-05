import Datatable from "@/components/datatable/datatable";
import actions from "@/components/groups/actions";
import columns from "@/components/groups/columns";
import { Button } from "@/components/ui/button";
import useGroup from "@/hooks/use-group";
import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Link } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {title: 'Dashboard', href: '/'},
    { title: "Grupos y Roles", href: "/grupos-y-roles"},
]

export default function Home () {

    const { onDelete } = useGroup()

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Grupos y Roles">
                <Button asChild>
                    <Link href={route('groups.create')}>Crear nuevo grupo</Link>
                </Button>
            </AppHeader>

            <div className="px-4">
                <Datatable createLink={route("groups.create")} columns={columns()} actions={actions(onDelete)} routeName="groups.home" />
            </div>
        </AppLayout>
    )
}