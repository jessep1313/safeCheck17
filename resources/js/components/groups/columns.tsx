import { ColumnDef } from "@/types/datatable";
import { Role } from "@/types/groups";

export default function columns (): ColumnDef<Role>[] {
    return [
        {
            header: "Grupo",
            columnType: 'text',
            sortable: true,
            key: 'name'
        },
        {
            header: "Usuarios",
            columnType: 'number',
            sortable: true,
            key: 'users',
            align: 'end'
        },
        {
            header: "Permisos",
            columnType: 'number',
            sortable: true,
            key: 'permissions',
            align: 'end'
        },
        {
            header: "Creado el",
            columnType: 'date',
            sortable: true,
            key: 'created_at',
        },
        {
            header: "Actualizado el",
            columnType: 'date',
            sortable: true,
            sort: 'desc',
            key: 'updated_at',
        },
    ];
}