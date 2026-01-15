import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CardTable from "./card-table"

export default () => {
    return (
        <CardTable title="Herramientas ingresadas" description="Se ingresarón 0 herramienta(s)" name="herramientas">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Herramienta</TableHead>
                        <TableHead>Cantidad</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </CardTable>
    )
}