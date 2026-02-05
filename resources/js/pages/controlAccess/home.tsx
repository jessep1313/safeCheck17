import actions from '@/components/accessControl/actions';
import columns from '@/components/accessControl/columns';
import HeaderActions from '@/components/accessControl/header-actions';
import Datatable from '@/components/datatable/datatable';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import AppHeader from '@/layouts/app-header';
import AppLayout from '@/layouts/app-layout';
import FilterProvider from '@/providers/access-control/filter-provider';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Download, FileDown, FileX, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Control de accesos', href: route('access-control.home') },
];

export default () => {
    return (
        <FilterProvider>
            <AppLayout breadcrumbs={breadcrumbs}>
                <AppHeader title="Control de accesos">
                    <Button asChild>
                        <Link href={route('access-control.create')}>
                            Nuevo acceso <Plus />
                        </Link>
                    </Button>
                </AppHeader>

                <div className="px-4">
                    <Datatable
                        headerActions={<HeaderActions />}
                        columns={columns()}
                        actions={actions()}
                        routeName="access-control.home"
                        createLink={route('access-control.create')}
                        createLabel="Nuevo acceso"
                    />
                </div>
            </AppLayout>
        </FilterProvider>
    );
};
