import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { toast } from "sonner"
import { Trash2, X } from "lucide-react"
import { useForm } from "@inertiajs/react"
import DtRowAction from "./dt-row-action"

interface DtRowDelete {
    id: string
    route: string
    tooltip?: string
    dialogTitle?: string
    dialogDescription?: string
    submitLabel?: string
    cancelLabel?: string
    successMessage?: string
    errorMessage?: string
    loadingMessage?: string
}

export default ({ 
    tooltip = "Eliminar fila", 
    dialogTitle = "¿Seguro que quieres continuar?", 
    dialogDescription = "Una vez eliminado no podrás recuperar la información de la fila.", 
    cancelLabel = "Cancelar", 
    submitLabel = "Eliminar", 
    successMessage = "La fila se elimino de forma correcta",
    errorMessage = "Error al eliminar, intentalo más tarde",
    loadingMessage = "Eliminando fila",
    route: routePath, 
    id 
}: DtRowDelete) => {

    const { delete: destroy } = useForm()

    const onClick = () => {
        destroy(route(routePath, id), {
            onSuccess: () => toast.success(successMessage),
            onError: () => toast.error(errorMessage),
            onProgress: () => toast.loading(loadingMessage),
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DtRowAction tooltip={tooltip}>
                    <Trash2 />
                </DtRowAction>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {cancelLabel}
                        <X />
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onClick}
                    >
                        {submitLabel}
                        <Trash2 />
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}