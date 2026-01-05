import { DataTableRowAction } from "@/types/datatable";
import { Role } from "@/types/groups";
import { Edit2, Trash } from "lucide-react";

export default (onDelete: (id: string) => void): DataTableRowAction<Role>[] => {

    return [
        {
            label: "Editar",
            icon: Edit2,
            to: (row) => route('groups.edit', {id: row.id})
        },
        {
            label: "Eliminar",
            icon: Trash,
            confirmation: true,
            confirmText: "Una vez elimines el grupo los usuarios que estaban suscritos a este se quedarán sin el grupo y tendrás que agregalos a otro. Si deseas continuar presiona en confirmar",
            onClick: (row) => onDelete(`${row.id}`)
        },
    ]
}