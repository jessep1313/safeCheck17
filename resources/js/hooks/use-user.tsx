import React, { ChangeEvent } from "react"
import useModal from "./use-modal"
import { useForm } from "@inertiajs/react"
import { User, UserBody, UserBodyKeys } from "@/types/users"
import { toast } from "sonner"

export default () => {

    const { handleCloseModal, handleOpenModal, open } = useModal()

    const [id, setId] = React.useState<string>()
    const [editable, setEditable] = React.useState<boolean>(false)

    const {
        data,
        setData,
        errors,
        post,
        put,
        delete: destroy,
        processing,
        reset
    } = useForm<UserBody>({
        email: '',
        name: ''
    })

    const handleOpenCreate = () => {
        handleOpenModal()
    }

    const handleOpenEdit = (row: User) => {
        handleOpenModal()
        setEditable(true)
        setData({name: row.name, email: row.email})
        setId(row.id);
    }

    const handleHiddenModal = () => {
        handleCloseModal()
        setEditable(false)
        setId(undefined)
        reset()
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement & { name: UserBodyKeys }>) => {
        e.preventDefault()
        const { value, name } = e.target
        setData(name, value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (editable && id) {
            put(route('users.update', { id }), {
                onSuccess: () => {
                    toast.success('Usuario actualizado');
                    handleHiddenModal()
                },
                onProgress: () => toast.loading('Actualizando usuario...'),
                onError: () => toast.error('Oopss...!! No se ha podido actualizar el usuario'),
            })
        }else{
            post(route('users.store'), {
                onSuccess: () => {
                    toast.success('Se ha creado un nuevo usuario');
                    handleHiddenModal()
                },
                onProgress: () => toast.loading('Creando usuario...'),
                onError: () => toast.error('Oopss...!! No se ha podido crear el usuario'),
            });
        }
    }

    const handleDelete = (row: User) => {
        const name = row.name.split(" ")[0];
        destroy(route("users.destroy", {id: row.id}), {
            onProgress: () => toast.loading("Eliminando usuario..."),
            onSuccess: () => toast.success(`${name}, ha sido eliminado.`),
            onError: () => toast.error(`Oopss...!! No se pudo eliminar el usuario`)
        })
    }

    const handleRefreshPass = (row: User) => {}

    return {
        id,
        open,
        data,
        errors,
        processing,
        editable,
        handleHiddenModal,
        handleOpenCreate,
        handleOpenEdit,
        handleSubmit,
        handleInputChange,
        handleDelete,
        handleRefreshPass
    }
}