import React from "react"

export default () => {

    const [open, setOpen] = React.useState(false)

    const handleOpenModal = () => {
        setOpen(true)
        console.log('Click')
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