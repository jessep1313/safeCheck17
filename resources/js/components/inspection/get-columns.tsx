import { ColumnDef } from '@/types/datatable';
import { Inspection, InspectionStatus } from '@/types/inspections';
import { Clock, LucideIcon, ShieldCheck, XCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

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
            const status = statuses[row.status] || 'default';
            return (
                <Badge variant={status.variant}>
                    <status.icon /> {row.status}
                </Badge>
            );
        },
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
