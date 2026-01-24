import { Access } from "@/types/access-control";
import { ColumnDef } from "@/types/datatable";
import { Badge } from "../ui/badge";
import { Hammer, Smartphone, Truck } from "lucide-react";

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
        header: "Ingresados",
        cell: (row) => <span className="flex gap-1">
            <Badge variant={'outline'}><Truck /> {row.vehicles}</Badge>
            <Badge variant={'outline'}><Smartphone /> {row.devices}</Badge>
            <Badge variant={'outline'}><Hammer /> {row.tools}</Badge>
        </span>
    },
    {
        header: "Fecha de ingreso",
        key: "created_at",
        sortable: true,
        columnType: "date",
        align: "end"
    },
    {
        header: "Expiración",
        key: 'expires',
        sortable: true,
        columnType: "date",
        align: "end"
    }
];