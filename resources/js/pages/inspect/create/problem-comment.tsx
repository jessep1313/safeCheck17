import TiptapEditor from '@/components/form/tip-tap';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import useProblemComment from '@/hooks/inspectionDigital/use-problem-comment';
import ProblemLayout from '@/layouts/inspectForm/problem-layout';
import { NotebookPen } from 'lucide-react';

export default () => {
    const { handleChange, value, point, characters, limitCharacters, handleSavedComment } = useProblemComment();

    return (
        <ProblemLayout
            title="Anotaciones del problema"
            description={`Describe a detalle problema encontrado en el punto de inspección (${point.label})`}
            actionLabel="Guardar y continuar"
            onAction={handleSavedComment}
        >
            <section>
                <div className="mb-2">
                    <div className="flex justify-between">
                        <Label>Anotaciones:</Label>
                        <span className={`text-sm ${(characters > 1 && characters < 11) || characters > 355 ? 'text-amber-500' : ''}`}>
                            {characters}/{limitCharacters}
                        </span>
                    </div>
                </div>
                <TiptapEditor value={value} onChange={handleChange} />
            </section>
            <Alert>
                <NotebookPen />
                <AlertTitle>Nota</AlertTitle>
                <AlertDescription>
                    <p>
                        Al terminar de tomar tus anotaciones acerca del problema presiona <strong>Guardar y continuar</strong> para tomar evidencias
                        del problema encontrado.
                    </p>
                </AlertDescription>
            </Alert>
        </ProblemLayout>
    );
};
