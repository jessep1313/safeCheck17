import { DataTableRowAction } from "@/types/datatable.d"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreVertical } from "lucide-react"
import { Link } from "@inertiajs/react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { TableCell } from "../ui/table"

interface DtRowActionsProps<T> {
    actions: DataTableRowAction<T>[]
    fixed?: boolean
    row: T
}

interface RowActionProps<T> extends DataTableRowAction<T> {
    row: T
}

function resolveHref<T>(to: RowActionProps<T>["to"], row: T): string | undefined {
    if (!to) return undefined;
    return typeof to === "function" ? to(row) : to;
}


const DtRowAction = <T,>({ icon: Icon, label, to, cancelLabel = "Cancelar", confirmText = "Si estas seguro de realizar está acción presiona en confirmar.", confirmLabel = "Confirmar", confirmTitle = "¿Confirmar acción?", confirmation = false, onClick, row }: RowActionProps<T>) => {

    const isHref = !!to;

    const handleClick = () => {
        onClick?.(row)
    }

    if (confirmation) {

        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Icon />
                        {label}
                    </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
                        <AlertDialogDescription>{confirmText}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClick}>{confirmLabel}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    const href = resolveHref(to, row)

    return (
        <DropdownMenuItem onClick={handleClick} asChild={isHref}>
            {isHref
                ? <Link href={href!}><Icon /> {label}</Link>
                : <><Icon /> {label}</>
            }
        </DropdownMenuItem>
    )
}

export default <T,>({ actions, row, fixed = false }: DtRowActionsProps<T>) => {
    return (
        <TableCell align="center" className={`${fixed ? "sticky right-0 top-0 z-10" : ""} text-end p-0 border-l! w-8 bg-background`}>
            <div className="w-full flex items-center justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} size={'icon'} className="p-0.5! h-7! w-7! flex items-center justify-center">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {actions.map((action, index) => (
                            <DtRowAction<T>
                                key={index}
                                row={row}
                                {...action}
                            />
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </TableCell>
    )
}