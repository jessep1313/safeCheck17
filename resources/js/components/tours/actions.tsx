import { DataTableRowAction } from "@/types/datatable";
import { InspectionStatus } from "@/types/inspections.d";
import { TourRow } from "@/types/tours";
import { ArrowRight, List } from "lucide-react";

export const actions = (
): DataTableRowAction<TourRow>[] => [
        {
            label: 'Detalles',
            icon: List,
            hide: row => row.status === InspectionStatus.Pending,
            to(row) {
                return route('tours.show', { uuid: row.uuid })
            },
        },
        {
            label: 'Continuar',
            icon: ArrowRight,
            hide: row => row.status !== InspectionStatus.Pending,
            to(row) {
                return route('tours.question', { uuid: row.uuid })
            },
        },
    ]