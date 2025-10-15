import { useForm } from "@inertiajs/react"
import React from "react";
import { toast } from "sonner"
import useModal from "./use-modal";
import { EventSubmit } from "@/types";

export default () => {

    const [isEdit, setIsEdit] = React.useState(false);
    const [id, setId] = React.useState<string>();
    const { handleCloseModal, handleOpenModal, open } = useModal()
    const { data, setData, post, processing, errors, put, delete: destroy } = useForm({
        name: ''
    })

    const handleOpenCreate = () => {
        handleOpenModal()
    }
    const handleOpenEdit = (id: string, name: string) => {
        setId(id);
        setData('name', name)
        setIsEdit(true)
        handleOpenModal()
    }

    const handleCloseForm = () => {
        setData('name', '')
        setId(undefined)
        setIsEdit(false)
        handleCloseModal()
    }

    const handleDeleteCertificate = (id: string) => {
        destroy(route('certificates.destroy', { id }), {
            onSuccess: () => toast.success('Se ha eliminado el certificado'),
            onError: () => toast.success('No se ha podido eliminar este certificado'),
            onProgress: () => toast.loading('Eliminando certificado...'),
            onFinish: () => { setId(undefined) }
        })
    }

    const createCertificate = () => {
        post(route('certificates.store'), {
            onSuccess: () => {
                toast.success('Se ha registrado el certificado')
                handleCloseForm();
            },
            onError: () => toast.error('No se pudo registrar el certificado'),
            onProgress: () => toast.loading('Registrando certificado...'),
        })
    }

    const updateCertificate = () => {
        put(route('certificates.update', { id }), {
            onSuccess: () => {
                toast.success("Se ha actualizado el certificado")
                handleCloseForm()
            },
            onError: () => toast.success("No se pudo actualizar el certificado"),
            onProgress: () => toast.loading("Actualizando certificado..."),
        })
    }

    const handleSubmit = (event: EventSubmit) => {
        event.preventDefault()
        if (isEdit) {
            updateCertificate()
        } else {
            createCertificate()
        }
    }
    return {
        handleSubmit,
        handleCloseForm,
        handleOpenCreate,
        handleOpenEdit,
        handleDeleteCertificate,
        isEdit,
        data,
        setData,
        open,
        processing,
        errors,
    };
}