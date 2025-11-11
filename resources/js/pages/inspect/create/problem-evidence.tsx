import { Button } from '@/components/ui/button';
import useProblemEvidence from '@/hooks/inspectionDigital/use-problem-evidence';
import ProblemLayout from '@/layouts/inspectForm/problem-layout';
import { Plus, Trash } from 'lucide-react';

export default () => {
    const { previews, onChangeImage, handleRemoveImage, handleSubmit } = useProblemEvidence();

    return (
        <ProblemLayout
            title="Toma evidencia"
            description={`Carga fotografías para evidenciar el problema que se encuentra en el punto de inspección.`}
            actionLabel="Enviar evidencia"
            onAction={handleSubmit}
        >
            <section>
                <Button variant={'secondary'} asChild>
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
    );
};
