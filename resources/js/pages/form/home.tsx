import DtForms from "@/components/datatable/dt-forms"
import { Button } from "@/components/ui/button"
import AppHeader from "@/layouts/app-header"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types"
import { Link } from "@inertiajs/react"

const breadcrumbs: BreadcrumbItem[] = [
  {title: 'Dashboard', href: '/'},
  {title: 'Formularios', href: '/formularios'},
]

const Home = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AppHeader title="Formularios">
        <Button asChild>
          <Link href="">Nuevo formulario</Link>
        </Button>
      </AppHeader>
      <section className="container">
        <DtForms />
      </section>
    </AppLayout>
  )
}

export default Home