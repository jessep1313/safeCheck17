import DtFormFields from "@/components/datatable/dt-form-fields";
import Field from "@/components/form/field";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import useRecordForm from "@/hooks/use-record-form";
import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types";
import { Plus } from "lucide-react";



const Create = () => {

  const { openCreate, handleCloseCreate, handleOpenCreate } = useRecordForm()

  const breadcrumbs: BreadcrumbItem[] = [
    { href: '/formularios', title: 'Formularios' },
    { href: '/formularios/nuevo', title: 'Puntos de inspección' }
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <AppHeader
        title="Puntos de inspección"
        text="Agrega o quita puntos de inspección del formulario."
      >
        <Button onClick={handleOpenCreate} type="button">
          Agregar nuevo punto <Plus />
        </Button>
      </AppHeader>

      <section className="container">
        <DtFormFields />
      </section>

      <Modal
        title="Nuevo punto de inspección"
        open={openCreate}
        onHide={handleCloseCreate}
        actions={<Button>Guardar punto</Button>}
      >
        <form className="flex flex-col gap-4">
          <Field
            id="fieldName"
            label="Titulo del punto"
            placeholder="Escribe el nombre de este punto"
            required
          />

          <Field
            id="fieldDescription"
            label="Descripción del punto"
            placeholder="Escribe una descripción corta de este punto"
            required
          />

          <Field
            id="fieldImage"
            label="Imagen de referencia"
            type="file"
            description="Anexa una imagen que haga referencia a este punto."
            required
          />
        </form>
      </Modal>
    </AppLayout>
  )
}

export default Create