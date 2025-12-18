"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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
    label: "Inspecciones",
  },
  notIncidence: {
    label: "Sin incidencia",
    color: "hsl(var(--chart-2))",
  },
  incidence: {
    label: "Con incidencia",
    color: "hsl(var(--chart-1))",
  },
  outputs: {
    label: "Salidas",
    color: "hsl(var(--chart-6))"
  },
  entries: {
    label: "Entradas",
    color: "hsl(var(--chart-4))"
  }
} satisfies ChartConfig
export default () => {

    const { chartInspectionStatusData, chartInspectionTypeData } = usePage().props

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Inspecciones realizadas</CardTitle>
        <CardDescription>Estados y tipos de inspecciones</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="category"
                  indicator="dashed"
                  labelFormatter={(_, payload) => {
                    return chartConfig[
                      payload?.[0].dataKey as keyof typeof chartConfig
                    ].label
                  }}
                />
              }
            />
            <Pie data={chartInspectionTypeData as any} dataKey="quantity" outerRadius={60} />
            <Pie
              data={chartInspectionStatusData as any}
              dataKey="quantity"
              innerRadius={70}
              outerRadius={90}
            />
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
