import Field from '@/components/form/field';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import StepsLayout from '@/layouts/inspectForm/steps-layout';
import { BreadcrumbItem } from '@/types';
import { InspectionModel } from '@/types/inspections';
import { usePage } from '@inertiajs/react';

export default () => {
    const { uuid, inspection } = usePage().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Inspecciones', href: '/inspecciones' },
        { title: 'Crear', href: '/inspecciones/crear' },
        { title: 'Datos de inspección', href: `/inspecciones/crear/${uuid}/datos-inspeccion` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <StepsLayout>
                <fieldset className="mb-6 grid grid-cols-3 gap-x-4 gap-y-6">
                    <Field
                        id="company_transport"
                        placeholder="Escribe la empresa transportiste"
                        name="company_transport"
                        label="Linea de transporte"
                        required
                    />
                    <Field
                        id="company_property"
                        placeholder="Escribe la empresa de la mercancia"
                        name="company_property"
                        label="Propietario de carga"
                        required
                    />
                    <Field
                        id="plate_number"
                        placeholder="Ingresa las placas del tracto"
                        name="plate_number"
                        label="Placas de la unidad (tracto)"
                        required
                    />
                    <Field
                        id="customer"
                        placeholder="Ingresa las placas del tracto"
                        name="plate_number"
                        label="Placas de la unidad (tracto)"
                        required
                    />
                </fieldset>

                <Separator className="my-4" />

                <h3 className="mb-4 text-xl">Remolques/Caja</h3>

                <ul>
                    {Array.from({ length: (inspection as InspectionModel).trailer_quantity }).map((__, index) => (
                        <li key={index} className="flex w-4/5 items-start gap-10">
                            <p className="inline-flex aspect-square w-8 items-center justify-center rounded-full border text-2xl">{index + 1}</p>
                            <fieldset className="grid flex-1 grid-cols-3 gap-4">
                                <Field
                                    id={`plate_trailer_${index}`}
                                    placeholder="Ingresa las placas del remolque/caja"
                                    name="plate_trailer[]"
                                    label="Placas del remolque/caja"
                                    required
                                />
                                <Field
                                    id={`vin_trailer_${index}`}
                                    placeholder="Ingresa las vin del remolque/caja"
                                    name="vin_trailer[]"
                                    label="Vin del remolque/caja"
                                    required
                                />
                                <Field
                                    id={`seil_trailer_${index}`}
                                    placeholder="Ingresa el sello del remolque/caja"
                                    name="seil_trailer[]"
                                    label="Sello del remolque/caja"
                                    required
                                />
                            </fieldset>
                        </li>
                    ))}
                </ul>
            </StepsLayout>
        </AppLayout>
    );
};
