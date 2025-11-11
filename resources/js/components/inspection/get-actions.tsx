import { DataTableRowAction } from '@/types/datatable';
import { Inspection } from '@/types/inspections';
import { ArrowRight, Eye } from 'lucide-react';

export default (): DataTableRowAction<Inspection>[] => [
    {
        label: (row) => (row.status !== 'Pendiente' ? 'Ver detalles' : 'Continuar'),
        icon: (row: Inspection) => (row.status !== 'Pendiente' ? Eye : ArrowRight),
        to: (row) => route(row.status === 'Pendiente' ? 'inspections.step-prepare' : 'inspections.show', { uuid: row.uuid }),
    },
];
