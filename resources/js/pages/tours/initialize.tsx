import FieldSelect from '@/components/form/field-select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import useInit from '@/hooks/tours/use-init';
import AppHeader from '@/layouts/app-header';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SelectOption } from '@/types';
import { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface Props extends PageProps {
    users: SelectOption[];
}

export default () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Bitacora de recorridos', href: '/bitacora-de-recorridos' },
        { title: 'Prepara recorrido', href: '/bitacora-de-recorridos/prepara-recorrido' },
    ];

    const { users } = usePage<Props>().props;
    const { data, errors, onChangeResponsed, onSubmit, processing } = useInit();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Preparate para el recorrido" />
            <form className="container max-w-2xl" onSubmit={onSubmit}>
                <fieldset className="mb-4">
                    <FieldSelect
                        placeholder="Selecciona un responsable"
                        options={users}
                        name="responsed_id"
                        label="Responsable de recorrido"
                        id="responsed_id"
                        value={data.responsed_id}
                        onValueChange={onChangeResponsed}
                        error={errors.responsed_id}
                        required
                    />
                </fieldset>
                <Alert>
                    <AlertCircle />
                    <AlertTitle>Importante antes de empezar</AlertTitle>
                    <AlertDescription>
                        <p>
                            Una vez inicies el recorrido no podrás detenerlo ni pausarlo. Recuerda que <strong>se tomará el tiempo real</strong> para
                            el recorrido.
                        </p>
                        <p>
                            Si estas seguro de iniciar el recorrido, presiona el botón <strong>"Iniciar recorrido"</strong>
                        </p>
                    </AlertDescription>
                </Alert>
                <footer className="mt-4">
                    <Button disabled={processing}>
                        Iniciar recorrido
                        {processing ? <Spinner /> : <ArrowRight />}
                    </Button>
                </footer>
            </form>
        </AppLayout>
    );
};
