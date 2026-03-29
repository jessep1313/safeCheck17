import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { BreadcrumbItem } from '@/types';
import { Button } from "@/components/ui/button";
import { getActions } from "@/components/incidences/actions";
import { getColumns } from "@/components/incidences/columns";
import { Spinner } from "@/components/ui/spinner";
import { useId } from "react";
import AppHeader from "@/layouts/app-header";
import AppLayout from '@/layouts/app-layout';
import Datatable from "@/components/datatable/datatable";
import FieldSelect from "@/components/form/field-select";
import Modal from "@/components/modal";
import useIncidenceControl from "@/hooks/incidenceControl/use-incidence-control";
import HeaderActions from "@/components/incidences/header-actions";

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Control de incidencias', href: '/control-de-incidencias' },
    { title: 'Inspecciones', href: '/control-de-incidencias/inspecciones' },
];

export default () => {
    const { handleOpenNewPlanAction, processing, data, users, errors, handleChangeUser, handleCloseNewPlanAction, openPlanAction, handleSubmit, handleStartPlan, handleStopPlan, handleCancelPlan } = useIncidenceControl();

    const formId = useId();
    const columns = getColumns();

    const actions = getActions({
        createPlanAction: handleOpenNewPlanAction,
        startPlanAction: handleStartPlan,
        stopPlanAction: handleStopPlan,
        cancelPlanAction: handleCancelPlan,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title={'Incidencias de inspecciones'} text="Control de incidencias" />

            <article className="container">
                <Datatable columns={columns} actions={actions} headerActions={<HeaderActions />} routeName="incidences-control.home" />
            </article>

            <Modal
                title="Crear plan de acción"
                description="Selecciona a la persona responsable de ejecutar el plan de acción"
                open={openPlanAction}
                onHide={handleCloseNewPlanAction}
                actions={
                    <Button
                        type="submit"
                        form={formId}
                        disabled={processing}
                    >
                        Guardar plan
                        {processing && <Spinner />}
                    </Button>
                }
            >
                {errors.uuid && (
                    <div className="mb-3">
                        <Alert variant={'destructive'}>
                            <AlertTriangle />
                            <AlertDescription>{errors.uuid}</AlertDescription>
                        </Alert>
                    </div>
                )}
                <form id={formId} onSubmit={handleSubmit}>
                    <FieldSelect
                        id="user_plan_id"
                        name="user_id"
                        label="Responsable del plan de acción"
                        required
                        onValueChange={handleChangeUser}
                        placeholder="Selecciona un responsable"
                        value={data.user_id}
                        options={users.map((user: any) => ({ value: user.id, label: user.name }))}
                        error={errors.user_id}
                    />
                </form>
            </Modal>
        </AppLayout>
    );
};