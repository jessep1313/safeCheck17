import Field from '@/components/form/field';
import FieldRadioGroup from '@/components/form/field-radio-group';
import FieldSelect from '@/components/form/field-select';
import usePrepare from '@/hooks/inspectionDigital/use-prepare';
import AppLayout from '@/layouts/app-layout';
import StepsLayout from '@/layouts/inspectForm/steps-layout';
import { BreadcrumbItem, SelectOption } from '@/types';
import { usePage } from '@inertiajs/react';

export default () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Inspecciones', href: '/inspecciones' },
        { title: 'Crear', href: '/inspecciones/crear' },
        { title: 'Resumen', href: '/inspecciones/crear/summary' },
    ];

    const { inspectionTypeOptions, certificatesOptions, vehicleTypeOptions, handleChangeCertificate } = usePrepare()

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <section className="px-4">
                <StepsLayout>
                    <fieldset className="max-w-2xl space-y-5">
                        <FieldRadioGroup label="Tipo de inspección" name="inspection_type" id="inspection_type" options={inspectionTypeOptions} />
                        <FieldSelect
                            id="certificate"
                            label="Certificado"
                            name="certification_id"
                            placeholder="Selecciona un certificado"
                            onValueChange={handleChangeCertificate}
                            options={certificatesOptions as SelectOption[]}
                        />
                        <FieldSelect
                            id="vehicle_type"
                            label="Tipo de unidad"
                            name="vehicle_type_id"
                            placeholder="Selecciona un tipo de unidad"
                            options={vehicleTypeOptions}
                        />
                        <Field
                            id="trailer_quantity"
                            name="trailer_quantity"
                            label="Cantidad de remolques"
                            type="number"
                            placeholder="Ingresa la cantidad de remolques"
                        />
                    </fieldset>
                </StepsLayout>
            </section>
        </AppLayout>
    );
};
