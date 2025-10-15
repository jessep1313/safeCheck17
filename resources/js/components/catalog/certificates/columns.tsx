import { Certificate } from "@/types/catalogs";
import { ColumnDef } from "@/types/datatable.d";

export default (): ColumnDef<Certificate>[] => [
    {
        header: 'Certificado',
        key: 'name',
        columnType: 'text',
        sortable: true
    },
    {
        header: 'Fecha de registro',
        key: 'created_at',
        columnType: 'date',
        align: 'end',
        sortable: true,
        sort: 'desc'
    },
    {
        header: 'Ult. actualización',
        key: 'updated_at',
        columnType: 'date',
        align: 'end',
        sortable: true,
    },
]