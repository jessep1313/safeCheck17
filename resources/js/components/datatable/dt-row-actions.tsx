import { DataTableRowAction } from '@/types/datatable.d';
import { Link } from '@inertiajs/react';
import { LucideIcon, MoreVertical } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { TableCell } from '../ui/table';

interface DtRowActionsProps<T> {
    actions: DataTableRowAction<T>[];
    fixed?: boolean;
    row: T;
}

interface RowActionProps<T> extends DataTableRowAction<T> {
    row: T;
}

function resolveHref<T>(to: RowActionProps<T>['to'], row: T): string | undefined {
    if (!to) return undefined;
    return typeof to === 'function' ? to(row) : to;
}

const DtRowAction = <T,>({
    icon,
    label,
    to,
    cancelLabel = 'Cancelar',
    confirmText = 'Si estas seguro de realizar está acción presiona en confirmar.',
    confirmLabel = 'Confirmar',
    confirmTitle = '¿Confirmar acción?',
    confirmation = false,
    onClick,
    row,
}: RowActionProps<T>) => {
    // Resolver icon y label
    const Icon = (typeof icon === 'function' ? icon(row!) : icon) as LucideIcon;
    const labelText = typeof label === 'function' ? label(row) : label;

    const isHref = !!to;

    const handleClick = () => {
        onClick?.(row);
    };

    if (confirmation) {
        return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Icon className="mr-2 h-4 w-4" />
                        {labelText}
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
        );
    }

    const href = resolveHref(to, row);

    return (
        <DropdownMenuItem onClick={handleClick} asChild={isHref}>
            {isHref ? (
                <Link href={href!}>
                    <Icon className="mr-2 h-4 w-4" /> {labelText}
                </Link>
            ) : (
                <>
                    <Icon className="mr-2 h-4 w-4" /> {labelText}
                </>
            )}
        </DropdownMenuItem>
    );
};

export default <T,>({ actions, row, fixed = false }: DtRowActionsProps<T>) => {
    return (
        <TableCell align="center" className={`${fixed ? 'sticky top-0 right-0 z-10' : ''} w-8 border-l! bg-background p-0 text-end`}>
            <div className="flex w-full items-center justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} size={'icon'} className="flex h-7! w-7! items-center justify-center p-0.5!">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {actions.map((action, index) => (
                            <DtRowAction<T> key={index} row={row} {...action} />
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </TableCell>
    );
};
