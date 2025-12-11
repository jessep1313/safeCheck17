import { useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Spinner } from '../ui/spinner';

export default function DialogNewAudit() {
    const { post, processing } = useForm();

    const handleClick = () => {
        post(route('audit.inspection.store'));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'secondary'}>Auditar</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nueva auditoria</DialogTitle>
                </DialogHeader>

                <Alert>
                    <AlertTitle>Se tomarán 5 inspecciones aleatorias</AlertTitle>
                    <AlertDescription>
                        Cada inspección tiene su archivo PDF al que podrás consultar para tener los detalles de la misma. Contestarás 4 preguntas
                        referentes a la audición.
                    </AlertDescription>
                </Alert>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'outline'}>Cerrar</Button>
                    </DialogClose>
                    <Button onClick={handleClick} disabled={processing}>
                        Comenzar auditoria
                        {processing ? <Spinner /> : <ArrowRight />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
