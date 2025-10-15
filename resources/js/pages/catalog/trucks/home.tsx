import getActions from "@/components/catalog/trucks/actions"
import getColumns from "@/components/catalog/trucks/columns"
import Datatable from "@/components/datatable/datatable"
import Field from "@/components/form/field"
import Modal from "@/components/modal"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import useTrucks from "@/hooks/use-trucks"
import AppHeader from "@/layouts/app-header"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"
import { Plus } from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Camiones', href: '/catalogos/tipos-de-camiones' },
];
export default () => {

    const { onOpenCreate, onCloseForm, open, onOpenEdit, onDelete, isEdit, handleSubmit, processing, errors, data, setData } = useTrucks()
    const columns = getColumns()
    const actions = getActions(onOpenEdit, onDelete)

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
                    actions={actions}
                    routeName="trucks.home"
                />
            </section>

            <Modal
                open={open}
                onHide={onCloseForm}
                title={isEdit ? "Editar unidad" : "Agregar unidad"}
                actions={
                    <Button form="formTruck" type="submit">
                        {isEdit ? "Actualizar" : "Guardar"}
                        {processing && <Spinner />}
                    </Button>
                }
            >
                <form id="formTruck" onSubmit={handleSubmit}>
                    <Field
                        id="inpName"
                        label="Tipo de unidad"
                        placeholder="Escribe el tipo de unidad"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </form>
            </Modal>
        </AppLayout>
    )
}