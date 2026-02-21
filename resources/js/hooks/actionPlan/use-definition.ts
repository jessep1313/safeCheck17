import { useForm, usePage } from "@inertiajs/react"
import { PageProps } from "@inertiajs/core"
import { ActionPlan } from "@/types/incidences"

interface Props extends PageProps {
    uuid: string
    plan: ActionPlan
}

export default () => {

    const { uuid, plan } = usePage<Props>().props;

    const { data, setData, post, errors, processing } = useForm({
        definition: plan.plan || ""
    });

    const handleSubmit = () => {
        post(route('incidences-control.action-plan.store.definition', { uuid }))
    }

    const handleChange = (val?: string) => {
        setData("definition", val || "");
    }

    return {
        data,
        processing,
        handleSubmit,
        errors,
        handleChange
    }
}