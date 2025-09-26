import { ArrowRight, Loader, Plus } from "lucide-react"
import { BreadcrumbItem } from "@/types"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@/types/datatable.d"
import { InspectForm } from "@/types/form-record"
import actionsRowForm from "@/components/form/actions-row-form"
import AppHeader from "@/layouts/app-header"
import AppLayout from "@/layouts/app-layout"
import columnsForm from "@/components/form/columns-form"
import Datatable from "@/components/datatable/datatable"
import FieldCardSwitch from "@/components/form/field-card-switch"
import FieldSelect from "@/components/form/field-select"
import Modal from "@/components/modal"
import useRecordForm from "@/hooks/use-record-form"

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/' },
  { title: 'Formularios', href: '/formularios' },
]

const Home = () => {

  const { 
    data, 
    errors, 
    handleChangeSelect, 
    handleCloseCreate, 
    handleOpenCreate, 
    handleSubmit, 
    handleTogglePreFields,
    handleDelete,
    openCreate, 
    processing,
    certificateOptions,
    vehicleOptions,
  } = useRecordForm()  

  const columns = columnsForm() as ColumnDef<InspectForm>[];
  const actions = actionsRowForm(handleDelete)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>

      <AppHeader title="Formularios">
        <Button type="button" onClick={handleOpenCreate}>
          Agregar formulario
          <Plus />
        </Button>
      </AppHeader>

      <section className="container">
        <Datatable<InspectForm>
          columns={columns}
          routeName="form.home"
          actions={actions}
        />
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
          <FieldSelect
            id="vehicle_type"
            name="vehicle_type"
            label="Tipo de vehículo"
            placeholder="Selecciona el tipo de vehículo"
            required
            value={data.vehicle_type}
            onValueChange={value => handleChangeSelect('vehicle_type', value)}
            options={vehicleOptions}
            error={errors.vehicle_type}
          />
          <FieldCardSwitch 
            title="Precargar puntos de inspección"
            description="Si está activo, se precargarán los 18 campos estándar para inspección."
            checked={data.preload_fields}
            onCheckedChange={handleTogglePreFields}
          />
        </form>
      </Modal>

    </AppLayout>
  )
}

export default Home