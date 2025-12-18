import DownloadReport from '@/components/audits/download-report';
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
import { Item, ItemContent, ItemDescription, ItemFooter, ItemMedia, ItemTitle } from '@/components/ui/item';
import useQuestion from '@/hooks/audit/inspection/use-question';
import AuditLayout from '@/layouts/inspectForm/audit-layout';
import { ArrowRight, Download, ThumbsDown, ThumbsUp } from 'lucide-react';

export default function Question() {
    const { audit, question, processing, handleApprobe, handleReject, inspectionUuid } = useQuestion();
    return (
        <AuditLayout>
            <div className="fixed top-5 right-5 left-5 mx-auto w-full max-w-fit">
                <DownloadReport href={route('inspections.export-pdf', { uuid: inspectionUuid })} />
            </div>
            <div className="max-w-xl">
                <Item className="text-center">
                    <ItemContent>
                        <ItemTitle className="w-full text-center">
                            <h1 className="w-full text-2xl">{question.question}</h1>
                        </ItemTitle>
                        <ItemDescription>
                            <p>
                                Si estas a favor de este punto, presiona en <strong>Si</strong>, caso contrario presiona en <strong>No</strong>
                            </p>
                        </ItemDescription>
                    </ItemContent>
                    <ItemFooter>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant={'destructive'} className="flex-1">
                                    No <ThumbsDown />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>¿Este punto no se cumplio?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <p>
                                            Si el punto actual no se cumplio, presiona en <strong>Confirmar</strong>, en caso de que te hayas
                                            equivocado presiona en <strong>Cancelar</strong>
                                        </p>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleReject}>
                                        Confirmar
                                        <ArrowRight />
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="flex-1">
                                    Si <ThumbsUp />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>¿Este punto cumple?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <p>
                                            Si el punto actual cumple correctamente, presiona en <strong>Confirmar</strong>, en caso de que no sea así
                                            presiona <strong>Cancelar</strong>.
                                        </p>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleApprobe}>
                                        Confirmar
                                        <ArrowRight />
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </ItemFooter>
                </Item>
            </div>
        </AuditLayout>
    );
}
