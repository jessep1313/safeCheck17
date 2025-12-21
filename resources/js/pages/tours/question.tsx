import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useTourQuestion from "@/hooks/tours/use-tour-question";
import Layout from "@/layouts/tourForm/layout";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default () => {

    const { data, points, handleApprove, handleReject } = useTourQuestion()

    return (
        <Layout>
            <main className="space-y-5">
                <ul className="flex gap-1 w-full">
                    {points.map((point, key) => (
                        <li key={key} className={`${point.answered ? "bg-primary" : (point.id === data.id ? "bg-green-500" : "bg-accent")} w-1 h-1 rounded-full`}>
                        </li>
                    ))}
                </ul>
                <header>
                    <h1 className="text-2xl font-bold">{data.question}</h1>
                    <h2>¿El area se encuentra en buenas condiciones?</h2>
                </header>
                <footer className="flex gap-2 w-full">
                    {/* Reject */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="flex-1" variant="destructive">No <ThumbsDown /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estas seguro de rechazar?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <p>Una vez que rechaces la pregunta, no podrás volver a responderla. Si estas seguro presiona en <strong>confirmar</strong>, en caso de no estar segura presiona en <strong>cancelar</strong>.</p>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleReject}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    {/* Approve */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="flex-1" variant="default">Si <ThumbsUp /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estas seguro de aprobar?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <p>Una vez que aprobaches la pregunta, no podrás volver a responderla. Si estas seguro presiona en <strong>confirmar</strong>, en caso de no estar segura presiona en <strong>cancelar</strong>.</p>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleApprove}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </footer>
            </main>
        </Layout>
    );
}