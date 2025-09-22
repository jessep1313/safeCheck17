import { ArrowDownUp, CalendarArrowDown, Edit2, Hash, Plus, Search, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Link } from '@inertiajs/react';
import TableHeadLink from './head-link';
import DtHeader from './dt-header';
import { InspectForm } from '@/types/form-record';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import DtRowAction from './dt-row-action';
import DtRowDelete from './dt-row-delete';

interface DtFormsProps {
    data: InspectForm[]
    onOpenCreate: () => void
}

const DtForms = ({ onOpenCreate, data }: DtFormsProps) => {
    return (
        <>
            <DtHeader searchPlaceholder='Buscar formulario . . .' />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeadLink href={''}>
                            <Hash />
                            Folio
                        </TableHeadLink>
                        <TableHeadLink href={''}><ArrowDownUp /> Tipo de vehículo</TableHeadLink>
                        <TableHeadLink href={''}><ArrowDownUp /> Certificación</TableHeadLink>
                        <TableHeadLink className='text-right' href={''}><ArrowDownUp /> Pts. Inspección</TableHeadLink>
                        <TableHeadLink className='text-right' href={''}>
                            <CalendarArrowDown />
                            Fecha Alta
                        </TableHeadLink>
                        <TableHead className='text-right' align='right'>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? data.map(form => (
                        <TableRow>
                            <TableCell>{form.folio}</TableCell>
                            <TableCell>{form.vehicleType}</TableCell>
                            <TableCell>{form.certificate}</TableCell>
                            <TableCell align='right'>{form.fields} {form.fields != 1 ? "puntos" : "punto"}</TableCell>
                            <TableCell align='right'>{form.created_at}</TableCell>
                            <TableCell align='right'>
                                <Tooltip>
                                        <DtRowAction tooltip='Editar formulario de inspección' asChild>
                                            <Link href={route("form.fields", form.folio)}>
                                                <Edit2 />
                                            </Link>
                                        </DtRowAction>
                                </Tooltip>
                                <DtRowDelete
                                    id={form.id.toString()}
                                    route={'form.delete'}
                                    tooltip="Eliminar formulario"
                                    successMessage="Formulario eliminado correctamente"
                                />
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={5} className='text-center'>
                                <div className='border-dashed border-2 p-5'>
                                    <h3 className='mb-4'>
                                        Aún no tienes formularios
                                    </h3>
                                    <Button size={'sm'} type='button' variant={'secondary'} onClick={onOpenCreate}>
                                        Agregar <Plus />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default DtForms;
