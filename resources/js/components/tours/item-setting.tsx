import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { TourDefaultQuestion } from '@/types/tours';
import { Edit, Menu, Trash } from 'lucide-react';
import Field from '@/components/form/field';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

interface Props {
    question: TourDefaultQuestion;
}

export default ({ question }: Props) => {

    const { data, setData, put, processing, delete: destroy } = useForm({
        question: question.question,
    });

    const handleSubmit = () => {
        console.log("Enviando...")
        put(route('settings.tour.update', { id: question.id }), {
            onSuccess: () => {
                toast.success('Pregunta actualizada');
            },
            onError: () => {
                toast.error('Error al actualizar la pregunta');
            },
        });
    }

    const handleDestroy = () => {
        destroy(route('settings.tour.destroy', { id: question.id }), {
            onSuccess: () => {
                toast.success('Pregunta eliminada');
            },
            onError: () => {
                toast.error('Error al eliminar la pregunta');
            },
        });
    }

    return (
        <Item variant={'muted'} size={'sm'}>
            <ItemMedia variant={'icon'}>
                <Menu />
            </ItemMedia>
            <ItemContent>
                <ItemTitle>{question.question}</ItemTitle>
            </ItemContent>
            <ItemActions>
                <Dialog>
                    <DialogTrigger>
                        <Button size={'icon'} variant={'secondary'}>
                            <Edit />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar pregunta</DialogTitle>
                            <DialogDescription>Escribe en el recuadro para actualizar la pregunta</DialogDescription>
                            <Field
                                id={`question-${question.id}`}
                                name='question'
                                type='text'
                                label='Pregunta'
                                value={data.question}
                                onChange={(e) => setData('question', e.target.value)}
                            />
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant={'outline'}>Cancelar</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button onClick={handleSubmit} disabled={processing}>
                                    {processing && <Spinner />}
                                    {processing ? 'Actualizando...' : 'Actualizar'}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button size={'icon'} variant={'secondary'}>
                            <Trash />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar pregunta?</AlertDialogTitle>
                            <AlertDialogDescription><p>Si confirmas está acción la pregunta será borrada de está lista, y <b className='text-accent-foreground'>en los recorridos que realices de aquí en adelante ya no aparecerá</b>. Si estas seguro presiona <b>confirmar</b>.</p></AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={processing}>
                                Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleDestroy} disabled={processing}>
                                {processing && <Spinner />}
                                {processing ? 'Eliminando...' : 'Confirmar'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </ItemActions>
        </Item>
    )
}