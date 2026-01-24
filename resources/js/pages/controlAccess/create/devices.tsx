import Field from "@/components/form/field";
import useDevice from "@/hooks/accessControl/use-device";
import LayoutCreate from "@/layouts/accessControl/layout-create";
import { BreadcrumbItem } from "@/types";
import { AccessItem } from "@/types/access-control";
import { usePage } from "@inertiajs/react";

export default () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Control de acceso', href: route('access-control.home') },
        { title: 'Nuevo acceso', href: route('access-control.create') },
        { title: 'Dispositivos', href: '' },
    ];
    const { uuid } = usePage().props
    const { devices, data, processing, errors, handleDelete, handleSave, handleInputChange } = useDevice();
    const items: AccessItem[] = devices.map((device) => ({
        id: device.id,
        title: `X${device.quantity} ${device.type}`,
        description: `${device.model} - ${device.brand}`,
    }))
    return (
        <LayoutCreate
            title="Dispositivos"
            items={items}
            itemName="dispositivo"
            prevLink={route('access-control.create.vehicles', { uuid })}
            nextLink={route('access-control.create.tools', { uuid })}
            onSubmit={handleSave}
            onDelete={handleDelete}
            processing={processing}
            breadcrumbs={breadcrumbs}
        >
            <Field value={data.type} error={errors.type} onChange={handleInputChange} id="type" name="type" label="Tipo de dispositivo" placeholder="Celular" required />
            <Field value={data.brand} error={errors.brand} onChange={handleInputChange} id="brand" name="brand" label="Marca del dispositivo" placeholder="Samsung" required />
            <Field value={data.model} error={errors.model} onChange={handleInputChange} id="model" name="model" label="Modelo del dispositivo" placeholder="Galaxy S21" required />
            <Field type="number" value={data.quantity} error={errors.quantity} onChange={handleInputChange} id="quantity" name="quantity" label="Cantidad" placeholder="1" required />
        </LayoutCreate>
    );
}