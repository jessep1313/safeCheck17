import { useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core"
import { Audit, AuditInspectionQuestion } from "@/types/audit";

interface Props extends PageProps {
    question: AuditInspectionQuestion,
    audit: Audit
    inspectionUuid: string
}

export default () => {

    const { audit, question, inspectionUuid } = usePage<Props>().props;
    const { post, processing } = useForm()

    const handleApprobe = () => {
        post(route('audit.inspection.question.save', {id: question.id, value: 1}))
    }

    const handleReject = () => {
        post(route('audit.inspection.question.save', {id: question.id, value: 0}))
    }

    return {
        audit,
        question,
        processing,
        handleApprobe,
        handleReject,
        inspectionUuid,
    };
}