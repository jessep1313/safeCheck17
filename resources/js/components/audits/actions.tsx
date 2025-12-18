import { Audit } from "@/types/audit";
import { DataTableRowAction } from "@/types/datatable";
import { FileDown, FileSearch } from "lucide-react";

export const getActions = (): DataTableRowAction<Audit>[] => [
    {
        label: 'Descargar reporte',
        icon: FileDown,
        onClick: ({ id }) => (window.location.href = `/auditorias/${id}/inspection/descargar`),
        hide: ({status}) => status === "Pendiente"
    },
    {
        label: 'Continuar con auditoria',
        icon: FileSearch,
        to: ({uuid}) => route('audit.inspection.question', {uuid}),
        hide: ({status}) => status === "Finalizado"
    }
]