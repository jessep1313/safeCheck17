import HeaderActions from "@/components/action-plan/header-actions";
import ShowEvidences from "@/components/action-plan/show-evidences";
import ShowPlanContent from "@/components/action-plan/show-plan-content";
import ShowStats from "@/components/action-plan/show-stats";
import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types";
import { ActionPlanShow } from "@/types/incidences";

interface Props {
    plan: ActionPlanShow;
}

export default ({ plan }: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/' },
        { title: 'Control de incidencias', href: '/control-de-incidencias' },
        { title: 'Plan de acción', href: '/control-de-incidencias/plan-action' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Plan de acción" text={plan.uuid}>
                <HeaderActions data={plan} />
            </AppHeader>
            <div className="px-4 pb-4">
                <section className="mb-4">
                    <ShowStats data={plan} />
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    <ShowPlanContent plan={plan.plan!} />
                    <ShowEvidences data={plan.evidences} />
                </section>
            </div>
        </AppLayout>
    )
}