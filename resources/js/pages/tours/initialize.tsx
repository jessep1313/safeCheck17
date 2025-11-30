import Field from "@/components/form/field"
import FieldSelect from "@/components/form/field-select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import AppHeader from "@/layouts/app-header"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"
import { usePage } from "@inertiajs/react"
import { AlertCircle, ArrowRight } from "lucide-react"

export default () => {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Dashboard", href: '/' },
        { title: "Bitacora de recorridos", href: '/bitacora-de-recorridos' },
        { title: "Prepara recorrido", href: '/bitacora-de-recorridos/prepara-recorrido' },
    ]

    const { users } = usePage().props

    console.log(users)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Preparate para el recorrido" />
            <form className="container max-w-2xl">
                <fieldset className="mb-4">
                    <FieldSelect placeholder="Selecciona un responsable" options={users} name="responsed_id" required label="Responsable de recorrido" id="responsed_id" />
                </fieldset>
                <Alert>
                    <AlertCircle />
                    <AlertTitle>Importante antes de empezar</AlertTitle>
                    <AlertDescription>
                        <p>Una vez inicies el recorrido no podrás detenerlo ni pausarlo. Recuerda que <strong>se tomará el tiempo real</strong> para el recorrido.</p>
                        <p>Si estas seguro de iniciar el recorrido, presiona el botón <strong>"Iniciar recorrido"</strong></p>
                    </AlertDescription>
                </Alert>
                <footer className="mt-4">
                    <Button>
                        Iniciar recorrido
                        <ArrowRight />
                    </Button>
                </footer>
            </form>
        </AppLayout>
    )
}