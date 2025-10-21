import { Button } from '@/components/ui/button';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import AppHeader from '../app-header';

const form_steps = [
    { title: 'Preparación', routeName: 'inspections.step-prepare', routeNameSubmit: 'inspections.save-prepare', prevRoute: null, key: 'prepare' },
    {
        title: 'Datos de inspección',
        routeName: 'inspections.step-data',
        routeNameSubmit: 'inspections.save-data',
        prevRoute: 'inspections.save-prepare',
        key: 'data',
    },
    {
        title: 'Inspección',
        routeName: 'inspections.step-questions',
        routeNameSubmit: 'inspections.save-questions',
        prevRoute: 'inspections.save-data',
        key: 'questions',
    },
    {
        title: 'Resumen de inspección',
        routeName: 'inspections.step-summary',
        routeNameSubmit: 'inspections.save-finish',
        prevRoute: 'inspections.save-questions',
        key: 'summary',
    },
];

interface StepsLayoutProps {
    children: React.ReactNode;
}

export default ({ children }: StepsLayoutProps) => {
    const { uuid, pageStep } = usePage().props;
    const currentStep = form_steps.find((step) => step.key === pageStep);

    return (
        <>
            <header>
                <AppHeader title="Inspección Digital" text="Rellena la información y asegurate de responder correctamente para un buen resultado." />
                <nav className="px-4">
                    <ul className="flex items-start space-x-4">
                        {form_steps.map((step, index) => (
                            <li key={step.key}>
                                <Link
                                    className="group inline-flex items-center space-x-2 text-zinc-500 transition"
                                    href={route(step.routeName, { uuid })}
                                >
                                    <small
                                        className={`inline-flex aspect-square h-6 items-center justify-center rounded-full bg-zinc-500 text-white group-hover:opacity-90 ${
                                            currentStep!.key === step.key ? 'me-2.5 bg-emerald-600! ring-2 ring-emerald-600 ring-offset-2' : ''
                                        }`}
                                    >
                                        {index + 1}
                                    </small>
                                    <span>{step.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <form method="post" className="my-6 px-4">
                {children}
            </form>

            <footer className="flex space-x-2 px-4">
                {currentStep?.prevRoute && (
                    <Button asChild>
                        <Link href={route(currentStep?.prevRoute, { uuid })}>
                            <ArrowLeft />
                            Anterior
                        </Link>
                    </Button>
                )}

                {currentStep!.key !== 'summary' ? (
                    <Button type="submit">
                        Siguiente <ArrowRight />
                    </Button>
                ) : (
                    <Button type="submit">
                        Finalizar inspección <Check />
                    </Button>
                )}
            </footer>
        </>
    );
};
