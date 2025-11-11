import { getVehicleTypesByCertification } from "@/data/utils";
import { PageProps } from "@inertiajs/core";
import { SelectOption } from "@/types";
import { FormPrepareBody } from "@/types/digital-inspection/forms";
import { useForm, usePage } from "@inertiajs/react";
import React, { FormEvent } from "react";
import { InspectionModel } from "@/types/inspections";

interface InspectionPageProps extends PageProps {
    certificatesOptions: (SelectOption & { childs?: SelectOption[] })[];
    uuid: string;
    inspection: InspectionModel;
}

export default function UsePrepare() {
    const { certificatesOptions, uuid, inspection } = usePage<InspectionPageProps>().props;

    // Normaliza a string por si en backend llegan números
    const initialCertId = inspection.certification_id != null ? String(inspection.certification_id) : undefined;
    const initialVehId = inspection.vehicle_type_id != null ? String(inspection.vehicle_type_id) : undefined;

    const { post, errors, processing, data, setData } = useForm<FormPrepareBody>({
        type: inspection.type ?? undefined,
        certification_id: initialCertId,
        vehicle_type_id: initialVehId,
        trailer_quantity: inspection.trailer_quantity ?? undefined,
    });

    const [vehicleTypeOptions, setVehicleTypeOptions] = React.useState<SelectOption[]>([]);

    const inspectionTypeOptions = [
        { label: "Entrada", value: "Entrada" },
        { label: "Salida", value: "Salida" },
        { label: "Almacen", value: "Almacen" },
    ];

    // Devuelve las opciones de tipos de vehículo para un certificado dado (sin tocar estado)
    const getVehicleTypesFor = (certVal?: string) => {
        if (!certVal) return [];
        const cert = certificatesOptions.find(c => String(c.value) === String(certVal));
        return cert?.childs ?? [];
    };

    // Cambiar certificado desde UI
    const handleChangeCertificate = (value: string) => {
        const vtOptions = getVehicleTypesFor(value);
        setVehicleTypeOptions(vtOptions);
        setData("certification_id", value);

        // Si el vehicle_type actual ya no existe en las nuevas opciones, lo limpiamos
        if (!vtOptions.some(o => String(o.value) === String(data.vehicle_type_id))) {
            setData("vehicle_type_id", undefined);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("inspections.save-prepare", { uuid }));
    };

    // Hidratación inicial: primero cargamos opciones del cert, luego validamos/preseleccionamos vehículo
    React.useEffect(() => {
        if (!initialCertId) return;

        const vtOptions = getVehicleTypesFor(initialCertId);
        setVehicleTypeOptions(vtOptions);

        // Si hay vehicle_type inicial y existe en las opciones -> lo dejamos seleccionado
        if (initialVehId && vtOptions.some(o => String(o.value) === String(initialVehId))) {
            setData("vehicle_type_id", initialVehId);
        } else {
            // si no existe, lo limpiamos para evitar valor “huérfano”
            setData("vehicle_type_id", undefined);
        }
        // Solo en el primer render con los props actuales
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        inspectionTypeOptions,
        certificatesOptions,
        vehicleTypeOptions,
        handleChangeCertificate,
        handleSubmit,
        errors,
        processing,
        inspection,
        setData,
        data,
    };
}
