import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import useCreate from '@/hooks/inspectionDigital/use-create';
import AppHeader from '@/layouts/app-header';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { AlertCircleIcon, ArrowRight } from 'lucide-react';

const Create = () => {
    const { handleSubmit, processing } = useCreate();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Inspección Digital', href: '/inspeccion-digital' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Nueva inspección digital" text="Cree una nueva inspección digital para comenzar a recopilar datos." />

            <section className="flex flex-col gap-6 px-4">
                <Alert>
                    <AlertCircleIcon />
                    <AlertTitle>
                        <h2>Comenzar inspección</h2>
                    </AlertTitle>
                    <AlertDescription>
                        <p>
                            Preparate para iniciar la inspección, cuando estes listo preciona en iniciar inspección. Esto te abrirá un formulario con
                            una serie de preguntas que deberas contestar con total verdad. Cuando estes listo para empezar da click en{' '}
                            <strong>iniciar inspeccion</strong>
                        </p>
                    </AlertDescription>
                </Alert>

                <form onClick={handleSubmit} method="POST">
                    <Button disabled={processing} type="submit">
                        Iniciar inspección
                        {processing ? <Spinner /> : <ArrowRight />}
                    </Button>
                </form>
            </section>
        </AppLayout>
    );
};

export default Create;
