import { FormInspectionDataBody } from '@/types/digital-inspection/forms';
import { InspectionModel, InspectionTrailer } from '@/types/inspections';
import { PageProps } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';
import { ChangeEvent, FormEvent } from 'react';

interface InspectionDataPageProps extends PageProps {
    inspection: InspectionModel;
    trailers: InspectionTrailer[];
    uuid: string;
}

export default function useInspectionData() {
    const { uuid, inspection, trailers } = usePage<InspectionDataPageProps>().props;
    const { data, setData, processing, errors, post } = useForm<FormInspectionDataBody>({
        company_property: inspection?.company_property ?? undefined,
        company_transport: inspection?.company_transport ?? undefined,
        plate_number: inspection?.plate_number ?? undefined,
        customer_name: inspection?.customer_name ?? undefined,
        driver_name: inspection?.driver_name ?? undefined,
        guard_name: inspection?.guard_name ?? undefined,
        trailers: trailers.map((trailer) => ({
            id: trailer.id ?? undefined,
            plate: trailer.plate ?? undefined,
            seil: trailer.seil ?? undefined,
            vin: trailer.vin ?? undefined,
        })),
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('inspections.save-data', { uuid }));
    };

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const field = name as keyof FormInspectionDataBody;
        setData(field, value);
    };

    type fieldTrailer = 'vin' | 'seil' | 'plate';

    const handleChangeInputTrailer = (field: fieldTrailer, value: string, id: string) => {
        const newTrailers = data.trailers.map((trailer) => (trailer.id == id ? { ...trailer, [field]: value } : trailer));
        setData('trailers', newTrailers);
    };

    console.log(errors);

    return {
        handleSubmit,
        handleChangeInput,
        handleChangeInputTrailer,
        data,
        setData,
        processing,
        errors,
        inspection,
        uuid,
        trailers,
    };
}
