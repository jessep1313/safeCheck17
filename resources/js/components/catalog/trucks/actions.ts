import { VehicleType } from '@/types/catalogs';
import { DataTableRowAction } from '@/types/datatable.d';
import { Edit, Trash2 } from 'lucide-react';

export default function getActions(handleOpenEdit: (id: string) => void, handleDelete: (id: string) => void): DataTableRowAction<VehicleType>[] {
    return [
        {
            icon: Edit,
            label: 'Editar',
            onClick: ({ id }) => handleOpenEdit(id),
        },
        {
            icon: Trash2,
            label: 'Eliminar',
            onClick: ({ id }) => handleDelete(id),
            confirmation: true,
            confirmText:
                'Una vez elminado este registro no lo podrás recuperar. Asegurate de que no se encuentré asignado a un formulario antes de eliminar.',
            confirmLabel: 'Si, eliminar',
            cancelLabel: 'No eliminar',
        },
    ];
}
