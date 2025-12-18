import FieldErrorMessage from "@/components/form/field-error-message";
import TiptapEditor from '@/components/form/tip-tap';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useComment from '@/hooks/tours/use-comment';
import ProblemLayout from '@/layouts/problem-layout';
import { NotebookPen } from 'lucide-react';

export default function Comment() {
    const { data, errors, onChangeValue, onSubmit, processing } = useComment();

    return (
        <ProblemLayout
            onAction={onSubmit}
            actionLabel="Guardar y continuar"
            processing={processing}
            title="Anotaciones del problema"
            description="Describe el problema encontrado en durante el recorrido o rondin."
        >
            <>
                <TiptapEditor value={data.comment ?? ''} onChange={onChangeValue} />
                {errors.comment && <FieldErrorMessage message={errors.comment} />}
                <Alert>
                    <NotebookPen />
                    <AlertTitle>Nota</AlertTitle>
                    <AlertDescription>
                        <p>
                            Al terminar de tomar tus anotaciones acerca del problema presiona <strong>Guardar y continuar</strong> para tomar
                            evidencias del problema encontrado.
                        </p>
                    </AlertDescription>
                </Alert>
            </>
        </ProblemLayout>
    );
}