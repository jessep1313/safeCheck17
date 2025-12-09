import Datatable from '@/components/datatable/datatable';
import DialogNewAudit from '@/components/inspection/dialog-new-audit';
import getActions from '@/components/inspection/get-actions';
import getColumns from '@/components/inspection/get-columns';
import { Button } from '@/components/ui/button';
import AppHeader from '@/layouts/app-header';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Inspecciones realizadas', href: '/inspecciones' },
    ];

    const columns = getColumns();
    const actions = getActions();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Inspecciones realizadas">
                <DialogNewAudit />
                <Button asChild>
                    <Link href={route('digital-inspection')}>
                        Nueva inspección <Plus />
                    </Link>
                </Button>
            </AppHeader>

            <section className="px-4">
                <Datatable columns={columns} actions={actions} routeName="inspections.home" emptyMessage="Aun no haz realizado inspecciones" />
            </section>
        </AppLayout>
    );
};
