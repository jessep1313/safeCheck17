import { Delete, Edit, Inspect, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';

const DtForms = () => {
    return (
        <>
            <header className='flex justify-between mb-3'>
                <search className='flex space-x-1'>
                    <Input type='search' placeholder='Buscar formulario . . .' />
                    <Button variant={'ghost'} type='submit'>
                        <Search />
                    </Button>
                </search>
            </header>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Formulario</TableHead>
                        <TableHead>Camión</TableHead>
                        <TableHead className='text-right' align='right'>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Ejemplo</TableCell>
                        <TableCell>Truck 2399</TableCell>
                        <TableCell align='right' className='space-x-2'>
                            <Button size={'icon'} variant={'ghost'}>
                                <Inspect />
                            </Button>
                            <Button size={'icon'} variant={'ghost'}>
                                <Edit />
                            </Button>
                            <Button size={'icon'} variant={'destructive'}>
                                <Delete />
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
};

export default DtForms;
