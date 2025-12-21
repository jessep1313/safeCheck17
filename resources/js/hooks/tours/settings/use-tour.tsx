import { PageProps } from '@inertiajs/core';
import { TourDefaultQuestion } from "@/types/tours";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Props extends PageProps {
    questions: TourDefaultQuestion[];
}

export default function useTour() {
    const { questions: initialQuestions } = usePage<Props>().props;
    const [questions, setQuestions] = useState(initialQuestions)
    const [isReordering, setIsReordering] = useState(false)
    const { setData, post } = useForm({
        questions: initialQuestions
    })

    const handleReorder = (newOrder: any[]) => {
        console.log(newOrder)
        setData({
            questions: newOrder
        })
        setQuestions(newOrder)
    }

    const handleApplyReorder = () => {
        post(route('settings.tour.reorder'), {
            onSuccess: () => {
                setIsReordering(false)
                toast.success("Preguntas ordenadas exitosamente")
            },
            onError: (error) => {
                console.log(error)
                toast.error("Error al ordenar preguntas")
            }
        })
    }

    useEffect(() => {
        if (questions === initialQuestions) {
            setIsReordering(false)
        } else {
            setIsReordering(true)
        }
    }, [questions])

    return {
        questions,
        handleReorder,
        isReordering,
        handleApplyReorder,

    }
}