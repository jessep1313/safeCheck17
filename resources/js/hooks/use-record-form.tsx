import { InspectFormCreateBody } from "@/types/form-record";
import { router, useForm } from "@inertiajs/react";
import React from "react"
import { toast } from "sonner";

export default function useRecordForm () {

    const [openCreate, setOpenCreate] = React.useState(false)
    const {data, setData, post, processing, errors, reset} = useForm<Required<InspectFormCreateBody>>({
        certification_type: '', 
        vehicle_type: ''
    })

    // region Abrir modal
    const handleOpenCreate = () => {
        setOpenCreate(true)
    }

    // region Cerrar modal
    const handleCloseCreate = () => {
        setOpenCreate(false)
    }

    // TODO Change Select Create
    const handleChangeSelect = (key: 'certification_type' | 'vehicle_type', value: string) => {
        setData(key, value)
    }

    // TODO Enviar formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('form.store'), {
            onFinish: () => reset(),
            onProgress: () => toast.loading('Creando el formulario'),
            onSuccess: () => toast.success("El formulario se creo correctamente"),
            onError: () => toast.success("Error al crear el formulario, intentalo más tarde"),
        })
    }

    // TODO Exportar datos de formulario
    return {
        openCreate,
        handleCloseCreate,
        handleOpenCreate,
        handleChangeSelect,
        handleSubmit,
        data,
        errors,
        processing,
    }
}