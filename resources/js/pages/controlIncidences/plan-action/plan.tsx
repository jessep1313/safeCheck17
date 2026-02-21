import FieldErrorMessage from "@/components/form/field-error-message"
import TiptapEditor from "@/components/form/tip-tap"
import useDefinition from "@/hooks/actionPlan/use-definition"
import CreateLayout from "@/layouts/planAction/create-layout"
import { PenBox } from "lucide-react"

export default () => {

    const { data, handleSubmit, handleChange, processing, errors } = useDefinition()

    return (
        <CreateLayout
            title="Define el plan de acción"
            text="Describe en el recuadro de abajo las acciones que se tomarán para corregir la no conformidad"
            icon={PenBox}
            onSubmit={handleSubmit}
            processing={processing}
        >
            <TiptapEditor value={data.definition} onChange={handleChange} />
            <FieldErrorMessage message={errors.definition || ""} />
        </CreateLayout>
    )
}