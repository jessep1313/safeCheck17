import useFancybox from "@/hooks/use-fancybox";
import { ColumnDef } from "@/types/datatable";
import { Incidence, IncidenceType } from '@/types/incidences.d';
import { PlanActionStatus } from "@/enums"
import { CheckCircle, Clock, FileSearch, Hourglass, LucideIcon, MoreHorizontal, Route, Truck, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const ActionStatusRecord: Record<PlanActionStatus, { icon: LucideIcon, color: 'default' | 'destructive' | 'outline' | 'secondary' }> = {
    [PlanActionStatus.PENDING]: { icon: Clock, color: 'secondary' },
    [PlanActionStatus.IN_PROGRESS]: { icon: Hourglass, color: 'default' },
    [PlanActionStatus.FINISHED]: { icon: CheckCircle, color: 'outline' },
    [PlanActionStatus.CANCELLED]: { icon: X, color: 'destructive' },
}

export const getColumns = (): ColumnDef<Incidence>[] => {
    const [fancyboxRef] = useFancybox();
    const typeRecord: Record<
        IncidenceType,
        {
            icon: LucideIcon;
        }
    > = {
        Inspeccion: { icon: Truck },
        Recorrido: { icon: Route },
        Otro: { icon: FileSearch },
    };

    return [
        {
            header: 'UUID',
            columnType: 'text',
            align: 'start',
            cell: (row) => <span className="font-medium">{row.uuid}</span>,
        },
        {
            header: 'Tipo',
            columnType: 'text',
            key: 'type',
            cell: ({ type }) => {
                const record = typeRecord[type];
                const Icon = record.icon;
                return (
                    <span>
                        <Icon size={16} className="me-1.5 inline" />
                        {type}
                    </span>
                );
            },
        },
        {
            header: 'Fecha/Hora',
            key: 'created_at',
            columnType: 'date',
            sortable: true,
            cell: (row) => row.created_at,
        },
        {
            header: 'Plan de acción',
            cell: ({ action_plan }) => {
                if (!action_plan) return <span className="inline-flex gap-1 items-center text-muted-foreground font-medium"><X size={16} /> Ninguno</span>
                const status = ActionStatusRecord[action_plan.status];
                return (
                    <Badge variant={status.color}><status.icon size={16} /> {action_plan.status}</Badge>
                )
            }
        },
        {
            header: 'Fin del plan',
            cell: ({ action_plan }) => action_plan?.finished_at || <span className="text-muted-foreground">Sin finalizar</span>
        },
        {
            header: 'Descripción',
            align: 'start',
            cell: (row) => (
                <>
                    {row.comments ? (
                        <div className="max-w-[150px] text-wrap line-clamp-2 text-sm" dangerouslySetInnerHTML={{ __html: `${row.comments}` }}></div>
                    ) : (
                        <span className="text-muted">Sin comentarios</span>
                    )}
                </>
            ),
        },
        {
            header: 'Evidencia',
            align: 'start',
            cell: (row) => (
                <ul className="flex ml-4" ref={fancyboxRef}>
                    {row.evidences.map(
                        (imgSrc, key) =>
                            imgSrc && (
                                <li className={`-ml-4 w-8 ${row.evidences.length > 2 && key > 1 ? 'hidden' : ''}`} key={key}>
                                    <a href={`/storage/${imgSrc}`} data-fancybox={`gallery-${row.uuid}`}>
                                        <picture>
                                            <img
                                                src={`/storage/${imgSrc}`}
                                                className="block aspect-square w-full rounded-full border-1 border-white object-cover"
                                                alt={`Imagen de evidencia para el folio ${row.uuid}`}
                                            />
                                        </picture>
                                    </a>
                                </li>
                            ),
                    )}
                    {row.evidences.length > 2 && (
                        <li className="-ml-4 w-8" key={row.evidences.length + 1}>
                            <a href={row.evidences[2]} data-fancybox={`gallery-${row.uuid}`}>
                                <span className="flex aspect-square w-full items-center justify-center rounded-full border-1 border-white backdrop-blur-2xl">
                                    <MoreHorizontal />
                                </span>
                            </a>
                        </li>
                    )}
                </ul>
            ),
        },
    ];
};
