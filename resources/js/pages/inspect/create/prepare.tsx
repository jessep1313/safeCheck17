import Field from '@/components/form/field';
import FieldRadioGroup from '@/components/form/field-radio-group';
import FieldSelect from '@/components/form/field-select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import usePrepare from '@/hooks/inspectionDigital/use-prepare';
import AppLayout from '@/layouts/app-layout';
import StepsLayout from '@/layouts/inspectForm/steps-layout';
import { BreadcrumbItem, SelectOption } from '@/types';
import { InspectionType } from '@/types/inspections';
import { AlertCircle } from 'lucide-react';

export default () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Inspecciones', href: '/inspecciones' },
        { title: 'Crear', href: '/inspecciones/crear' },
        { title: 'Resumen', href: '/inspecciones/crear/summary' },
    ];

    const { inspectionTypeOptions, certificatesOptions, vehicleTypeOptions, handleChangeCertificate, handleSubmit, data, setData, inspection } =
        usePrepare();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <section className="px-4">
                <StepsLayout onSubmit={handleSubmit}>
                    <fieldset className="max-w-2xl space-y-5">
                        <FieldRadioGroup
                            label="Tipo de inspección"
                            name="type"
                            id="inspection_type"
                            value={data.type}
                            onValueChange={(val) => setData('type', val as InspectionType)}
                            options={inspectionTypeOptions}
                            required
                        />
                        <FieldSelect
                            id="certificate"
                            label="Certificado"
                            name="certification_id"
                            placeholder="Selecciona un certificado"
                            value={`${data.certification_id}`}
                            onValueChange={handleChangeCertificate}
                            options={certificatesOptions as SelectOption[]}
                            required
                        />
                        <FieldSelect
                            id="vehicle_type"
                            label="Tipo de unidad"
                            name="vehicle_type_id"
                            value={`${data.vehicle_type_id}`}
                            onValueChange={(val) => setData('vehicle_type_id', val)}
                            placeholder="Selecciona un tipo de unidad"
                            options={vehicleTypeOptions}
                            required
                        />
                        {inspection.trailer_quantity > 0 && (
                            <Alert>
                                <AlertCircle />
                                <AlertTitle>Cuidado</AlertTitle>
                                <AlertDescription>
                                    <p>
                                        Actualmente ya tienes {inspection.trailer_quantity} en esta inspección. Si cambias la cantidad a un valor
                                        menor de {inspection.trailer_quantity} perderás la iformación que ya hayas agregado en{' '}
                                        <span className="inline font-bold">Datos de inspección</span>
                                    </p>
                                </AlertDescription>
                            </Alert>
                        )}
                        <Field
                            id="trailer_quantity"
                            name="trailer_quantity"
                            label="Cantidad de remolques"
                            type="number"
                            value={data.trailer_quantity}
                            onChange={(e) => setData('trailer_quantity', parseInt(e.target.value))}
                            placeholder="Ingresa la cantidad de remolques"
                            required
                        />
                    </fieldset>
                </StepsLayout>
            </section>
        </AppLayout>
    );
};
