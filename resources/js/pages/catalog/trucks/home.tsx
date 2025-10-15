import getColumns from "@/components/catalog/trucks/columns"
import Datatable from "@/components/datatable/datatable"
import Field from "@/components/form/field"
import Modal from "@/components/modal"
import { Button } from "@/components/ui/button"
import useTrucks from "@/hooks/use-trucks"
import AppHeader from "@/layouts/app-header"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"
import { Plus } from "lucide-react"

export default () => {

    const { onOpenCreate, onCloseForm, open } = useTrucks()
    const columns = getColumns()
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Camiones', href: '/catalogos/tipos-de-camiones' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Unidades" text="Administra los tipo de unidades">
                <Button onClick={onOpenCreate}>
                    Agregar unidad
                    <Plus />
                </Button>
            </AppHeader>

            <section className="container">
                <Datatable
                    columns={columns}
                    routeName="trucks.home"
                />
            </section>

            <Modal
                open={open}
                onHide={onCloseForm}
                title="Agregar unidad"
                description="Registra un nuevo tipo de unidad"
                actions={<Button form="formTruck" type="submit">Guardar</Button>}
            >
                <form id="formTruck">
                    <Field id="inpName" label="Tipo de unidad" placeholder="Escribe el tipo de unidad" />
                </form>
            </Modal>
        </AppLayout>
    )
}