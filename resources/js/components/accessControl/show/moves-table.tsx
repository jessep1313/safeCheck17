import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CardTable from "./card-table"

export default () => {
    return (
        <CardTable title="Entradas y salidas" description="Movimientos de la persona" name="movimientos">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Entrada/Salida</TableHead>
                        <TableHead>Fecha/Hora</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </CardTable>
    )
}