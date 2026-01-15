import { Access } from "@/types/access-control";
import { ColumnDef } from "@/types/datatable";

export default (): ColumnDef<Access>[] => [
    {
        header: "Nombre de la persona",
        key: "name",
        cell: (row) => <strong>{row.name}</strong>
    },
    {
        header: "Motivo",
        key: 'motive'
    },
    {
        header: "Planta",
        key: "building",
    },
    {
        header: "Caseta",
        key: "booth",
    },
    {
        header: "Fecha de ingreso",
        key: "created_at",
        sortable: true,
        columnType: "date",
        align: "end"
    },
    {
        header:  "Expiración",
        key: 'expires',
        sortable: true,
        columnType: "date",
        align: "end"
    }
];