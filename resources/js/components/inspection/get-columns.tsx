import { ColumnDef } from '@/types/datatable';
import { Inspection } from '@/types/inspections';

export default (): ColumnDef<Inspection>[] => [
    {
        header: 'Certificado',
        key: 'cert',
    },
    {
        header: 'Tipo de unidad',
        key: 'unitType',
    },
    {
        header: 'Estatus',
        key: 'status',
        sortable: true,
        columnType: 'text',
    },
    {
        header: 'Creado por',
        key: 'userBy',
    },
    {
        header: 'Creado el',
        key: 'created_at',
        align: 'end',
        sortable: true,
        columnType: 'date',
    },
    {
        header: 'Ult. Actualización',
        key: 'updated_at',
        align: 'end',
        sortable: true,
        columnType: 'date',
    },
];
