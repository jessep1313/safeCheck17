import { FormProblemCommentBody } from '@/types/digital-inspection/forms';
import { QuestionPoint } from '@/types/digital-inspection/question';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default () => {
    const limitCharacters = 355;
    const [characters, setCharacters] = useState(0);
    const { question, uuid } = usePage().props;

    const { data, setData, post } = useForm<FormProblemCommentBody>({
        comment: '',
    });

    const getPlainTextLenght = (html: string): number => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent?.length || 0;
    };
    const handleChange = (value: string) => {
        setData('comment', value);
        setCharacters(getPlainTextLenght(value));
    };

    const handleSavedComment = () => {
        if (characters <= 10) {
            toast.warning('No hay suficiente información sobre el detalle del problema. Agrega más información');
            return;
        }
        post(route('inspections.save-comment', { uuid }));
    };

    return {
        value: data.comment,
        handleChange,
        characters,
        limitCharacters,
        handleSavedComment,
        point: question as QuestionPoint,
    };
};
