import { AccessVehicleBody } from "@/types/access-control"
import { useForm } from "@inertiajs/react"
import { ChangeEvent, FormEvent, useState } from "react"
import { usePage } from "@inertiajs/react"
import { PageProps } from "@inertiajs/core"
import { toast } from "sonner"

interface Props extends PageProps {
    accessId: number
    vehicles: ({ id: number } & AccessVehicleBody)[]
}

export default () => {

    const { accessId, vehicles } = usePage<Props>().props
    console.log(vehicles)
    const [openForm, setOpenForm] = useState(false)
    const [vehicleId, setVehicleId] = useState<number | null>();
    const { data, setData, processing, post, errors, reset, put, delete: destroy } = useForm({
        plate: "",
        model: "",
        color: ""
    })

    const handleCreate = () => {
        setOpenForm(true);
    }

    const handleEdit = (id: number, data: AccessVehicleBody) => {
        setData(data)
        setOpenForm(true)
        setVehicleId(id)
    }

    const handleClose = () => {
        setOpenForm(false);
        setVehicleId(null)
        reset();
    }

    const handleStore = () => {
        post(route("access-control.vehicle.store", { id: accessId }), {
            onSuccess: () => toast.success("Se ha agregado un vehículo"),
            onError: () => toast.error("Error al agregar el vehículo")
        })
    }

    const handleUpdate = () => {
        put(route("access-control.vehicle.update", { id: vehicleId }), {
            onSuccess: () => toast.success("Se ha actualizado el vehículo"),
            onError: () => toast.error("Error al actualizar el vehículo")
        })
    }

    const handleDelete = (id: number) => {
        destroy(route("access-control.vehicle.delete", { id }), {
            onSuccess: () => toast.success("Se ha eliminado el vehículo"),
            onError: () => toast.error("Error al eliminar el vehículo")
        })
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData(name as keyof AccessVehicleBody, value)
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (vehicleId) {
            handleUpdate()
        } else {
            handleStore()
        }
        handleClose();
    }

    return {
        data,
        vehicles,
        setData,
        processing,
        post,
        errors,
        openForm,
        handleClose,
        handleCreate,
        handleEdit,
        handleDelete,
        onSubmit,
        onChange,
        vehicleId
    }
}