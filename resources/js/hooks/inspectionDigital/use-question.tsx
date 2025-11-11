import { QuestionPoint } from '@/types/digital-inspection/question';
import { type PageProps } from '@inertiajs/core';
import { useForm, usePage } from '@inertiajs/react';

interface PageQuestionProps extends PageProps {
    uuid: string;
    question: QuestionPoint;
    points: number;
    [key: string]: any;
}

export default () => {
    const { uuid, question, points } = usePage<PageQuestionProps>().props;
    const { post, processing } = useForm();

    const handleReject = () => {
        post(route('inspections.save-response', { uuid, pointId: question.id, result: 0 }));
    };

    const handleApprove = () => {
        post(route('inspections.save-response', { uuid, pointId: question.id, result: 1 }));
    };

    return { question, handleApprove, handleReject, processing, points };
};
