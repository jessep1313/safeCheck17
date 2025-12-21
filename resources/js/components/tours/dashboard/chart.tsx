import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TourQuestion } from "@/types/tours"
import { color } from "framer-motion"
import { Label, Pie, PieChart } from "recharts"

interface Props {
    questions: TourQuestion[]
}


export default ({ questions }: Props) => {

    const notAnswered = questions.filter((question) => !question.answered).length
    const answered = questions.filter((question) => question.answered).length
    const percentAnswered = Math.round(answered / questions.length * 100)
    const colorAnswered = percentAnswered === 100 ? "var(--chart-2)" : percentAnswered > 50 ? "var(--chart-3)" : "var(--chart-5)"
    const data = [
        {
            name: 'answered',
            value: answered,
            fill: colorAnswered
        },
        {
            name: 'notAnswered',
            value: notAnswered,
            fill: "var(--chart-7)",
        },
    ]

    const chartConfig = {
        value: {
            label: 'Estado de recorrido'
        },
        notAnswered: {
            label: 'No respondidos',
            color: "var(--chart-5)",
        },
        answered: {
            label: 'Respondidos',
            color: "var(--chart-6)",
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Porcentaje de exito</CardTitle>
                <CardDescription>
                    <p>Se respondieron {answered} de {questions.length} preguntas</p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                        <Pie data={data} dataKey="value" innerRadius={60} >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                    {percentAnswered}%
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
            <CardFooter>
                <Button className="w-full">
                    Ver puntos
                </Button>
            </CardFooter>
        </Card>
    )
}