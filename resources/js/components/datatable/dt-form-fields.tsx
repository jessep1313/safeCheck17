import { AlertCircle, Edit2, Trash } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import DtRowAction from "./dt-row-action"
import { InspectFormField } from "@/types/form-record"
import ImgIcon from "@/assets/images/img.png"
import { usePage } from "@inertiajs/react"
import { PageProps } from "@inertiajs/core"
import { Badge } from "../ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface PageFieldProps extends PageProps {
    fields: InspectFormField[]
}


export default () => {
    const { fields } = usePage<PageFieldProps>().props

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead className="text-end">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.map((field, key) => (
                        <TableRow key={key}>
                            <TableCell>{key + 1}</TableCell>
                            <TableCell>
                                    {field.img_src
                                        ? (
                                            <picture>
                                                <img src={field.img_src} className="w-10 h-10 border inline-block rounded-full bg-accent" />
                                            </picture>
                                        )
                                        : (
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <picture className="relative w-fit inline-block">
                                                        <img src={ImgIcon} className="h-10" alt="Imagen alternativa de la fila" />
                                                        <span className="absolute flex items-center justify-center p-0.5 bg-red-500 -right-2 -top-1 rounded-full">
                                                            <AlertCircle size={14} />
                                                        </span>
                                                    </picture>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <span>Se recomienda agregar una imagen</span>
                                                </TooltipContent>
                                            </Tooltip>
                                        )}
                            </TableCell>
                            <TableCell>{field.label}</TableCell>
                            <TableCell>{field.description || "Sin descripción"}</TableCell>
                            <TableCell align="right">
                                <DtRowAction tooltip={`Editar ${field.label}`}>
                                    <Edit2 />
                                </DtRowAction>
                                <DtRowAction tooltip={`Eliminar ${field.label}`}>
                                    <Trash />
                                </DtRowAction>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}