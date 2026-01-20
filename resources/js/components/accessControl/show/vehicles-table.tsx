import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Edit2, Trash2 } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import CardTable from "./card-table"
import Field from "@/components/form/field"
import useVehicles from "@/hooks/accessControl/use-vehicles"

export default () => {

    const { data, openForm, handleClose, handleCreate, onChange, onSubmit, processing, vehicles, handleEdit, vehicleId, handleDelete } = useVehicles();

    return (
        <>
            {/* Tabla */}
            <CardTable title="Vehiculos dentro" description={`Hay ${vehicles.length} vehiculo(s) dentro`} isEmpty={vehicles.length === 0} name="vehículos" onOpen={handleCreate}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Placas</TableHead>
                            <TableHead>Modelo</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicles.map((vehicle, key) => (
                            <TableRow key={key}>
                                <TableCell>{vehicle.plate}</TableCell>
                                <TableCell>{vehicle.model}</TableCell>
                                <TableCell>{vehicle.color}</TableCell>
                                <TableCell align="right">
                                    <Button size={'icon'} variant={'ghost'} onClick={() => handleEdit(vehicle.id, vehicle)}><Edit2 /></Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger>
                                            <Button size={'icon'} variant={'ghost'}><Trash2 /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    <p>Se eliminará el vehículo <strong>{vehicle.plate}</strong> de el acceso de esta persona.</p>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(vehicle.id)}>Continuar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardTable>

            {/* Formulario */}
            <Dialog open={openForm} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{vehicleId ? "Editar vehículo" : "Agregar vehículo"}</DialogTitle>
                        <DialogDescription>Completa los campos para {vehicleId ? "editar" : "agregar"} un vehículo</DialogDescription>
                    </DialogHeader>
                    <form id="vehicleForm" onSubmit={onSubmit} className="flex flex-col gap-4">
                        <Field id="inpPlate" label="Placas de la unidad" placeholder="JAL-31991" name="plate" onChange={onChange} value={data.plate} required />
                        <Field id="inpModel" label="Modelo" placeholder="Toyota" name="model" onChange={onChange} value={data.model} required />
                        <Field id="inpColor" label="Color" placeholder="Rojo" name="color" onChange={onChange} value={data.color} required />
                    </form>
                    <DialogFooter>
                        <Button type="button" variant="outline" disabled={processing} onClick={handleClose}>Cancelar</Button>
                        <Button form="vehicleForm" type="submit" disabled={processing}>Guardar {processing && <Spinner />}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}