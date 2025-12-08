import Datatable from '@/components/datatable/datatable';
import { actions } from '@/components/tours/actions';
import { columns } from '@/components/tours/column';
import DialogDetail from '@/components/tours/dialog-detail';
import { Button } from '@/components/ui/button';
import useTours from '@/hooks/tours/use-tours';
import AppHeader from '@/layouts/app-header';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Bitacora de recorridos', href: '/bitacora-de-recorridos' },
    ];
    const { tour, handleCloseDetail, handleOpenDetail, openDetail } = useTours();
    const rowActions = actions(handleOpenDetail);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Bitacora de recorridos">
                <Button asChild>
                    <Link href={route('tours.initialize')}>
                        Hacer recorrido <Plus />
                    </Link>
                </Button>
            </AppHeader>
            <div className="px-4">
                <Datatable columns={columns()} actions={rowActions} routeName="tours.home" />
            </div>

            <DialogDetail open={openDetail} onClose={handleCloseDetail} data={tour} />
        </AppLayout>
    );
};
