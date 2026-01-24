import { AccessDevice, AccessDeviceBody } from "@/types/access-control"
import { useForm, usePage } from "@inertiajs/react"
import { PageProps } from "@inertiajs/core"
import { useState } from "react"
import { toast } from "sonner"

interface Props extends PageProps {
    devices: AccessDevice[]
    accessId: number
}

export default () => {
    const { devices, accessId } = usePage<Props>().props
    const [openForm, setOpenForm] = useState(false)
    const [deviceId, setDeviceId] = useState<number | null>(null)
    const { data, errors, processing, post, put, delete: destroy, setData, reset } = useForm<AccessDeviceBody>({
        type: '',
        brand: '',
        model: '',
        quantity: ''
    })

    // region Abrir modal para crear
    const handleOpenCreate = () => {
        setOpenForm(true)
    }

    // region Abrir modal para editar
    const handleOpenEdit = (data: AccessDevice) => {
        setOpenForm(true)
        setData(data)
        setDeviceId(data.id)
    }

    // region Cerrar modal para crear
    const handleCloseForm = () => {
        setOpenForm(false)
        setDeviceId(null)
        reset()
    }

    // region Crear dispositivo
    const handleCreate = () => {
        post(route('access-control.device.store', { id: accessId }), {
            onSuccess: () => {
                toast.success('Dispositivo creado correctamente')
                handleCloseForm()
            },
            onError: () => {
                toast.error('Error al crear el dispositivo')
            }
        })
    }

    // region Actualizar dispositivo
    const handleUpdate = (id: number) => {
        put(route('access-control.device.update', { id }), {
            onSuccess: () => {
                toast.success('Dispositivo actualizado correctamente')
                handleCloseForm()
            },
            onError: () => {
                toast.error('Error al actualizar el dispositivo')
            }
        })
    }

    // region Eliminar dispositivo
    const handleDelete = (id: number) => {
        destroy(route('access-control.device.delete', { id }), {
            onSuccess: () => {
                toast.success('Dispositivo eliminado correctamente')
                handleCloseForm()
            },
            onError: () => {
                toast.error('Error al eliminar el dispositivo')
            }
        })
    }

    // region Guardar dispositivo
    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(data)
        if (deviceId) {
            handleUpdate(deviceId)
        } else {
            handleCreate()
        }
    }

    // region Evento Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(name as keyof AccessDeviceBody, value)
    }

    return {
        openForm,
        handleOpenCreate,
        handleOpenEdit,
        handleCloseForm,
        handleDelete,
        handleSave,
        handleInputChange,
        data,
        errors,
        processing,
        devices
    }
}