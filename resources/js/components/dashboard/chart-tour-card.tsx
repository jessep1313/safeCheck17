"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { usePage } from "@inertiajs/react"

const chartConfig = {
  quantity: {
    label: "Recorridos",
  },
  notIncidence: {
    label: "Sin incidencia",
    color: "hsl(var(--chart-2))",
  },
  incidence: {
    label: "Con incidencia",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig

export default function () {

  const {chartTourData} = usePage().props

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Estado de Recorridos</CardTitle>
        <CardDescription>Distribución de incidencias detectadas</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
            <Pie data={chartTourData as any} dataKey="quantity"  nameKey="category" />
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap text-nowrap gap-x-4 gap-y-1 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}