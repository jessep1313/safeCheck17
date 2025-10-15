import React from "react"
import useModal from "./use-modal"
import { useForm } from "@inertiajs/react"
import { toast } from "sonner"
import { EventSubmit } from "@/types"

export default () => {
    const { open, handleCloseModal, handleOpenModal } = useModal()
    const [id, setId] = React.useState<string>()
    const [isEdit, setIsEdit] = React.useState(false);
    const { data, setData, post, delete: destroy, put, processing, errors } = useForm({
        name: ''
    })

    const onOpenCreate = () => {
        handleOpenModal()
    }
    const onOpenEdit = (id: string) => {
        setId(id)
        setIsEdit(true)
        handleOpenModal()
    }

    const onCloseForm = () => {
        setId(undefined)
        setIsEdit(false)
        handleCloseModal()
    }

    const onDelete = (id: string) => {
        destroy(route('trucks.destroy', { id }), {
            onSuccess: () => toast.success('Se eliminado un tipo de unidad'),
            onError: () => toast.error('No se pudo eliminar el tipo de unidad'),
            onProgress: () => toast.loading('Eliminando tipo de unidad...')
        })
    }

    const createVehicleType = () => {
        post(route('trucks.store'), {
            onSuccess: () => {
                toast.success('Se agregado un tipo de unidad')
                handleCloseModal();
            },
            onError: () => toast.error('No se pudo agragar el tipo de unidad'),
            onProgress: () => toast.error('Agregando tipo de unidad...')
        })
    }

    const updateVehicleType = () => {
        put(route('trucks.update', { id }), {
            onSuccess: () => {
                toast.success('Se ha actualizado el tipo de unidad')
                handleCloseModal()
            },
            onError: () => toast.error('No se pudo actualizar el tipo de unidad'),
            onProgress: () => toast.loading('Actualizando tipo de unidad...')
        })
    }

    const handleSubmit = (e: EventSubmit) => {
        e.preventDefault()
        if (isEdit) {
            updateVehicleType()
        } else {
            createVehicleType()
        }
    }

    return {
        onOpenCreate,
        onOpenEdit,
        onCloseForm,
        onDelete,
        handleSubmit,
        isEdit,
        open,
        data,
        setData,
        processing,
        errors,
    }
}