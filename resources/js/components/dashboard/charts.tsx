import ChartInspectionCard from "./chart-inspection-card"
import ChartTourCard from "./chart-tour-card"

export default () => {
    return (
        <section className="grid auto-rows-min gap-4 md:grid-cols-2">
            <ChartInspectionCard />
            <ChartTourCard />
        </section>
    )
}