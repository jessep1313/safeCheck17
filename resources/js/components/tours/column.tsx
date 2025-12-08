import { ColumnDef } from "@/types/datatable";
import { TourRow } from "@/types/tours";
import { Badge } from "../ui/badge";
import { InspectionStatus } from "@/types/inspections";
import { Clock, LucideIcon, ShieldCheck, XCircle } from "lucide-react";

export const columns = (): ColumnDef<TourRow>[] => {
    return [
        {
            header: 'Responsable',
            key: 'responsed',
        },
        {
            header: 'Estado',
            key: 'status',
            cell: (row) => {
            const statuses: Record<
                InspectionStatus,
                {
                    variant: 'default' | 'secondary' | 'destructive';
                    icon: LucideIcon;
                }
            > = {
                Aprobado: {
                    variant: 'default',
                    icon: ShieldCheck,
                },
                Pendiente: {
                    variant: 'secondary',
                    icon: Clock,
                },
                Rechazado: {
                    variant: 'destructive',
                    icon: XCircle,
                },
            };
            const status = statuses[row.status];
            return (
                <Badge variant={status.variant}>
                    <status.icon /> {row.status}
                </Badge>
            );
        },
        },
        {
            header: 'Duración',
            key: 'duration',
            columnType: 'time',
            align: 'end'
        },
        {
            header: 'Incidencia',
            key: 'comments',
            cell: (row) => row.comments 
                ? <span dangerouslySetInnerHTML={{ __html: row.comments }}></span> 
                : <span className="text-foreground">Sin incidencias</span>
        },
        {
            header: 'Creado el',
            key: 'created_at',
            sortable: true,
            columnType: "date"
        }
    ];
}