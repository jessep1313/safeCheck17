import { getVehicleTypesByCertification } from "@/data/utils";
import { SelectOption } from "@/types";
import { usePage } from "@inertiajs/react";
import React from "react";

export default () => {

    const { certificatesOptions } = usePage().props

    const [vehicleTypeOptions, setVehicleTypeOptions] = React.useState<SelectOption[]>([])

    const inspectionTypeOptions = [
        { label: 'Entrada', value: 'Entrada' },
        { label: 'Salida', value: 'Salida' },
        { label: 'Almacen', value: 'Almacen' },
    ];

    const handleChangeCertificate = async (value: string) => {
        const options = await getVehicleTypesByCertification(value)
        setVehicleTypeOptions(options)
    }

    return {
        inspectionTypeOptions,
        certificatesOptions,
        vehicleTypeOptions,
        handleChangeCertificate
    }

}