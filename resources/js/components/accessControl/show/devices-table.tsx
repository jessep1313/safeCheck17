import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CardTable from "./card-table"

export default () => {
    return (
        <CardTable title="Dispositivos ingresados" description="Se ingresarón 0 dispositivo(s)" name="dispositivos">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Modelo</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Cantidad</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </CardTable>
    )
}