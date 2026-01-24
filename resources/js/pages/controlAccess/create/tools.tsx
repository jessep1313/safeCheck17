import Field from "@/components/form/field";
import useTools from "@/hooks/accessControl/use-tools";
import LayoutCreate from "@/layouts/accessControl/layout-create";
import { BreadcrumbItem } from "@/types";
import { AccessItem } from "@/types/access-control";
import { usePage } from "@inertiajs/react";

export default () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Control de acceso', href: route('access-control.home') },
        { title: 'Nuevo acceso', href: route('access-control.create') },
        { title: 'Herramientas', href: '' },
    ];

    const { uuid } = usePage().props;
    const { tools, data, processing, errors, handleDelete, onSubmit, onChange } = useTools();
    const items: AccessItem[] = tools.map((tool) => ({
        id: tool.id,
        title: `X${tool.quantity} ${tool.type}`,
        description: `${tool.brand} - ${tool.model}`
    }));
    return (
        <LayoutCreate
            title="Herramientas"
            items={items}
            itemName="herramienta"
            prevLink={route('access-control.create.devices', { uuid })}
            nextLink={route('access-control.show', { uuid })}
            onSubmit={onSubmit}
            onDelete={handleDelete}
            processing={processing}
            breadcrumbs={breadcrumbs}
        >
            <Field value={data.type} error={errors.type} onChange={onChange} id="type" name="type" label="Tipo de herramienta" placeholder="Taladro" required />
            <Field value={data.brand} error={errors.brand} onChange={onChange} id="brand" name="brand" label="Marca de la herramienta" placeholder="Holmatro" required />
            <Field value={data.model} error={errors.model} onChange={onChange} id="model" name="model" label="Modelo de la herramienta" placeholder="DHP484" required />
            <Field type="number" value={data.quantity} error={errors.quantity} onChange={onChange} id="quantity" name="quantity" label="Cantidad" placeholder="1" required />
        </LayoutCreate>
    );
}