import { ArrowDownUp, CalendarArrowDown, Edit2} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Link, usePage } from '@inertiajs/react';
import TableHeadLink from './head-link';
import DtHeader from './dt-header';
import { Tooltip } from '../ui/tooltip';
import DtRowAction from './dt-row-action';
import DtRowDelete from './dt-row-delete';
import DtRowEmpty from './dt-row-empty';
import { FormPageProps } from '@/types/form-record';
import DtPagination from './dt-pagination';
import HeadSort from './head-sort';

interface DtFormsProps {
    onOpenCreate: () => void
}

const DtForms = ({ onOpenCreate }: DtFormsProps) => {
    
    const { paginator, filter } = usePage<FormPageProps>().props

    return (
        <>
            <DtHeader searchPlaceholder='Buscar formulario . . .' />
            <Table>
                <TableHeader>
                    <TableRow>
                        <HeadSort columnKey='folio'>
                            Folio
                        </HeadSort>
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
                    {paginator?.data?.length > 0 ? paginator?.data?.map(form => (
                        <TableRow>
                            <TableCell><span className='uppercase'>{form.folio}</span></TableCell>
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
                        <DtRowEmpty
                            colSpan={6}
                            createLabel="Agregar formulario"
                            onCreate={onOpenCreate}
                            message="No hay formularios de inspección registrados"
                        />
                    )}
                </TableBody>
            </Table>

            <DtPagination paginator={paginator} currentPerPage={filter.per_page?.toString()} currentRoute='form.home' />
        </>
    );
};

export default DtForms;
