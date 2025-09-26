import { ColumnDef } from "@/types/datatable.d";
import { InspectForm } from "@/types/form-record";

export default (): ColumnDef<InspectForm>[] => [
    {
        key: 'folio',
        header: 'folio',
        cell: (row) => row.folio.toUpperCase(),
        sortable: true,
    },
    {
        key: 'certificate',
        header: 'Certificado',
    },
    {
        key: 'vehicleType',
        header: 'Tipo de vehículo',
    },
    {
        key: 'fields',
        header: 'Pts. Inspección',
        columnType: 'number',
        align: 'end'
    },
    {
        key: 'created_at',
        header: 'Fecha de alta',
        sortable: true,
        columnType: 'date',
        align: 'end'
    },
]