import Field from "@/components/form/field";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import useVehicles from "@/hooks/accessControl/use-vehicles";
import LayoutCreate from "@/layouts/accessControl/layout-create";
import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types"
import { AccessItem } from "@/types/access-control";
import { Link, usePage } from "@inertiajs/react";
import { ArrowRight, Car, Plus, Trash2, Truck } from "lucide-react";

export default () => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Control de acceso', href: route('access-control.home') },
        { title: 'Nuevo acceso', href: route('access-control.create') },
        { title: 'Vehiculos', href: '' },
    ];
    const { uuid } = usePage().props
    const { vehicles, data, processing, errors, handleDelete, onSubmit, onChange } = useVehicles();
    const items: AccessItem[] = vehicles.map((vehicle) => ({
        id: vehicle.id,
        title: vehicle.plate,
        description: `${vehicle.model} - ${vehicle.color}`
    }))

    return (
        <LayoutCreate
            title="Vehículos"
            items={items}
            itemName="vehículo"
            nextLink={route('access-control.create.devices', { uuid })}
            onSubmit={onSubmit}
            onDelete={handleDelete}
            processing={processing}
            breadcrumbs={breadcrumbs}
        >
            <Field value={data.plate} error={errors.plate} onChange={onChange} id="plate" name="plate" label="Placas del vehículo" placeholder="ABC-123" required />
            <Field value={data.model} error={errors.model} onChange={onChange} id="model" name="model" label="Modelo del vehículo" placeholder="Corolla" required />
            <Field value={data.color} error={errors.color} onChange={onChange} id="color" name="color" label="Color del vehículo" placeholder="Blanco" required />
        </LayoutCreate>
    );
}