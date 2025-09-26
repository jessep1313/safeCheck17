import getActions from "@/components/catalog/users/actions";
import getColumns from "@/components/catalog/users/columns";
import Datatable from "@/components/datatable/datatable";
import Field from "@/components/form/field";
import Modal from "@/components/modal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/use-user";
import AppHeader from "@/layouts/app-header"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types";
import { AlertCircleIcon, Loader2, UserPlus } from "lucide-react";

export default ({}) => {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Usuarios', href: '/usuarios' }
    ];

    const {
        data,
        errors,
        handleHiddenModal,
        handleOpenCreate,
        handleOpenEdit,
        handleSubmit,
        handleInputChange,
        handleDelete,
        handleRefreshPass,
        open,
        processing,
        editable,
    } = useUser()

    const columns = getColumns()
    const actions = getActions({ handleEdit: handleOpenEdit, handleDelete, handleRefreshPass })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader
                title="Usuarios"
                text="Administra los usuarios de la plataforma"
            >
                <Button onClick={handleOpenCreate}>
                    Nuevo usuario
                    <UserPlus />
                </Button>
            </AppHeader>

            <section className="container">
                <Datatable
                    routeName="users.home"
                    emptyMessage="No se encontrarón usuarios."
                    createLabel="Crear usuario"
                    onCreate={handleOpenCreate}
                    columns={columns}
                    actions={actions}
                />
            </section>

            <Modal 
                open={open} 
                onHide={handleHiddenModal} 
                title={editable ? `${data.name}` : "Nuevo usuario"}
                description={editable ? "Actualiza la información y guarda los cambios." : "Completa los campos para crear el usuario."}
                actions={
                    <Button
                        type="submit"
                        disabled={processing}
                        form="form"
                    >
                        {processing && (<Loader2 className="animate-spin" />)}
                        {editable ? "Guardar usuario" : "Guardar cambios"}
                    </Button>
                }
            >
                <form 
                    className="flex flex-col gap-4" 
                    id="form" 
                    onSubmit={handleSubmit}
                >
                    <Field
                        id="inpName"
                        name="name"
                        value={data.name}
                        error={errors.name}
                        onChange={handleInputChange}
                        label="Nombre completo"
                        placeholder="Escribe el nombre completo del usuario"
                        required
                    />
                    <Field
                        id="inpEmail"
                        name="email"
                        value={data.email}
                        error={errors.email}
                        onChange={handleInputChange}
                        label="Correo electrónico"
                        placeholder="Escribe el nombre completo del usuario"
                        required
                    />

                    {!editable && (
                        <Alert>
                            <AlertCircleIcon />
                            <AlertTitle>Nota importante</AlertTitle>
                            <AlertDescription>La contraseña será enviada al correo electrónico escrito el campo de arriba</AlertDescription>
                        </Alert>
                    )}            
                </form>
            </Modal>
        </AppLayout>
    )
}