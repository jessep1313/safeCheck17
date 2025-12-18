import { AlertCircle, ShieldCheck } from 'lucide-react';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

export default ({}) => {
    return (
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
            <Card>
                <CardHeader>
                    <CardTitle>Incidencias pendientes</CardTitle>
                    <CardDescription>
                        <p>Estás incidencias aún no cuentan con un plan de acción</p>
                    </CardDescription>
                    <CardAction>
                        <AlertCircle />
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className='pointer-events-none'>
                                <TableHead>Folio</TableHead>
                                <TableHead>Tipo de incidencia</TableHead>
                                <TableHead>Fecha y hora</TableHead>
                                <TableHead>Comentarios</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={4}>
                                <Empty>
                                    <EmptyHeader>
                                    <EmptyMedia>
                                        <ShieldCheck />
                                    </EmptyMedia>
                                        <EmptyTitle>Sin incidencias</EmptyTitle>
                                        <EmptyDescription>¡Excelente!, no hay incidencias pendientes.</EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
