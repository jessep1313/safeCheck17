import { DataTableRowAction } from '@/types/datatable';
import { Incidence } from '@/types/incidences';
import { CircleDot, CircleDotDashed, Download, ExternalLink } from 'lucide-react';

export const getActions = (createPlanAction: (incidence: Incidence) => void): DataTableRowAction<Incidence>[] => {
    return [
        {
            label: 'Descargar reporte',
            icon: Download,
            hide: ({ type }) => type !== 'Inspeccion',
            onClick: ({ uuid }) => (window.location.href = route('inspections.export-pdf', { uuid })),
        },
        {
            label: 'Crear plan de acción',
            icon: CircleDotDashed,
            onClick: createPlanAction,
            hide: ({ action_plan }) => !!action_plan
        },
        {
            label: "Ver plan de accion",
            icon: ExternalLink,
        }
    ];
};
