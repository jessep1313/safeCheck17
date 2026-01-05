import { CatalogItem } from '@/types';
import { Role, RoleEdit } from '@/types/groups';
import { PageProps } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

interface Props extends PageProps {
    permissions: CatalogItem[];
    role: RoleEdit
}
export default () => {

    const { permissions, role } = usePage<Props>().props;
    const [permissionsFilter, setPermissionsFilter] = useState(permissions)
    const [searchValue, setSearchValue] = useState("");

    const { post, put, delete: destroy, processing, data, setData, errors } = useForm<{name: string, permissions: string[]}>({
        name: "",
        permissions: []
    })

    const onSubmitEdit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        put(route('groups.update', { id: role.id }), {
            onSuccess: () => toast.success("Se ha actualizado un nuevo grupo"),
            onError: () => toast.error("Ocurrio un error al actualizar")
        })
    }

    const onSubmitCreate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('groups.store'), {
            onSuccess: () => toast.success("Se ha creado un nuevo grupo"),
            onError: () => toast.error("No se pudo crear el grupo")
        });
    }

    const onDelete = (id: string) => {
        destroy(route('groups.delete', { id }), {
            onSuccess: () => toast.success("Se eliminado el grupo"),
            onError: () => toast.error("No se ha podido eliminar el grupo", {
                action: {
                    label: "Reintentar",
                    onClick: () => onDelete(id)
                }
            })
        })
    }

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const onTogglePermission = (value: string) => {
        const include = data.permissions.find(el => el === value);
        if(include) {
            setData('permissions', data.permissions.filter(el => el !== value));
        }else{
            setData('permissions', [...data.permissions,value]);
        }
    }

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setData('name', e.target.value);
    }

    const filterPermissions = (search: string) => {
        const value = search.toLowerCase().replace(/s+/i, "").trim();
        if(!value) {
            setPermissionsFilter(permissions)
            return
        };
        const newPermissions = permissions.filter(el => {
            const permissionName = el.name.trim().replace(/s+/i, '');
            return permissionName.includes(value);
        })
        setPermissionsFilter(newPermissions);
    }

    useMemo(() => {
        filterPermissions(searchValue);
    }, [permissions, searchValue])

    useEffect(() => {
        if(role) {
            setData('name',role.name)
            setData('permissions', role.permissions)
        }
    }, [role])

    return {
        permissionsFilter,
        onChangeSearch,
        onChangeName,
        onTogglePermission,
        onSubmitCreate,
        onSubmitEdit,
        onDelete,
        processing,
        data,
        errors,
        role
    };
};
