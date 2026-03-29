import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Filter } from "lucide-react"
import { Label } from "@/components/ui/label"
import { PlanActionStatus } from "@/enums"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import FieldCheck from "@/components/form/field-check"
import useFilter from "@/hooks/incidenceControl/use-filter"

export default () => {

    const { filterCount, onChange, onReset, data } = useFilter();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} size={'icon'} className="relative">
                    {(filterCount > 0) && (
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                    <Filter />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Filtros</DialogTitle>
                    <DialogDescription>Marca las casillas que deseas ver filtradas</DialogDescription>
                </DialogHeader>

                <section className="flex gap-3">
                    <div className="flex-1">
                        <Label className="font-semibold">Estado de plan de acción</Label>
                        <div className="mt-2">
                            {Object.values(PlanActionStatus).map((status, key) => (
                                <FieldCheck
                                    key={key}
                                    label={status}
                                    name="status"
                                    value={status}
                                    checked={data.status.includes(status)}
                                    onClick={() => onChange('status', status)}
                                />
                            ))}
                            <FieldCheck
                                label="Sin plan de acción"
                                name="status"
                                value="Ninguno"
                                checked={data.status.includes("Ninguno")}
                                onClick={() => onChange('status', 'Ninguno')}
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <Label className="font-semibold">Tipo de incidencia</Label>
                        <div className="mt-2">
                            <FieldCheck
                                label="Inspección"
                                name="type[]"
                                value={"Inspección"}
                                checked={data.type.includes("Inspección")}
                                onClick={() => onChange('type', 'Inspección')}
                            />
                            <FieldCheck
                                label="Recorrido"
                                name="type"
                                value={"Recorrido"}
                                checked={data.type.includes("Recorrido")}
                                onClick={() => onChange('type', 'Recorrido')}
                            />
                        </div>
                    </div>
                </section>

                <DialogFooter>
                    {filterCount > 0 && (
                        <Button onClick={onReset} variant={'destructive'}>Limpiar filtro</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}