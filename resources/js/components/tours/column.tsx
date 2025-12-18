import useFancybox from '@/hooks/use-fancybox';
import { ColumnDef } from '@/types/datatable';
import { InspectionStatus } from '@/types/inspections';
import { TourRow } from '@/types/tours';
import { Clock, LucideIcon, MoreHorizontal, ShieldCheck, XCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

export const columns = (): ColumnDef<TourRow>[] => {
    const [fancyboxRef] = useFancybox();
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
            align: 'end',
        },
        {
            header: 'Incidencia',
            key: 'comments',
            cell: (row) =>
                row.comments ? (
                    <span dangerouslySetInnerHTML={{ __html: row.comments }}></span>
                ) : (
                    <span className="text-foreground">Sin incidencias</span>
                ),
        },
        {
            header: 'Evidencia',
            align: 'end',
            cell: (row) => (
                <ul className="flex justify-end" ref={fancyboxRef}>
                    {row.evidences.map((imgSrc, key) => (
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
                    ))}
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
        {
            header: 'Creado el',
            key: 'created_at',
            sortable: true,
            columnType: 'date',
        },
    ];
};
