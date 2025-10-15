import { FormPageProps, InspectFormCreateBody } from "@/types/form-record";
import { toast } from "sonner";
import { useForm, usePage } from "@inertiajs/react";
import React from "react"
import useModal from "./use-modal";
import { SelectOption } from "@/types";
import { getCatalogAvailableVehicles } from "@/data/utils";

export default function useRecordForm() {

    const { certificates } = usePage<FormPageProps>().props
    const [vehicleOptions, setVehicleOptions] = React.useState<SelectOption[]>([]);
    const certificateOptions: SelectOption[] = certificates.map(opt => ({ label: opt.name, value: opt.id }));

    const { handleOpenModal, handleCloseModal, open } = useModal()
    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm<Required<InspectFormCreateBody>>({
        certification_type: '',
        vehicle_type: '',
        preload_fields: true,
    })

    // region Change Changes
    const handleChangeSelect = async (key: 'certification_type' | 'vehicle_type', value: string) => {
        if (key === 'certification_type') {
            const vehicleOptions = await getCatalogAvailableVehicles(value);
            const optionsFormat = vehicleOptions.map(opt => ({ label: opt.name, value: opt.id }))
            setVehicleOptions(optionsFormat)
        }
        setData(key, value)
    }

    const handleTogglePreFields = (value: boolean) => {
        setData("preload_fields", value)
    }

    // region Enviar formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('form.store'), {
            onProgress: () => toast.loading('Creando el formulario'),
            onSuccess: () => toast.success("El formulario se creo correctamente"),
            onError: () => toast.success("Error al crear el formulario, intentalo más tarde"),
            onFinish: () => reset(),
        })
    }

    // region Eliminar formulario
    const handleDelete = (id: number) => {
        destroy(route('form.delete', { id }), {
            onProgress: () => toast.loading('Eliminando formulario de inspección'),
            onSuccess: () => toast.success('Se ha eliminado el formulario de inspección'),
            onError: () => toast.success('Error al eliminar el formulario de inspección, intentalo más tarde')
        })
    }

    // TODO Exportar datos de formulario
    return {
        certificateOptions,
        data,
        errors,
        handleChangeSelect,
        handleCloseCreate: handleCloseModal,
        handleDelete,
        handleOpenCreate: handleOpenModal,
        handleSubmit,
        handleTogglePreFields,
        openCreate: open,
        processing,
        vehicleOptions,
    }
}