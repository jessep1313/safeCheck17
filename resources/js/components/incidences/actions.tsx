import { DataTableRowAction } from "@/types/datatable";
import { Incidence } from "@/types/incidences";
import { router } from "@inertiajs/react";
import { FileDown, SquareArrowUpRight, Workflow } from "lucide-react";

export const getActions = (createPlanAction: (incidence: Incidence) => void): DataTableRowAction<Incidence>[] => [
    {
        label: "Crear plan de acción",
        icon: Workflow,
        onClick(row) {
            createPlanAction(row)
        },
    },
    {
        label: "Ver inspección",
        icon: SquareArrowUpRight,
        onClick(row) {
            router.visit(route('inspections.show', { uuid: row.uuid }))
        }
    },
    {
        label: "Descargar Reporte",
        icon: FileDown,
        onClick(row) {
            window.open(route('inspections.export-pdf', { uuid: row.uuid }))
        }
    }
]