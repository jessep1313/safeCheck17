import CardInfoInspection from '@/components/inspection/show/card-info-inspection';
import CardInfoVehicle from '@/components/inspection/show/card-info-vehicle';
import CardPeoplesInspection from '@/components/inspection/show/card-peoples-inspection';
import ChartQuestions from '@/components/inspection/show/chart-questions';
import Header from '@/components/inspection/show/header';
import Problem from '@/components/inspection/show/problem';
import Questions from '@/components/inspection/show/questions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { InspectionPoint, InspectionPointProblem, InspectionShow, InspectionVehicle } from '@/types/inspections';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import React from 'react';

interface ShowPageProps extends PageProps {
    inspection: InspectionShow;
    uuid: string;
    vehicle: InspectionVehicle;
    points: InspectionPoint[];
    problem: InspectionPointProblem;
}

export default () => {
    const { uuid, inspection, vehicle, points, problem } = usePage<ShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Inspecciones', href: '/inspecciones' },
        { title: 'Resumen de inspección', href: `/inspecciones/${uuid}` },
    ];

    const questionProblem = points.find((point) => !point.approved && point.answered);
    const questionsRef = React.useRef<HTMLDivElement>(null);
    const problemRef = React.useRef<HTMLDivElement>(null);

    const handleToQuestions = () => {
        if (questionsRef.current) {
            questionsRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    const handleToProblem = () => {
        if (problemRef.current) {
            problemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <article className="container mx-auto">
                <Header uuid={`${uuid}`} />

                <section className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="col-span-full lg:col-span-1">
                        <ChartQuestions
                            status={inspection.status}
                            answared={inspection.success_questions}
                            questions={inspection.total_questions}
                            successPercent={inspection.success_percentage}
                            onToProblem={handleToProblem}
                            onToQuestions={handleToQuestions}
                        />
                    </div>
                    <div className="col-span-2">
                        <Tabs defaultValue="inspection" className="w-full">
                            <TabsList className="w-full">
                                <TabsTrigger className="flex-1" value="inspection">
                                    Inspección
                                </TabsTrigger>
                                <TabsTrigger className="flex-1" value="vehicle">
                                    Transporte
                                </TabsTrigger>
                                <TabsTrigger className="flex-1" value="peoples">
                                    Participantes
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="inspection">
                                <CardInfoInspection data={inspection} />
                            </TabsContent>
                            <TabsContent value="vehicle">
                                <CardInfoVehicle data={vehicle} />
                            </TabsContent>
                            <TabsContent value="peoples">
                                <CardPeoplesInspection data={inspection} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                <section ref={questionsRef} className="mb-5">
                    <Questions data={points} />
                </section>

                {questionProblem && problem && (
                    <section ref={problemRef} className="mb-5">
                        <Problem question={questionProblem} problem={problem} />
                    </section>
                )}
            </article>
        </AppLayout>
    );
};
