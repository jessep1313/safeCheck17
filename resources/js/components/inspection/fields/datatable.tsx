import ImgIcon from '@/assets/images/img.png';
import DtRowDelete from '@/components/datatable/dt-row-delete';
import { InspectFormField } from '@/types/form-record';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { AlertCircle, Edit2 } from 'lucide-react';
import DtRowAction from '../../datatable/dt-row-action';
import DtRowEmpty from '../../datatable/dt-row-empty';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';

interface PageFieldProps extends PageProps {
    fields: InspectFormField[];
}

interface DatatableProps {
    onOpenCreate: () => void;
    onOpenEdit: (row: InspectFormField) => void;
}

export default ({ onOpenCreate, onOpenEdit }: DatatableProps) => {
    const { fields } = usePage<PageFieldProps>().props;

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>No.</TableHead>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Parte/Camión</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead className="text-end">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.length > 0 ? (
                        fields.map((field, key) => (
                            <TableRow key={field.id}>
                                <TableCell>{key + 1}</TableCell>
                                <TableCell>
                                    {field.img_src ? (
                                        <picture>
                                            <img src={field.img_src} className="inline-block h-10 w-10 rounded-full border bg-accent object-cover" />
                                        </picture>
                                    ) : (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <picture className="relative inline-block w-fit">
                                                    <img src={ImgIcon} className="h-10" alt="Imagen alternativa de la fila" />
                                                    <span className="absolute -top-1 -right-2 flex items-center justify-center rounded-full bg-red-500 p-0.5">
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
                                <TableCell>{field.location}</TableCell>
                                <TableCell>{field.label}</TableCell>
                                <TableCell>{field.description || 'Sin descripción'}</TableCell>
                                <TableCell align="right">
                                    <DtRowAction onClick={() => onOpenEdit(field)} tooltip={`Editar ${field.label}`}>
                                        <Edit2 />
                                    </DtRowAction>
                                    <DtRowDelete
                                        route="form.fields.delete"
                                        id={`${field.id}`}
                                        submitLabel="Si, eliminar"
                                        cancelLabel="No, cancelar"
                                        dialogTitle={`¿Eliminar ${field.label}?`}
                                        dialogDescription="Si eliminas este punto de inspección, ¿Estás seguro que deseas continuar?."
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <DtRowEmpty
                            colSpan={5}
                            message="No hay puntos de inspección disponibles"
                            createLabel="Agregar punto de inspección"
                            onCreate={onOpenCreate}
                        />
                    )}
                </TableBody>
            </Table>
        </>
    );
};
