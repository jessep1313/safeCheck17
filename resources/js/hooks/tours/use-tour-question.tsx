import { useForm, usePage } from "@inertiajs/react"
import { PageProps } from "@inertiajs/core"
import { TourQuestion } from "@/types/tours"

interface Props extends PageProps {
    uuid: string
    data: TourQuestion
    points: TourQuestion[]
}

export default () => {
    const { data, uuid, points } = usePage<Props>().props
    const { post, processing } = useForm()

    const handleApprove = () => {
        post(route('tours.question.save', { id: data.id, answer: 1 }))
    }

    const handleReject = () => {
        post(route('tours.question.save', { id: data.id, answer: 0 }))
    }

    return {
        data,
        uuid,
        points,
        processing,
        handleApprove,
        handleReject
    }
}