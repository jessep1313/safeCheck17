import { Button } from "@/components/ui/button"
import AppHeader from "@/layouts/app-header"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"
import { Link } from "@inertiajs/react"
import { Plus } from "lucide-react"

export default () => {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Dashboard", href: '/' },
        { title: "Bitacora de recorridos", href: '/bitacora-de-recorridos' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Bitacora de recorridos">
                <Button asChild>
                    <Link href={route('tours.initialize')}>
                        Hacer recorrido <Plus />
                    </Link>
                </Button>
            </AppHeader>
        </AppLayout>
    )
}