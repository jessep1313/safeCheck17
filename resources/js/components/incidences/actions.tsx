import { PlanActionStatus } from '@/enums';
import { DataTableRowAction } from '@/types/datatable';
import { Incidence } from '@/types/incidences';
import { Ban, CheckCircle, CircleDotDashed, Download, ExternalLink, Play, StopCircle } from 'lucide-react';

interface Props {
    createPlanAction: (incidence: Incidence) => void;
    startPlanAction: (incidence: Incidence) => void;
    stopPlanAction: (incidence: Incidence) => void;
    cancelPlanAction: (incidence: Incidence) => void;
}

export const getActions = ({ createPlanAction, startPlanAction, stopPlanAction, cancelPlanAction }: Props): DataTableRowAction<Incidence>[] => {
    return [
        {
            label: 'Iniciar plan de acción',
            icon: Play,
            onClick: startPlanAction,
            hide: ({ action_plan }) => !action_plan ? true : action_plan.status !== PlanActionStatus.PENDING,
            confirmation: true,
            confirmTitle: '¿Iniciar plan de acción?',
            confirmText: 'Se cambiará el estado del plan de acción a en progreso y no podrás revertirlo, solo cancelarlo o completarlo.',
            cancelLabel: 'Cerrar ventana'
        },
        {
            label: 'Completar plan de acción',
            icon: CheckCircle,
            confirmation: true,
            confirmTitle: '¿Completar plan de acción?',
            confirmText: 'Se cambiará el estado del plan de acción a completado y no podrás revertirlo. ¿Estás seguro de continuar?',
            confirmLabel: 'Si, completar',
            cancelLabel: 'Cerrar ventana',
            onClick: stopPlanAction,
            hide: ({ action_plan }) => !action_plan ? true : action_plan.status !== PlanActionStatus.IN_PROGRESS
        },
        {
            label: 'Cancelar plan de acción',
            icon: Ban,
            onClick: cancelPlanAction,
            hide: ({ action_plan }) => !action_plan ? true : action_plan.status !== PlanActionStatus.IN_PROGRESS,
            confirmation: true,
            confirmTitle: '¿Cancelar plan de acción?',
            confirmText: 'Se cambiará el estado del plan de acción a cancelado y no podrás revertirlo. ¿Estás seguro de continuar?',
            confirmLabel: 'Si, cancelar plan',
            cancelLabel: 'Cerrar ventana'
        },
        {
            label: 'Crear plan de acción',
            icon: CircleDotDashed,
            onClick: createPlanAction,
            hide: ({ action_plan }) => !!action_plan && action_plan?.status !== PlanActionStatus.CANCELLED
        },
        {
            label: 'Descargar reporte',
            icon: Download,
            hide: ({ type }) => type !== 'Inspeccion',
            onClick: ({ uuid }) => (window.location.href = route('inspections.export-pdf', { uuid })),
        },
        {
            label: "Ver plan de accion",
            icon: ExternalLink,
            hide: ({ action_plan }) => !action_plan,
            to: (row) => row?.action_plan ? route('plan.show', { uuid: row?.action_plan?.uuid }) : "#"
        },
    ];
};
