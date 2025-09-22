import React from "react"

export default () => {

    const [open, setOpen] = React.useState(false)

    const handleOpenModal = () => {
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    return {
        handleCloseModal,
        handleOpenModal,
        open
    }
}