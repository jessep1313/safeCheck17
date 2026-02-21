import { Incidence } from "@/types/incidences";
import { useForm, usePage } from "@inertiajs/react"
import React from "react";
import { PageProps } from "@inertiajs/core";
import { CatalogItem } from "@/types";

interface Props extends PageProps {
    users: CatalogItem[]
}

export default () => {

    const { data, processing, setData, post, errors, reset } = useForm({
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
    }
}