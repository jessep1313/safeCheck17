import { useForm, usePage } from '@inertiajs/react';
import React, { ChangeEvent } from 'react';

interface FormEvidencesBody {
    files: File[];
}

export default () => {
    const { uuid } = usePage().props;
    const [previews, setPreviews] = React.useState<string[]>([]);
    const { post, processing, setData, data, errors } = useForm<FormEvidencesBody>({
        files: [],
    });

    console.log(errors)

    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        const file = input.files && input.files[0] ? input.files[0] : null;
        if (!file) {
            input.files = null;
            return;
        }
        const imageUrl = URL.createObjectURL(file);
        if (imageUrl) {
            setPreviews((prev) => [...prev, imageUrl]);
            setData('files', [...data.files, file]);
        }
    };

    const handleRemoveImage = (key: number) => {
        const newPreviews = previews.filter((__, index) => key != index);
        const newFiles = data.files.filter((__, index) => key != index);
        setPreviews(newPreviews);
        setData('files', newFiles);
    };

    const handleSubmit = () => {
        post(route('tours.save.evidences', { uuid }), { forceFormData: true });
    };

    return {
        previews,
        onChangeImage,
        handleRemoveImage,
        handleSubmit,
        processing,
    };
};
