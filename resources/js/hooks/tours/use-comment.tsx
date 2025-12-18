import { useForm, usePage } from "@inertiajs/react"
import { FormEvent } from "react";

export default function useComment () {
    const {uuid} = usePage().props
    const {data, setData, errors, post, processing} = useForm<{comment?: string}>({
        comment: undefined
    })

    const onChangeValue = (value: string) => {
        setData('comment', value);
    }

    const onSubmit = () => {
        post(route('tours.save.comment', { uuid }));
    };

    return {
        onChangeValue,
        onSubmit,
        data,
        errors,
        processing
    }
}