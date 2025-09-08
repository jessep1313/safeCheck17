import MapInteractive from "@/components/inspection/map-interactive"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"

const TruckInteractive = () => {
  return (
    <AppLayout>
        <Head title="Inspección Sistematica" />
        <article className="p-4">
            <header>
                <h1 className="text-2xl font-bold">Inspección Sistematica</h1>
                <p>Vehiculo, Caja y Operador</p>
            </header>
            <section>
              <MapInteractive />
            </section>
        </article>
    </AppLayout>
  )
}

export default TruckInteractive