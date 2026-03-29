import { Incidence } from "@/types/incidences";
import { useForm, usePage } from "@inertiajs/react"
import React from "react";
import { PageProps } from "@inertiajs/core";
import { CatalogItem } from "@/types";
import { toast } from "sonner";

interface Props extends PageProps {
    users: CatalogItem[]
}

export default () => {

    const { data, processing, setData, post, errors, reset, delete: destroy } = useForm({
        user_id: "",
        uuid: "",
    });

    const { users } = usePage<Props>().props

    const [openPlanAction, setOpenPlanAction] = React.useState(false);

    const handleOpenNewPlanAction = (incidence: Incidence) => {
        setOpenPlanAction(true);
        setData("uuid", incidence.uuid);
    }

    const handleCloseNewPlanAction = () => {
        setOpenPlanAction(false);
        reset();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("incidences-control.action-plan.create-plan-action", { uuid: data.uuid }));
    }

    const handleChangeUser = (val: string) => {
        setData("user_id", val);
    }

    const handleStartPlan = (incidence: Incidence) => {
        if (!incidence.action_plan) {
            return;
        }

        post(route("plan.start", { id: incidence.action_plan?.id }), {
            onSuccess: () => {
                toast.success("Se ha iniciado el plan de acción")
            },
            onError: () => {
                toast.error("No se pudo iniciar el plan de acción", {
                    action: {
                        label: "Reintentar",
                        onClick: () => {
                            handleStartPlan(incidence);
                        }
                    }
                })
            }
        });
    }

    const handleStopPlan = (incidence: Incidence) => {
        if (!incidence.action_plan) {
            return;
        }

        post(route("plan.finish", { id: incidence.action_plan?.id }), {
            onSuccess: () => {
                toast.success("Se ha detenido el plan de acción")
            },
            onError: () => {
                toast.error("No se pudo detener el plan de acción", {
                    action: {
                        label: "Reintentar",
                        onClick: () => {
                            handleStopPlan(incidence);
                        }
                    }
                })
            }
        });
    }

    const handleCancelPlan = (incidence: Incidence) => {
        if (!incidence.action_plan) {
            return;
        }

        destroy(route("plan.cancel", { id: incidence.action_plan?.id }), {
            onSuccess: () => {
                toast.success("Se ha cancelado el plan de acción")
            },
            onError: () => {
                toast.error("No se pudo cancelar el plan de acción", {
                    action: {
                        label: "Reintentar",
                        onClick: () => {
                            handleCancelPlan(incidence);
                        }
                    }
                })
            }
        });
    }

    return {
        data,
        processing,
        errors,
        users,
        handleSubmit,
        handleChangeUser,
        handleOpenNewPlanAction,
        handleCloseNewPlanAction,
        openPlanAction,
        handleStartPlan,
        handleStopPlan,
        handleCancelPlan,
    }
}