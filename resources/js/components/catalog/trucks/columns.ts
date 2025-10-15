import { VehicleType } from '@/types/catalogs';
import { ColumnDef } from '@/types/datatable.d';

export default (): ColumnDef<VehicleType>[] => [
    {
        header: 'Tipo de unidad',
        key: 'name',
        columnType: 'text',
        sortable: true,
    },
    {
        header: 'Fecha de registro',
        key: 'created_at',
        align: 'end',
        columnType: 'date',
        sortable: true,
        sort: 'desc',
    },
    {
        header: 'Ult. actualización',
        key: 'updated_at',
        align: 'end',
        columnType: 'date',
        sortable: true,
    },
];
