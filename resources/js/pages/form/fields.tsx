import Datatable from "@/components/inspection/fields/datatable";
import Field from "@/components/form/field";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types";
import { Loader, Plus } from "lucide-react";
import useFormFields from "@/hooks/use-form-fields";
import FieldUpload from "@/components/form/field-upload";

export default () => {

  const { data, errors, errorsFields, processing, processingEdit, handleCreateSubmit, setData, handleCloseCreate, handleOpenCreate, handleEditSubmit, handleChangeField, openCreate, openEdit,field, handleCloseEdit, handleOpenEdit, setField} = useFormFields()

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
        <Datatable onOpenCreate={handleOpenCreate} onOpenEdit={handleOpenEdit}  />
      </section>

      {/* Modal para crear */}

      <Modal
        title="Nuevo punto de inspección"
        open={openCreate}
        onHide={handleCloseCreate}
        actions={<Button disabled={processingEdit} type="submit" form="formCreate">{processing && <Loader className="animate-spin" />} {processingEdit ? "Guardando..." : "Guardar punto"}</Button>}
      >
        <form className="flex flex-col gap-4" onSubmit={handleCreateSubmit} id="formCreate">
          <Field
            id="fieldName"
            name="label"
            label="Titulo del punto"
            placeholder="Escribe el nombre de este punto"
            value={data.label}
            onChange={handleChangeField}
            error={errors.label}
            required
          />

          <Field
            id="fieldDescription"
            label="Descripción del punto"
            name="description"
            placeholder="Escribe una descripción corta de este punto"
            value={data.description}
            onChange={handleChangeField}
            error={errors.description}
            required
          />

          <FieldUpload
            name="img_src"
            label="Imagen de ejemplo"
            placeholder="Carga tu imagen o arrastra una hasta aquí"
            setData={setData}
            error={errors.img_src}
            required
           />
        </form>
      </Modal>

      {/* Modal para editar */}

      <Modal
        title={`Editar ${field.label}`}
        open={openEdit}
        onHide={handleCloseEdit}
        actions={<Button disabled={processingEdit} type="submit" form="formEdit">{processingEdit && <Loader className="animate-spin" />} {processingEdit ? "Actualizando..." : "Guardar cambios"}</Button>}
      >
        <form className="flex flex-col gap-4" onSubmit={handleEditSubmit} id="formEdit">
          <Field
            id="fieldNameEdit"
            name="label"
            label="Titulo del punto"
            placeholder="Escribe el nombre de este punto"
            value={field.label}
            onChange={(e) => handleChangeField(e, true)}
            error={errorsFields.label}
            required
          />

          <Field
            id="fieldDescriptionEdit"
            label="Descripción del punto"
            name="description"
            placeholder="Escribe una descripción corta de este punto"
            value={field.description}
            onChange={(e) => handleChangeField(e, true)}
            error={errorsFields.description}
            required
          />

          <FieldUpload
            id="imgSrcEdit"
            name="img_src"
            label="Imagen de ejemplo"
            placeholder="Carga tu imagen o arrastra una hasta aquí. <br /><i>La que se encuentrá actualmente será actualizada</i>"
            setData={setField}
            error={errorsFields.img_src}
            required
           />
        </form>
      </Modal>
    </AppLayout>
  )
}