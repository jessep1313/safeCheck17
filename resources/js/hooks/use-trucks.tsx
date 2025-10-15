import React from "react"
import useModal from "./use-modal"
import { useForm } from "@inertiajs/react"

export default () => {
    const { open, handleCloseModal, handleOpenModal } = useModal()
    const [isEdit, setIsEdit] = React.useState(false);
    const { data, setData, post, processing } = useForm({
        name: ''
    })

    const onOpenCreate = () => { handleOpenModal() }
    const onCloseForm = () => { handleCloseModal() }

    const handleSubmit = () => { }

    return {
        onOpenCreate,
        onCloseForm,
        handleSubmit,
        isEdit,
        open,
        data,
        setData,
        processing
    }
}