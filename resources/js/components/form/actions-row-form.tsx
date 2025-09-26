import { DataTableRowAction } from '@/types/datatable.d';
import { InspectForm } from '@/types/form-record';
import { Edit2, Trash2 } from 'lucide-react';



export default (handleDelete: (id: number) => void): DataTableRowAction<InspectForm>[] => {
    return [
        {
            icon: Edit2,
            label: 'Editar puntos',
            to: (row) => route('form.fields', { folio: row.folio }),
        },
        {
            icon: Trash2,
            label: 'Eliminar',
            onClick: (row) => handleDelete(row.id),
            confirmation: true,
            confirmTitle: '¿Eliminar el formulario?',
            confirmText: 'Si eliminas este formulario también se eliminarán los puntos de inspección que contiene y no podrás recuperar su información. ¿Deseas continuar?',
            confirmLabel: 'Si, eliminar',
            cancelLabel: 'No, cancelar'            
        },
    ];
};
