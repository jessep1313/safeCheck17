import Field from "@/components/form/field"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useForm } from "@inertiajs/react"
import { Plus } from "lucide-react"
import { toast } from "sonner"

export default () => {

    const { post, processing, errors, data, setData } = useForm({
        question: "",
    })

    const handleSubmit = () => {
        post(route("settings.tour.store"), {
            onSuccess: () => {
                toast.success("Pregunta agregada exitosamente")
            },
            onError: () => {
                toast.error("Error al agregar la pregunta")
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Agregar pregunta <Plus /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Agregar pregunta</AlertDialogTitle>
                    <AlertDialogDescription>
                        Agrega una nueva pregunta al recorrido
                    </AlertDialogDescription>
                    <Field
                        id="question"
                        label="Pregunta"
                        type="text"
                        name="question"
                        value={data.question}
                        onChange={(e) => setData('question', e.target.value)}
                        error={errors.question}
                        required
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit} disabled={processing}>
                        {processing && <Spinner />}
                        {processing ? "Guardando..." : "Agregar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}