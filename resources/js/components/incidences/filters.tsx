import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Filter } from "lucide-react"
import { Label } from "@/components/ui/label"
import { PlanActionStatus } from "@/enums"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import FieldCheck from "@/components/form/field-check"

export default () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={'outline'} size={'icon'}>
                            <Filter />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Filtros
                    </TooltipContent>
                </Tooltip>
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
                                <FieldCheck key={key} label={status} name="status[]" value={status} />
                            ))}
                            <FieldCheck label="Sin plan de acción" name="status[]" value="Ninguno" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <Label className="font-semibold">Tipo de incidencia</Label>
                        <div className="mt-2">
                            <FieldCheck label="Inspección" name="type[]" value={"Inspección"} />
                            <FieldCheck label="Recorrido" name="type[]" value={"Recorrido"} />
                        </div>
                    </div>
                </section>

                <DialogFooter>
                    <Button variant={'destructive'}>Limpiar filtro</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}