import DtForms from "@/components/datatable/dt-forms"
import FieldSelect from "@/components/form/field-select"
import Modal from "@/components/modal"
import { Button } from "@/components/ui/button"
import useRecordForm from "@/hooks/use-record-form"
import AppHeader from "@/layouts/app-header"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem, CatalogItem, SelectOption } from "@/types"
import { Link, usePage } from "@inertiajs/react"
import { PageProps } from "@inertiajs/core"
import { ArrowRight, Loader, Plus } from "lucide-react"
import { InspectForm } from "@/types/form-record"

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Formularios', href: '/formularios' },
]

interface FormPageProps extends PageProps {
  certificates: CatalogItem[],
  vehicleTypes: CatalogItem[],
  inspectForms: InspectForm[]
}

const Home = () => {

  const { 
    handleOpenCreate, 
    handleCloseCreate, 
    openCreate, 
    handleChangeSelect, 
    handleSubmit, 
    data, 
    errors, 
    processing 
  } = useRecordForm()
  
  const { certificates, vehicleTypes, inspectForms } = usePage<FormPageProps>().props

  const certificateOptions: SelectOption[] = certificates.map(el => ({ label: el.name, value: el.id }))
  const vehicleTypeOptions: SelectOption[] = vehicleTypes.map(el => ({ label: el.name, value: el.id }))

  return (
    <AppLayout breadcrumbs={breadcrumbs}>

      <AppHeader title="Formularios">
        <Button type="button" onClick={handleOpenCreate}>
          Agregar formulario
          <Plus />
        </Button>
      </AppHeader>

      <section className="container">
        <DtForms onOpenCreate={handleOpenCreate} data={inspectForms} />
      </section>

      <Modal
        open={openCreate}
        onHide={handleCloseCreate}
        title="Nuevo formulario"
        description="Selecciona el tipo de certificación y camión para este formulario"
        actions={
          <Button 
            disabled={processing} 
            type="submit" 
            form="formCreate"
          >
            {processing ? "Guardando...": "Crear formulario"}
            {processing ? <Loader className="animate-spin" /> : <ArrowRight />}
          </Button>
        }
      >
        <form id="formCreate" onSubmit={handleSubmit} method="post" className="flex flex-col gap-3">
          <FieldSelect
            id="vehicle_type"
            name="vehicle_type"
            label="Tipo de vehículo"
            placeholder="Selecciona el tipo de vehículo"
            required
            value={data.vehicle_type}
            onValueChange={value => handleChangeSelect('vehicle_type', value)}
            options={vehicleTypeOptions}
            error={errors.vehicle_type}
          />
          <FieldSelect
            id="certification_type"
            name="certification_type"
            label="Tipo de certificado"
            placeholder="Selecciona un tipo de certificado"
            required
            value={data.certification_type}
            onValueChange={value => handleChangeSelect('certification_type', value)}
            options={certificateOptions}
            error={errors.certification_type}
          />
        </form>
      </Modal>

    </AppLayout>
  )
}

export default Home