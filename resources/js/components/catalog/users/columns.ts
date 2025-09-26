import { ColumnDef } from '@/types/datatable.d';
import { User } from '@/types/users';

export default function getColumns(): ColumnDef<User>[] {
    return [
        {
            header: 'Nombre completo',
            key: 'name',
            sortable: true,
            columnType: 'text'
        },
        {
            header: 'Correo electrónico',
            key: 'email',
            sortable: true,
            columnType: 'text'
        },
        {
            header: 'Verificado el',
            key: 'email_verified_at',
            sortable: true,
            columnType: 'date',
            align: "end"
        },
        {
            header: 'Creado el',
            key: 'created_at',
            sortable: true,
            columnType: 'date',
            align: "end"
        },
        {
            header: 'Actualizado el',
            key: 'updated_at',
            sortable: true,
            columnType: 'date',
            align: "end"
        },
    ];
}
