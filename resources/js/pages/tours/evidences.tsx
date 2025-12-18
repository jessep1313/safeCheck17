import { Button } from "@/components/ui/button"
import useEvidence from "@/hooks/tours/use-evidence"
import ProblemLayout from "@/layouts/problem-layout"
import { Plus, Trash } from "lucide-react"

export default () => {
    const {handleRemoveImage, handleSubmit, onChangeImage, previews, processing} = useEvidence()
    return (
        <ProblemLayout
            actionLabel="Guardar evidencia"
            title="Toma de evidencia"
            description="Carga o captura fotografías del problema como evidencia de la incidencia"
            onAction={handleSubmit}
            processing={processing}
        >
            <section>
                <Button type="button" variant={'secondary'} asChild>
                    <label>
                        Agregar evidencia <Plus />
                        <input type="file" onChange={onChangeImage} className="hidden" />
                    </label>
                </Button>
            </section>
            <section className="max-h-60 min-h-28 overflow-y-auto rounded-xl border">
                {previews.length > 0 ? (
                    <ul className="grid grid-cols-4">
                        {previews.map((img, key) => (
                            <li key={key}>
                                <div className="relative aspect-square w-full">
                                    <Button size={'icon'} className="absolute top-1 left-1" onClick={() => handleRemoveImage(key)}>
                                        <Trash />
                                    </Button>
                                    <img src={img} className="h-full w-full object-cover" alt="" />
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex h-28 w-full flex-col items-center justify-center text-center text-muted-foreground">
                        <h3 className="font-bold">Agrega imagenes</h3>
                        <p className="text-sm">
                            Presiona en <strong>agregar evidencia</strong> para añadir imagenes aquí
                        </p>
                    </div>
                )}
            </section>
        </ProblemLayout>
    )
}