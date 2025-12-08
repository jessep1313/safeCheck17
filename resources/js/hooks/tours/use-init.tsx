import { NewTour } from "@/types/tours"
import { useForm } from "@inertiajs/react"
import { ChangeEvent, FormEvent } from "react"

export default function useInit () {

    const {data, setData, post, processing,errors} = useForm<NewTour>({
        responsed_id: undefined
    })

    const onChangeResponsed = (value?: string) => {
        if(value) {
            setData('responsed_id', value);
        }
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post(route('tours.store'))
    }

    return {
        data, processing, errors, onChangeResponsed, onSubmit
    }
}