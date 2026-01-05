import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Link } from "@inertiajs/react";
import AppHeader from "@/layouts/app-header";
import Field from "@/components/form/field";
import FieldCheck from "@/components/form/field-check";
import useGroup from "@/hooks/use-group";
import { Separator } from "@/components/ui/separator";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function Edit () {

    const {onTogglePermission, onChangeSearch, onChangeName, permissionsFilter, errors, processing, onSubmitEdit, data, role } = useGroup()

    const breadcrumbs: BreadcrumbItem[] = [
        {title: "Dashboard", href: "/"},
        {title: "Grupos y Roles", href: "/grupos-y-roles"},
        {title: `Editar ${role.name}`, href: `/grupos-y-roles/${role.id}/editar`}
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Editar grupo" text="La actualizción afectará también a los permisos de los usuarios que esten suscritos al mismo." />

            <div>
                <form className="max-w-3xl px-4 pb-8" onSubmit={onSubmitEdit}>
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
            </div>
        </AppLayout>
    );
}