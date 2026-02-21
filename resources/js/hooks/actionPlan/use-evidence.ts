import { useForm, usePage } from "@inertiajs/react"
import { PageProps, router } from "@inertiajs/core"

interface Props extends PageProps {
    uuid: string
    evidences: Array<{ id: number, path: string }>
}

export default () => {

    const { uuid, evidences } = usePage<Props>().props;

    const { data, setData, post, delete: destroy, errors, processing } = useForm({
        evidence: ""
    });

    const handleSubmit = () => {
        post(route("incidences-control.action-plan.store.evidence", { uuid }));
    }

    const destroyEvidence = (id: number) => {
        destroy(route("incidences-control.destroy.evidence", { id }))
    }

    return {
        uuid,
        data,
        setData,
        handleSubmit,
        destroyEvidence,
        errors,
        processing,
        evidences,
    }
}