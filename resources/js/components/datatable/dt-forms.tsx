import { ArrowDownUp, CalendarArrowDown, Hash, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Link } from '@inertiajs/react';
import TableHeadLink from './head-link';
import DtHeader from './dt-header';

const DtForms = () => {
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
                        <TableHeadLink href={''}>
                            <Button size={'sm'} variant={'ghost'}>
                                <CalendarArrowDown />
                                Fecha Alta
                            </Button>
                        </TableHeadLink>
                        <TableHead className='text-right' align='right'>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={5} className='text-center'>
                            <div className='border-dashed border-2 p-5'>
                                <h3 className='mb-4'>
                                    Aún no tienes formularios
                                </h3>
                                <Button size={'sm'} variant={'secondary'} asChild>
                                    <Link href={route('form.create')}>Nuevo formulario</Link>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
};

export default DtForms;
