import { Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { InspectionStatus } from '@/types/inspections.d';

export const description = 'A donut chart with an active sector';

interface ChartQuestionsProps {
    answared: number;
    questions: number;
    successPercent: number;
    status: InspectionStatus;
    onToQuestions: () => void;
    onToProblem: () => void;
}

export default function ChartQuestions({ answared, questions, successPercent, status, onToProblem, onToQuestions }: ChartQuestionsProps) {
    const chartData = [
        { type: 'Contestadas', questions: answared, fill: status === InspectionStatus.Rejected ? 'var(--chart-5)' : 'var(--chart-2)' },
        { type: 'Pendientes', questions: questions - answared, fill: 'var(--chart-6)' },
    ];

    const chartConfig = {
        questions: {
            label: 'type',
        },
        Contestadas: {
            label: 'Contestadas',
            color: 'var(--chart-1)',
        },
        Pendientes: {
            label: 'Contestadas',
            color: 'var(--chart-1)',
        },
    } satisfies ChartConfig;
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Porcentage de exito</CardTitle>
                <CardDescription>
                    Se respondieron {answared} de {questions} preguntas
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={chartData}
                            dataKey="questions"
                            nameKey="type"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={0}
                            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => <Sector {...props} outerRadius={outerRadius + 10} />}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                    {successPercent}%
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                    Completado
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 sm:flex-row">
                <Button onClick={onToQuestions} className="w-full flex-1" variant={'secondary'}>
                    Ver puntos
                </Button>
                {status === InspectionStatus.Rejected && (
                    <Button onClick={onToProblem} variant={'destructive'} className="w-full flex-1">
                        Ver problema
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
