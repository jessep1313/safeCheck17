import Datatable from "@/components/datatable/datatable"
import { Button } from "@/components/ui/button"
import getColumns from "@/components/catalog/certificates/columns"
import AppHeader from "@/layouts/app-header"
import AppLayout from "@/layouts/app-layout"
import { Plus } from "lucide-react"
import useCertificates from "@/hooks/use-certificates"
import Modal from "@/components/modal"
import Field from "@/components/form/field"
import { Spinner } from "@/components/ui/spinner"
import getActions from "@/components/catalog/certificates/actions"

export default () => {

    const { data, handleCloseForm, handleOpenCreate, handleDeleteCertificate, handleOpenEdit, setData, handleSubmit, isEdit, open, processing, errors } = useCertificates()

    const columns = getColumns()
    const actions = getActions(handleOpenEdit, handleDeleteCertificate)

    return (
        <AppLayout>
            <AppHeader
                title="Listado de certificados"
                text="Administra los certificados para inspección. Puedes agregar más si lo necesitas."
            >
                <Button onClick={handleOpenCreate}>Nuevo certificado <Plus /></Button>
            </AppHeader>

            <section className="container">
                <Datatable
                    actions={actions}
                    columns={columns}
                    routeName="certificates.home"
                />
            </section>

            <Modal
                open={open}
                onHide={handleCloseForm}
                title={isEdit ? "Edita el certificado" : "Nuevo certificado"}
                actions={
                    <Button type="submit" form="formCertificate" disabled={processing}>
                        Guardar
                        {processing && <Spinner />}
                    </Button>
                }
            >
                <form onSubmit={handleSubmit} id="formCertificate">
                    <Field
                        id="inpName"
                        placeholder="Escribe el nombre del certificado"
                        label="Nombre del certificado"
                        name="name"
                        error={errors?.name}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                </form>
            </Modal>

        </AppLayout>
    )
}