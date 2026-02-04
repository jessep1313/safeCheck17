import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ButtonFilter from "./button-filter"
import { useState } from "react"
import Field from "@/components/form/field"
import FieldSelect from "@/components/form/field-select"
import useFilter from "@/hooks/accessControl/use-filter"

export default () => {

    const [open, setOpen] = useState(false)
    const { data, onChange, onReset, filterCount } = useFilter()

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <ButtonFilter activeCount={filterCount} onClick={() => setOpen(true)} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Filtros</DialogTitle>
                </DialogHeader>
                <fieldset className="grid grid-cols-2 gap-x-4 gap-y-6">
                    <Field id="checkIn" name="check_in" label="Fecha de entrada" type="date" value={data.check_in} onChange={(e) => onChange('check_in', e.target.value)} />
                    <Field id="checkOut" name="check_out" label="Fecha de salida" type="date" value={data.check_out} onChange={(e) => onChange('check_out', e.target.value)} />
                    <FieldSelect id="building" name="building_id" label="Edificio" options={[]} placeholder="Selecciona un edificio" />
                    <FieldSelect id="booth" name="booth_id" label="Casetas" options={[]} placeholder="Selecciona una caseta" />
                </fieldset>
                <DialogFooter>
                    {filterCount > 0 && (
                        <Button variant={'destructive'} onClick={onReset}>
                            Limpiar filtros
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}