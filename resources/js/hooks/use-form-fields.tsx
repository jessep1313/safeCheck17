import { InspectFieldCreateBody, InspectFieldEditBody, InspectFormField } from "@/types/form-record"
import { useForm, usePage } from "@inertiajs/react"
import { toast } from "sonner"
import useModal from "./use-modal"
import React from "react"

export default () => {

    // region Hooks y estados

    const { folio } = usePage().props

    const [id, setId] = React.useState<string>()

    const { 
        open: openCreate, 
        handleCloseModal: closeCreateModal, 
        handleOpenModal: openCreateModal
    } = useModal()

    const {
        open: openEdit,
        handleCloseModal: closeEditModal,
        handleOpenModal: openEditModal
    } = useModal()

    const { post, data, setData, errors, setError, clearErrors, reset, processing } = useForm<InspectFieldCreateBody>({
        description: '',
        img_src: '',
        label: ''
    })

    const { data: field, errors: errorsFields, setData: setField, setError: setErrorField, put, processing: processingEdit } = useForm<InspectFieldEditBody>({
        description: '',
        label: '',
        img_src: '',
    });
    
    // region Ventana modal

    const handleOpenEdit = (row: InspectFormField) => {
        setId(`${row.id}`)
        setField({
            label: row.label,
            description: row.description,
            img_src: row.img_src?.replace('/storage/', '')
        });
        openEditModal()
    }

    const handleCloseEdit = () => {
        setId(undefined)
        setField({
            description: '',
            label: '',
            img_src : ''
        })
        closeEditModal()
    }

    const handleOpenCreate = () => {
        openCreateModal()
    } 

    const handleCloseCreate = () => {
        closeCreateModal()
        clearErrors()
        reset()
    }

    // region Evento Submit

    const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!data.img_src || data.img_src?.length === 0) {
            setError('img_src', 'Debes agregar una imagen')
            return
        }
        post(route('form.fields.store', {folio}), {
            onSuccess: () => {
                toast.success("Se ha creado un nuevo punto de inspección")
                handleCloseCreate()
            },
            onError: () => toast.error("No se pudo crear el punto de inspección"),
            onProgress: () => toast.loading("Cargando, espere un momento..."),
        })
    }

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!field.img_src || field.img_src?.length === 0) {
            setErrorField('img_src', 'Debes agregar una imagen')
            return
        }
        put(route('form.fields.update', {id}), {
            onSuccess: () => toast.success("Se ha actualizado el punto de inspección"),
            onError: () => toast.error("No se pudo actualizar el punto de inspección"),
            onProgress: () => toast.loading("Cargando, espere un momento..."),
            onFinish: () => {
                handleCloseEdit()
            }
        });
    }


    // region Evento de input

    const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>, edit?: boolean) => {
        const name = e.target.name as keyof InspectFieldCreateBody
        if(edit) {
            setField(name, e.target.value)
        }else{
            setData(name, e.target.value)
        }
    }

    return {
        data,
        errors,
        field,
        handleChangeField,
        handleCloseCreate,
        handleCloseEdit,
        handleCreateSubmit,
        handleEditSubmit,
        handleOpenCreate,
        handleOpenEdit,
        openCreate,
        openEdit,
        setData,
        setField,
        processingEdit,
        errorsFields,
        processing
    }
}