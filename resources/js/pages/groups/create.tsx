import Field from '@/components/form/field';
import FieldCheck from '@/components/form/field-check';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import useGroup from '@/hooks/use-group';
import AppHeader from '@/layouts/app-header';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Search } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Grupos y Roles', href: '/grupos-y-roles' },
    { title: 'Crear nuevo grupo', href: '/grupos-y-roles/nuevo-grupo' },
];
export default function Create() {
    const { permissionsFilter, onChangeSearch, onChangeName, onTogglePermission, onSubmitCreate, data, processing, errors } = useGroup();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Nuevo grupo"></AppHeader>
            <form className="max-w-3xl px-4 pb-8" onSubmit={onSubmitCreate}>
                <fieldset>
                    <Field id="name" defaultValue={data.name} label="Nombre del grupo" placeholder="Escribe el nombre del grupo" required onChange={onChangeName} error={errors.name} />
                </fieldset>
                <Separator className="my-4" />
                <fieldset>
                    <legend className="text-lg font-bold">Permisos para el grupo</legend>
                    <p className="font-thin">Marca todos los permisos que necesites que tengan los usuarios que existan en este grupo.</p>
                    {errors.permissions && <small className='text-red-500'>{errors.permissions}</small>}

                    <search className="mt-3">
                        <InputGroup>
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                            <InputGroupInput onChange={onChangeSearch} placeholder="Buscar permiso . . ." />
                        </InputGroup>
                    </search>

                    <ul className="mt-4 grid grid-cols-2 gap-2">
                        {permissionsFilter.map((permission, key) => (
                            <li key={key}>
                                <FieldCheck
                                    label={permission.name}
                                    value={permission.id}
                                    name="permissions"
                                    onCheckedChange={() => onTogglePermission(permission.name)}
                                    checked={!!data.permissions.find(el => el === permission.name)}
                                />
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <fieldset className="mt-8 flex gap-2">
                    <Button disabled={processing} variant={'secondary'} asChild>
                        <Link href={route('groups.home')}>Cancelar</Link>
                    </Button>
                    <Button disabled={processing} type="submit">
                        {processing ? "Guardando..." : "Guardar grupo"}
                        {processing && <Spinner />}
                    </Button>
                </fieldset>
            </form>
        </AppLayout>
    );
}
