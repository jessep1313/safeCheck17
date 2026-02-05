import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ButtonFilter from "./button-filter"
import { useState } from "react"
import Field from "@/components/form/field"
import FieldSelect from "@/components/form/field-select"
import useFilter from "@/hooks/accessControl/use-filter"
import { usePage } from "@inertiajs/react"
import { PageProps } from "@inertiajs/core"
import { CatalogItem } from "@/types"

interface Props extends PageProps {
    catalogs: {
        buildings: CatalogItem[]
        boots: CatalogItem[]
    }
}

export default () => {

    const [open, setOpen] = useState(false)
    const { data, onChange, onReset, filterCount } = useFilter()

    const { catalogs: { buildings, boots } } = usePage<Props>().props

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <ButtonFilter activeCount={filterCount} onClick={() => setOpen(true)} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Filtros</DialogTitle>
                </DialogHeader>
                <section className="grid grid-cols-2 gap-x-4 gap-y-6">
                    <fieldset className="col-span-2">
                        <legend className="mb-2 text-sm font-medium">Fecha de entrada</legend>
                        <div className="flex gap-4">
                            <Field id="checkIn" name="check_in" label="Desde" type="date" value={data.check_in} onChange={(e) => onChange('check_in', e.target.value)} />
                            <Field id="checkOut" name="check_out" label="Hasta" type="date" value={data.check_out} onChange={(e) => onChange('check_out', e.target.value)} />
                        </div>
                    </fieldset>
                    <FieldSelect id="building" name="building_id" label="Edificio" options={buildings.map(el => ({ value: el.id, label: el.name }))} placeholder="Selecciona un edificio" value={data.building_id} onValueChange={(value) => onChange('building_id', value)} />
                    <FieldSelect id="booth" name="booth_id" label="Casetas" options={boots.map(el => ({ value: el.id, label: el.name }))} placeholder="Selecciona una caseta" value={data.booth_id} onValueChange={(value) => onChange('booth_id', value)} />
                </section>
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