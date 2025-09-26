import { DataTableRowAction } from "@/types/datatable.d";
import { User } from "@/types/users";
import { LockKeyhole, Trash2, UserPen } from "lucide-react";

interface GetActionProps {
    handleEdit: (row: User) => void,
    handleDelete: (row: User) => void,
    handleRefreshPass: (row: User) => void,
}

const getActions = ({ handleDelete, handleEdit, handleRefreshPass }: GetActionProps):DataTableRowAction<User>[] => [
    {
        label: 'Editar cuenta',
        icon: UserPen,
        onClick: handleEdit
    },
    {
        label: 'Eliminar cuenta',
        icon: Trash2,
        onClick: handleDelete,
        confirmation: true,
        confirmLabel: "Si, eliminar",
        cancelLabel: "No, cancelar",
        confirmTitle: "¿Eliminar está cuenta?",
        confirmText: "Una vez eliminada está cuenta no podrá ser recuperada, ¿Deseas continuar?"
    },
    {
        label: 'Restablecer contraseña',
        icon: LockKeyhole,
        onClick: handleRefreshPass
    },
];

export default getActions;