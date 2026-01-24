import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useId } from "react"
import CardTable from "./card-table"
import useDevice from "@/hooks/accessControl/use-device"
import Field from "@/components/form/field"
import { Spinner } from "@/components/ui/spinner"
import { Edit2, Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export default () => {
    const formId = useId();
    const { handleSave, handleOpenCreate, handleCloseForm, openForm, processing, handleInputChange, errors, data, devices, handleOpenEdit, handleDelete } = useDevice()

    return (
        <>
            <CardTable title="Dispositivos ingresados" description={`Se ingresarón ${devices.length} dispositivo(s)`} name="dispositivos" onOpen={handleOpenCreate} isEmpty={devices.length === 0}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Modelo</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead className="text-end">Cantidad</TableHead>
                            <TableHead className="text-end">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {devices.map((device) => (
                            <TableRow key={device.id}>
                                <TableCell>{device.model}</TableCell>
                                <TableCell>{device.type}</TableCell>
                                <TableCell className="text-end">{device.quantity}</TableCell>
                                <TableCell className="text-end">
                                    <Button size={'icon'} variant="ghost" onClick={() => handleOpenEdit(device)}><Edit2 /></Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size={'icon'} variant="ghost"><Trash2 /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Eliminar dispositivo</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    <p>Se eliminará el dispositivo <strong>{device.model}</strong> del acceso de esta persona.</p>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(device.id)}>Continuar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardTable>
            <Dialog open={openForm} onOpenChange={handleCloseForm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agregar dispositivo</DialogTitle>
                    </DialogHeader>
                    <form id={formId} onSubmit={handleSave} className="flex flex-col gap-4">
                        <Field error={errors.type} onChange={handleInputChange} value={data.type} id="type" label="Tipo" placeholder="Escriba el tipo de dispositivo" name="type" required />
                        <Field error={errors.brand} onChange={handleInputChange} value={data.brand} id="brand" label="Marca" placeholder="Escriba la marca del dispositivo" name="brand" required />
                        <Field error={errors.model} onChange={handleInputChange} value={data.model} id="model" label="Modelo" placeholder="Escriba el modelo del dispositivo" name="model" required />
                        <Field error={errors.quantity} onChange={handleInputChange} value={data.quantity} id="quantity" label="Cantidad" type="number" name="quantity" required />
                    </form>
                    <DialogFooter>
                        <Button type="button" variant={'outline'} disabled={processing} onClick={handleCloseForm}>Cancelar</Button>
                        <Button form={formId} type="submit" disabled={processing}>{processing ? 'Guardando...' : 'Guardar'} {processing && <Spinner />}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}