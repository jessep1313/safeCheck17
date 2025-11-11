import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useQuestions from '@/hooks/inspectionDigital/use-questions';
import AppLayout from '@/layouts/app-layout';
import StepsLayout from '@/layouts/inspectForm/steps-layout';
import { BreadcrumbItem } from '@/types';
import { AlertCircleIcon } from 'lucide-react';

export default () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Inspecciones', href: '/inspecciones' },
        { title: 'Crear', href: '/inspecciones/crear' },
        { title: 'Puntos', href: '/inspecciones/crear/puntos' },
    ];
    const { handleSubmit, processing } = useQuestions();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <StepsLayout onSubmit={handleSubmit} submitLabel="Comenzar con la inspección" processing={processing}>
                <section className="max-w-2xl">
                    <Alert>
                        <AlertCircleIcon />
                        <AlertTitle>Importante, antes de iniciar</AlertTitle>
                        <AlertDescription>
                            <p>
                                Debes tener en cuenta que una vez empiezes a contestar las preguntas no podrás interrumpir la inspección hasta
                                terminar de revisar la unidad o hasta encontrar un problema en un punto.
                            </p>
                            <p>
                                Si estas seguro de empezar con las preguntas, presiona en{' '}
                                <span className="font-bold">Comenzar con la inspección</span>, esto te enviará al cuestionario de inspección,
                            </p>
                        </AlertDescription>
                    </Alert>
                </section>
            </StepsLayout>
        </AppLayout>
    );
};
