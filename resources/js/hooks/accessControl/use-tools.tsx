import { AccessTool, AccessToolBody } from "@/types/access-control";
import { useForm, usePage } from "@inertiajs/react"
import { FormEvent, useState } from "react";
import { PageProps } from "@inertiajs/core";
import { toast } from "sonner";

interface Props extends PageProps {
    accessId: number
    tools: AccessTool[]
}

export default () => {

    const { accessId, tools } = usePage<Props>().props
    const { data, setData, errors, processing, post, put, delete: destroy, reset } = useForm({
        type: "",
        brand: "",
        model: "",
        quantity: ""
    });

    const [openForm, setOpenForm] = useState(false)
    const [id, setId] = useState<number | null>(null)

    // region Cerrar ventana de formulario
    const handleClose = () => {
        setOpenForm(false)
        setId(null)
        reset()
    }

    // region Abrir ventana de formulario
    const handleCreate = () => {
        setOpenForm(true)
    }

    // region Editar herramienta
    const handleEdit = (tool: AccessTool) => {
        setId(Number(tool.id))
        setData({
            type: tool.type,
            brand: tool.brand,
            model: tool.model,
            quantity: tool.quantity
        })
        setOpenForm(true)
    }

    // region Eliminar herramienta
    const handleDelete = (id: number) => {
        destroy(route('access-control.tool.delete', { id }), {
            onSuccess: () => toast.success('Herramienta eliminada correctamente'),
            onError: () => toast.error('Error al eliminar herramienta')
        })
    }

    // region Actualizar herramienta
    const handleUpdate = () => {
        put(route('access-control.tool.update', { id }), {
            onSuccess: () => {
                toast.success('Herramienta actualizada correctamente')
                handleClose()
            },
            onError: () => toast.error('Error al actualizar herramienta')
        })
    }

    // region Crear herramienta
    const handleStore = () => {
        post(route('access-control.tool.store', { id: accessId }), {
            onSuccess: () => {
                toast.success('Herramienta agregada correctamente')
                handleClose()
            },
            onError: () => toast.error('Error al agregar herramienta')
        })
    }

    // region Cambiar valor de un campo
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(name as keyof typeof data, value)
    }

    // region Guardar herramienta
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id) {
            handleUpdate()
        } else {
            handleStore()
        }
    }

    return {
        tools,
        data,
        openForm,
        errors,
        processing,
        handleClose,
        handleCreate,
        handleEdit,
        handleDelete,
        onSubmit,
        onChange,
    }
}