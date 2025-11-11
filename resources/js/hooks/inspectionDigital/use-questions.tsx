import { useForm, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

export default () => {
    const { uuid } = usePage().props;
    const { post, processing, errors } = useForm();

    const handleSubmit = (e: FormEvent<Element>) => {
        e.preventDefault();
        post(route('inspections.save-questions', { uuid }));
    };

    return {
        handleSubmit,
        processing,
    };
};
