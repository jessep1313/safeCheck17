import { DataTableRowAction } from "@/types/datatable";
import { TourRow } from "@/types/tours";
import { List } from "lucide-react";

export const actions = (
    onOpen: (row: TourRow) => void
): DataTableRowAction<TourRow>[] => [
    {
        label: 'Detalles',
        icon:  List,
        onClick: onOpen
    },
]