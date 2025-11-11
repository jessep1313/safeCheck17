import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import useQuestion from '@/hooks/inspectionDigital/use-question';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

export default () => {
    const { question, handleApprove, handleReject, processing, points } = useQuestion();

    return (
        <main
            className="relative z-[1] grid h-screen w-full content-center bg-cover bg-no-repeat px-4 py-8"
            style={{ backgroundImage: `url(${question.img_src})` }}
        >
            <div className="absolute top-0 right-0 bottom-0 left-0 -z-[1] bg-background/90 backdrop-blur-xl"></div>
            <article className="mx-auto flex h-full max-w-3xl flex-col gap-y-4">
                <picture>
                    <img
                        className="max-h-[300px] max-w-xs rounded"
                        src={question.img_src}
                        alt={`Imagen referencial de la pregunta para la inspección de la pregunta ${question.number}`}
                    />
                </picture>
                <header className="text-balance">
                    <h1 className="text-4xl font-extrabold">Punto No. {question.number}</h1>
                    <h2 className="font-lg text-xl">¿El punto ({question.label.toLocaleLowerCase()}) se encuentra en buen estado?</h2>
                </header>
                <p className="font-light text-pretty italic">{question.description}</p>
                <Alert>
                    <AlertTitle>
                        <h3>Nota</h3>
                    </AlertTitle>
                    <AlertDescription>
                        <p>
                            Si encuentras un problema en esta parte de la unidad, presiona en <strong>Hay un problema</strong> para detener la
                            inspección. Si la parte inspeccionada esta en buenas condiciones presiona en <strong>Todo está bien</strong>.
                        </p>
                    </AlertDescription>
                </Alert>
                <footer className="space-x-2">
                    {/* Reject Action */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant={'destructive'} disabled={processing}>
                                Hay un problema {processing ? <Spinner /> : <ThumbsDown />}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    <h3>¿Estás seguro?</h3>
                                </AlertDialogTitle>
                                <AlertDescription>
                                    <p>
                                        Si confirmas la acción darás por terminada la inspección marcando un problema o daño en el{' '}
                                        <strong>punto {question.label}</strong>. Si esto es lo que deseas presiona en{' '}
                                        <strong>confirmar y terminar</strong>.
                                    </p>
                                </AlertDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="items-center">
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <Button disabled={processing} onClick={handleReject} variant={'destructive'}>
                                    Confirmar y terminar
                                    {processing && <Spinner />}
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    {/* Approve Action */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button disabled={processing}>Todo esta bien {processing ? <Spinner /> : <ThumbsUp />}</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    <h3>¿Confirmar acción?</h3>
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    <p>
                                        Por seguridad confirma la acción. <strong>¿Deseas pasar al proximo punto de inspección?</strong>. Presiona{' '}
                                        <strong>confirmar</strong> para continuar con el proximo punto.
                                    </p>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel disabled={processing}>Cancelar</AlertDialogCancel>
                                <AlertDialogAction disabled={processing} onClick={handleApprove}>
                                    Confirmar {processing && <Spinner />}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </footer>
            </article>

            {/* Puntos de porcentaje */}
            <section className="relative top-0 mx-auto mt-5 w-full">
                <ul className="mx-auto flex w-full max-w-3xl space-x-0.5">
                    {Array.from({ length: points }).map((__, key) => {
                        const currentIndex = key + 1;
                        const currentQuestion = parseInt(question.number);

                        const bgColor =
                            currentIndex < currentQuestion
                                ? 'bg-green-500/50'
                                : currentIndex === currentQuestion
                                  ? 'bg-green-500'
                                  : 'bg-green-500/20';

                        return <li className={`h-2 w-2 rounded-full ${bgColor}`} key={key} />;
                    })}
                </ul>
            </section>
        </main>
    );
};
