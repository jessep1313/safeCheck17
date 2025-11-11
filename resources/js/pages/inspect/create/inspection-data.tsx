import Field from '@/components/form/field';
import { Separator } from '@/components/ui/separator';
import useInspectionData from '@/hooks/inspectionDigital/use-inspection-data';
import AppLayout from '@/layouts/app-layout';
import StepsLayout from '@/layouts/inspectForm/steps-layout';
import { BreadcrumbItem } from '@/types';

export default () => {
    const { uuid, data, handleSubmit, processing, handleChangeInput, handleChangeInputTrailer, errors } = useInspectionData();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Inspecciones', href: '/inspecciones' },
        { title: 'Crear', href: '/inspecciones/crear' },
        { title: 'Datos de inspección', href: `/inspecciones/crear/${uuid}/datos-inspeccion` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <StepsLayout onSubmit={handleSubmit} processing={processing}>
                <fieldset className="mb-6 grid grid-cols-3 gap-x-4 gap-y-6">
                    <Field
                        id="company_transport"
                        placeholder="Escribe la empresa transportiste"
                        name="company_transport"
                        label="Linea de transporte"
                        value={data.company_transport}
                        onChange={handleChangeInput}
                        error={errors.company_transport}
                        required
                    />
                    <Field
                        id="company_property"
                        placeholder="Escribe la empresa de la mercancia"
                        name="company_property"
                        label="Propietario de carga"
                        value={data.company_property}
                        onChange={handleChangeInput}
                        error={errors.company_property}
                        required
                    />
                    <Field
                        id="plate_number"
                        placeholder="Ingresa las placas del tracto"
                        name="plate_number"
                        label="Placas de la unidad (tracto)"
                        value={data.plate_number}
                        onChange={handleChangeInput}
                        error={errors.plate_number}
                        required
                    />
                    <Field
                        id="customer_name"
                        placeholder="Ingresa las placas del tracto"
                        name="customer_name"
                        label="Nombre del cliente"
                        value={data.customer_name}
                        onChange={handleChangeInput}
                        required
                    />
                    <Field
                        id="driver_name"
                        name="driver_name"
                        placeholder="Selecciona el conductor"
                        label="Conductor/Operador"
                        value={data.driver_name}
                        onChange={handleChangeInput}
                        error={errors.driver_name}
                        required
                    />
                    <Field
                        id="guard_name"
                        name="guard_name"
                        placeholder="Selecciona el guardia"
                        label="Guardia"
                        value={data.guard_name}
                        onChange={handleChangeInput}
                        error={errors.guard_name}
                        required
                    />
                </fieldset>

                <Separator className="my-4" />

                <h3 className="mb-4 text-xl">Remolques/Caja</h3>

                <ul>
                    {data.trailers.map((trailer, index) => (
                        <li key={index} className="mb-2 flex w-4/5 items-start gap-10">
                            <p className="inline-flex aspect-square w-8 items-center justify-center rounded-full border text-2xl">{index + 1}</p>
                            <fieldset className="grid flex-1 grid-cols-3 gap-4">
                                <input type="hidden" value={trailer.id} />
                                <Field
                                    id={`plate_trailer_${trailer.id}`}
                                    placeholder="Ingresa las placas del remolque/caja"
                                    value={trailer.plate}
                                    onChange={(e) => handleChangeInputTrailer('plate', e.target.value, `${trailer.id}`)}
                                    label="Placas del remolque/caja"
                                    required
                                />
                                <Field
                                    id={`vin_trailer_${trailer.id}`}
                                    placeholder="Ingresa las vin del remolque/caja"
                                    value={trailer.vin}
                                    onChange={(e) => handleChangeInputTrailer('vin', e.target.value, `${trailer.id}`)}
                                    label="Vin del remolque/caja"
                                    required
                                />
                                <Field
                                    id={`seil_trailer_${trailer.id}`}
                                    placeholder="Ingresa el sello del remolque/caja"
                                    value={trailer.seil}
                                    onChange={(e) => handleChangeInputTrailer('seil', e.target.value, `${trailer.id}`)}
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
