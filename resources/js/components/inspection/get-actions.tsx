import { DataTableRowAction } from '@/types/datatable';
import { Inspection } from '@/types/inspections';
import { ArrowRight, Download, Eye } from 'lucide-react';

export default (): DataTableRowAction<Inspection>[] => [
    {
        label: (row) => (row.status !== 'Pendiente' ? 'Ver detalles' : 'Continuar'),
        icon: (row: Inspection) => (row.status !== 'Pendiente' ? Eye : ArrowRight),
        to: (row) => route(row.status === 'Pendiente' ? 'inspections.step-prepare' : 'inspections.show', { uuid: row.uuid }),
    },
    {
        label: 'Descargar reporte',
        icon: () => Download,
        onClick: ({ uuid }) => (window.location.href = `/inspecciones/${uuid}/descarga-pdf`),
    },
];
