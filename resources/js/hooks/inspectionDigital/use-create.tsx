import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default () => {

    const { post, processing } = useForm();

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        post(route('inspections.store'), {
            onSuccess: () => {
                toast.success('Inspección creada correctamente');
            },
            onError: () => {
                toast.error('Error al crear la inspección');
            },
            onProgress: () => {
                toast.loading('Creando inspección...');
            },
        });
    };

    return {
        handleSubmit,
        processing,
    };
};
