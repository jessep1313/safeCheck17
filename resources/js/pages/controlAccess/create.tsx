import Field from '@/components/form/field';
import FieldCheck from '@/components/form/field-check';
import FieldSelect from '@/components/form/field-select';
import FieldUpload from '@/components/form/field-upload';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import useCreate from '@/hooks/accessControl/use-create';
import AppHeader from '@/layouts/app-header';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Control de accesos', href: route('access-control.home') },
    { title: 'Nuevo acceso', href: route('access-control.create') },
];

export default () => {
    const { data, errors, onSubmit, processing, setData, buildings, booths, onChange } = useCreate();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Nuevo Acceso" />

            <form onSubmit={onSubmit} className="grid max-w-3xl grid-cols-2 gap-x-5 gap-y-6 px-4">
                <FieldSelect
                    id="selectBuildings"
                    name="building_id"
                    placeholder="Selecciona una planta"
                    label="Planta/Edificio"
                    onValueChange={(val) => setData('building_id', val)}
                    defaultValue={data.building_id}
                    options={buildings}
                    required
                />
                <FieldSelect
                    id="selectBooths"
                    name="booth_id"
                    onValueChange={val => setData('booth_id', val)}
                    placeholder="Selecciona una caseta"
                    label="Caseta de seguridad"
                    defaultValue={data.booth_id}
                    options={booths}
                    required
                />
                <Field defaultValue={data.name} onChange={onChange} id="inpName" label="Nombre de la persona" placeholder="Juan Alberto Nogales Zuñiga" name="name" error={errors.name} required />
                <Field defaultValue={data.who_visits} onChange={onChange} id="inpWhoVisits" label="¿A quién visita?" placeholder="Juan Alberto Nogales Zuñiga" name="who_visits" error={errors.who_visits} required />
                <Field defaultValue={data.motive} onChange={onChange} id="inpMotive" label="Motivo de visita" placeholder="Mantenimiento de servidores" name="motive" required error={errors.motive} className='col-span-full' />
                <Field defaultValue={data.contractor} onChange={onChange} id="inpContractor" label="Empresa contratista" placeholder="Reparaciones Orozco" name="contractor" error={errors.contractor} />
                <Field defaultValue={data.expires} onChange={onChange} id="inpExpires" label="Fecha/Hora de salida" type="datetime-local" required name="expires" error={errors.expires} />
                <div className='col-span-full'>
                    <FieldUpload setData={setData} id="inpFiles" name="identification" label="Identificación" placeholder='Carga o arrastra hasta aquí una fotografía de la identificación' required />
                </div>

                <div className="col-span-full flex gap-2">
                    <Button type="button" variant="outline" asChild>
                        <Link href={route('access-control.home')}>
                            Cancelar
                        </Link>
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Guardando...' : 'Guardar y continuar'}
                        {processing && <Spinner />}
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
};
