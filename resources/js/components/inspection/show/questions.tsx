import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InspectionPoint } from '@/types/inspections';
import { Check, X } from 'lucide-react';

interface QuestionsProps {
    data: InspectionPoint[];
}

export default ({ data }: QuestionsProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2>Puntos inspeccionados</h2>
                </CardTitle>
                <CardDescription>Preguntas evaluadas durante la inspección de la unidad</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-end">#</TableHead>
                            <TableHead>Punto de inspección</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead className="text-center">Aprobado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((point) => (
                            <TableRow key={point.id}>
                                <TableCell align="right">{point.number}</TableCell>
                                <TableCell>{point.label}</TableCell>
                                <TableCell>{point.description}</TableCell>
                                <TableCell
                                    align="center"
                                    className={`${point.answered ? (point.approved ? 'text-green-500' : 'text-red-500') : 'text-muted'}`}
                                >
                                    {point.approved ? <Check /> : <X />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
