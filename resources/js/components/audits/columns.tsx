import { Audit } from "@/types/audit";
import { ColumnDef } from "@/types/datatable";

export const getColumns = (): ColumnDef<Audit>[] => [
    {
        header: "UUID",
        key: 'uuid',
    },
    {
        header: "Tipo",
        key: 'type',
    },
    {
        header: "Estado",
        key: 'status',
    },
    {
        header: "Auditor",
        key: 'user_audit',
        sortable: true,
        columnType: "text"
    },
    {
        header: "Fecha/Hora",
        key: 'created_at',
        sortable: true,
        columnType: "date"
    }
]