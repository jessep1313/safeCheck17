import { Audit, AuditStatus, AuditType } from '@/types/audit';
import { ColumnDef } from '@/types/datatable';
import { Check, Clock, LucideIcon, Route, Search, Truck } from 'lucide-react';
import { Badge } from '../ui/badge';

export const getColumns = (): ColumnDef<Audit>[] => {
    const statusRecord: Record<
        AuditStatus,
        {
            color: 'secondary' | 'default';
            icon: LucideIcon;
        }
    > = {
        Finalizado: { color: 'default', icon: Check },
        Pendiente: { color: 'secondary', icon: Clock },
    };
    const typeRecord: Record<AuditType, LucideIcon> = {
        Inspeccion: Truck,
        Recorrido: Route,
        Otro: Search,
    };
    return [
        {
            header: 'UUID',
            key: 'uuid',
        },
        {
            header: 'Tipo',
            key: 'type',
            cell: ({ type }) => {
                const Icon = typeRecord[type];
                return (
                    <span className="text-wrap">
                        <Icon className="me-1.5 inline" size={16} />
                        {type}
                    </span>
                );
            },
        },
        {
            header: 'Estado',
            key: 'status',
            cell: (row) => {
                const status = statusRecord[row.status];
                const color = status.color;
                const Icon = status.icon;
                return (
                    <Badge variant={color}>
                        <Icon /> {row.status}
                    </Badge>
                );
            },
        },
        {
            header: 'Auditor',
            key: 'user_audit',
            sortable: true,
            columnType: 'text',
        },
        {
            header: 'Fecha/Hora',
            key: 'created_at',
            sortable: true,
            columnType: 'date',
        },
    ];
};
