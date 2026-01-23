import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CardTable from "./card-table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import useTools from "@/hooks/accessControl/use-tools";
import Field from "@/components/form/field";
import { Spinner } from "@/components/ui/spinner";
import { Edit2, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default () => {

    const { tools, openForm, handleCreate, handleClose, onSubmit, data, processing, errors, onChange, handleDelete, handleEdit } = useTools()

    return (
        <>
            <CardTable
                title="Herramientas ingresadas"
                description={`Se ingresaron ${tools.length} herramienta(s)`}
                name="herramientas"
                isEmpty={tools.length === 0}
                onOpen={handleCreate}
            >
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Marca</TableHead>
                            <TableHead>Modelo</TableHead>
                            <TableHead className="text-right">Cantidad</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tools.map((tool, key) => (
                            <TableRow key={key}>
                                <TableCell>{tool.type}</TableCell>
                                <TableCell>{tool.brand}</TableCell>
                                <TableCell>{tool.model}</TableCell>
                                <TableCell align="right">{tool.quantity}</TableCell>
                                <TableCell align="right">
                                    <Button size={"icon"} variant="ghost" onClick={() => handleEdit(tool)}>
                                        <Edit2 />
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size={"icon"} variant="ghost">
                                                <Trash2 />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction type="button" onClick={() => handleDelete(tool.id)}>Si, eliminar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardTable>

            <Dialog open={openForm} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar herramienta</DialogTitle>
                        <DialogDescription>Se agregará la herramienta al acceso de esta persona.</DialogDescription>
                    </DialogHeader>
                    <form id="toolForm" onSubmit={onSubmit}>
                        <fieldset className="flex-col flex gap-4">
                            <Field id="type" label="Tipo" name="type" value={data.type} error={errors.type} onChange={onChange} required placeholder="Escribe el tipo de herramienta" />
                            <Field id="brand" label="Marca" name="brand" value={data.brand} error={errors.brand} onChange={onChange} required placeholder="Escribe la marca de la herramienta" />
                            <Field id="model" label="Modelo" name="model" value={data.model} error={errors.model} onChange={onChange} required placeholder="Escribe el modelo de la herramienta" />
                            <Field id="quantity" type="number" label="Cantidad" name="quantity" value={data.quantity} error={errors.quantity} onChange={onChange} required placeholder="Escribe la cantidad de la herramienta" />
                        </fieldset>
                    </form>
                    <DialogFooter>
                        <Button type="button" variant={'outline'} disabled={processing} onClick={handleClose}>Cancelar</Button>
                        <Button type="submit" form="toolForm" disabled={processing}>
                            {processing ? 'Guardando...' : 'Guardar'}
                            {processing && <Spinner />}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}