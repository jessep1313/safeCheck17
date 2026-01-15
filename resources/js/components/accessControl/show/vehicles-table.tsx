import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CardTable from "./card-table"

export default () => {
    return (
        <CardTable title="Vehiculos dentro" description="Hay 0 vehiculo(s) dentro" name="vehículos">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Placas</TableHead>
                        <TableHead>Modelo</TableHead>
                        <TableHead>Color</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </CardTable>
    )
}