import { Certificate } from "@/types/catalogs";
import { DataTableRowAction } from "@/types/datatable.d";
import { Edit, Trash2 } from "lucide-react";

export default function getActions(
    handleOpenEdit: (id: string, name: string) => void,
    handleDelete: (id: string) => void,
): DataTableRowAction<Certificate>[] {
    return [
        {
            icon: Edit,
            label: 'Editar certificado',
            onClick: ({ id, name }) => handleOpenEdit(id, name)
        },
        {
            icon: Trash2,
            label: 'Eliminar certificado',
            onClick: ({ id }) => handleDelete(id),
            confirmation: true,
            cancelLabel: 'No, Eliminar',
            confirmLabel: 'Si, Eliminar',
            confirmTitle: '¿Eliminar este certificado?',
            confirmText: 'Una vez eliminado no podrás recuperarlo. Asegurate de no tener formularios relacionados a este.',
        }
    ]
}