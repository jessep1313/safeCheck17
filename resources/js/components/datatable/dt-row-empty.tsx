import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { Link } from "@inertiajs/react";

interface DtRowEmptyProps {
    onCreate?: () => void
    createLink?: string
    createLabel?: string
    message?: string
    colSpan?: number
}

export default ({createLabel="Agregar", message="No se encontrarón filas", createLink, colSpan, onCreate}: DtRowEmptyProps) => {
    return (
        <TableRow>
            <TableCell colSpan={colSpan} className="text-center">
                <div className="border-2 border-dashed p-5">
                    <h3 className="mb-4">{message}</h3>
                    <Button size={'sm'} type="button" variant={'secondary'} onClick={onCreate} asChild={!!createLink}>
                        {createLink 
                            ? <Link href={createLink}>{createLabel} <Plus /></Link> 
                            : <>{createLabel} <Plus /></>
                        }
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};
