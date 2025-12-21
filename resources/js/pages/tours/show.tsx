import Chart from "@/components/tours/dashboard/chart"
import Comment from "@/components/tours/dashboard/comment"
import Evidences from "@/components/tours/dashboard/evidences"
import Info from "@/components/tours/dashboard/info"
import Points from "@/components/tours/dashboard/points"
import AppHeader from "@/layouts/app-header"
import AppLayout from "@/layouts/app-layout"
import { usePage } from "@inertiajs/react"
import { PageProps } from "@inertiajs/core"
import Actions from "@/components/tours/dashboard/actions"
import { TourQuestion, TourRow } from "@/types/tours"
import { InspectionStatus } from "@/types/inspections.d"

interface Props extends PageProps {
    uuid: string
    questions: TourQuestion[]
    data: TourRow
    evidences: string[]
}

export default () => {

    const { uuid, questions, data, evidences } = usePage<Props>().props

    return (
        <AppLayout>
            <AppHeader title="Resumen del recorrido" text={uuid as string}>
                <Actions uuid={uuid} />
            </AppHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4">
                <section className="col-span-1">
                    <Chart questions={questions} />
                </section>
                <section className="col-span-1 lg:col-span-2">
                    <Info data={data} />
                </section>
                <section className="col-span-full">
                    <Points questions={questions} />
                </section>
                {data.status === InspectionStatus.Rejected && (
                    <>
                        {data.comments && (
                            <section className="col-span-full">
                                <Comment comment={data.comments} />
                            </section>
                        )}
                        {evidences && (
                            <section className="col-span-full">
                                <Evidences data={evidences} />
                            </section>
                        )}
                    </>
                )}
            </div>
        </AppLayout>
    )
}