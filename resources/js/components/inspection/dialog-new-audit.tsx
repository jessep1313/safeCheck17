import Field from "../form/field";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Item } from "../ui/item";

export default function DialogNewAudit () {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'secondary'}>Auditar</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nueva auditoria</DialogTitle>
                </DialogHeader>

                <form id="formAudit">
                    <Alert>
                        <AlertTitle>Se tomarán 5 inspecciones aleatorias</AlertTitle>
                        <AlertDescription>Cada inspección tiene su archivo PDF al que podrás consultar para tener los detalles de la misma. Contestarás 4 preguntas referentes a la audición.</AlertDescription>
                    </Alert>
                </form>
                
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'outline'}>Cerrar</Button>
                    </DialogClose>
                    <Button form="formAudit" type="submit">Comenzar auditoria</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}