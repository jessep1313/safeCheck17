import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { FormEvent } from 'react';
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
];

interface StepsLayoutProps {
    children: React.ReactNode;
    onSubmit: (e: FormEvent) => void;
    processing?: boolean;
    submitLabel?: string;
}

export default ({ children, onSubmit, processing, submitLabel = 'Siguiente' }: StepsLayoutProps) => {
    const { uuid, pageStep } = usePage().props;
    const currentStep = form_steps.find((step) => step.key === pageStep);

    return (
        <>
            <header>
                <AppHeader title="Inspección Digital" text="Rellena la información y asegurate de responder correctamente para un buen resultado." />
                <nav className="px-4">
                    <ul className="flex items-start space-x-4">
                        {form_steps.map((step, index) => (
                            <li key={step.key} className="group inline-flex items-center space-x-2 text-center text-zinc-500 transition">
                                <small
                                    className={`inline-flex aspect-square h-6 items-center justify-center rounded-full bg-zinc-500 text-white group-hover:opacity-90 ${
                                        currentStep!.key === step.key ? 'me-2.5 bg-emerald-600! ring-2 ring-emerald-600 ring-offset-2' : ''
                                    }`}
                                >
                                    {index + 1}
                                </small>
                                <span className="text-sm">{step.title}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <form method="post" className="my-6 px-4" id="inspectForm" onSubmit={onSubmit}>
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
                    <Button type="submit" form="inspectForm" disabled={processing}>
                        {submitLabel} {processing ? <Spinner /> : <ArrowRight />}
                    </Button>
                ) : (
                    <Button type="submit" form="inspectForm" disabled={processing}>
                        Finalizar inspección {processing ? <Spinner /> : <Check />}
                    </Button>
                )}
            </footer>
        </>
    );
};
