import Chronometer from "@/components/chronometer";
import { AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useTourTimer from "@/hooks/tours/use-tour-timer";
import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { AlertTriangle, Square } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Bitacora de recorridos', href: '/recorridos' },
    { title: 'Temporizador', href: '' },
];
export default function Timer () {
    const {time, onFinish, onIncidence} = useTourTimer();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Cronometro activo" text="El recorrido ha empezado, el tiempo está siendo capturado." />
            <Card className="mx-4 max-w-xl">

                <CardContent>
                    <Chronometer time={time}/>
                </CardContent>

                <CardFooter className="space-x-2 flex justify-center">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button 
                                variant={'destructive'} 
                                onClick={onIncidence}
                                className="flex-1"
                            >
                                Incidencia encontrada <AlertTriangle />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    ¿Encontraste una incidencia?
                                </AlertDialogTitle>
                                <AlertDescription>
                                    <p>Si presionas <strong>confirmar</strong>, el cronometro se desactivará y el recorrido abra terminado. Si estás seguro de continuar presiona en <strong>confirmar</strong>.</p>
                                </AlertDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={onIncidence}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="flex-1">Finalizar recorrido <Square /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    ¿Finalizar recorrido?
                                </AlertDialogTitle>
                                <AlertDescription>
                                    <p>Si presionas <strong>confirmar</strong>, el cronometro se desactivará y el recorrido abra terminado. Si estás seguro de continuar presiona en <strong>confirmar</strong>.</p>
                                </AlertDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={onFinish}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </AppLayout>
    )
}