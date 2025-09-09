import MapInteractive from "@/components/inspection/map-interactive"
import AppHeader from "@/layouts/app-header"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"

const TruckInteractive = () => {
  return (
    <AppLayout>
        <Head title="Inspección Sistematica" />
        <article className="py-5">
            <AppHeader title="Inspección interactiva" />
            <section className="dark:invert">
              <MapInteractive />
            </section>
        </article>
    </AppLayout>
  )
}

export default TruckInteractive