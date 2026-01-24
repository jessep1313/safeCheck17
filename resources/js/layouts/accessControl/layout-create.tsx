import Field from "@/components/form/field";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import AppHeader from "@/layouts/app-header";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { AccessItem } from "@/types/access-control";
import { Link } from "@inertiajs/react";
import { ArrowLeft, ArrowRight, Plus, Trash2, Truck } from "lucide-react";

interface Props {
    children: React.ReactNode;
    itemName: string,
    title: string,
    items: AccessItem[]
    breadcrumbs: BreadcrumbItem[],
    onDelete: (id: number) => void,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    processing: boolean,
    prevLink?: string,
    nextLink: string
}

export default ({ children, itemName, title, items, breadcrumbs, onSubmit, processing, prevLink, nextLink, onDelete }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title={title} />
            <div className="flex gap-7 px-4">
                <section className="w-96">
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        {children}
                        <div className="flex flex-col gap-3 mt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? <Spinner /> : <Plus />}
                                Agregar
                            </Button>
                            <div className="flex justify-between gap-2">
                                {prevLink && (
                                    <Button className="flex-1" variant="outline" asChild>
                                        <Link href={prevLink}>
                                            <ArrowLeft />
                                            Anterior
                                        </Link>
                                    </Button>
                                )}
                                <Button className="flex-1" variant="outline" asChild>
                                    <Link href={nextLink}>
                                        Siguiente
                                        <ArrowRight />
                                    </Link>
                                </Button>
                            </div>

                        </div>
                    </form>
                </section>
                <section className="flex-1">
                    {items.length > 0 ? (
                        <ItemGroup className="gap-3">
                            {items.map((item, key) => (
                                <Item key={key} variant={'muted'}>
                                    <ItemContent>
                                        <ItemTitle>{item.title}</ItemTitle>
                                        <ItemDescription>{item.description}</ItemDescription>
                                    </ItemContent>
                                    <ItemActions>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="icon">
                                                    <Trash2 />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>¿Estás seguro de eliminarlo?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Esta acción no se puede deshacer.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => onDelete(item.id)}>Eliminar</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </ItemActions>
                                </Item>
                            ))}
                        </ItemGroup>
                    ) : (
                        <Empty className="border">
                            <EmptyContent>
                                <EmptyMedia>
                                    <Truck />
                                </EmptyMedia>
                                <div>
                                    <EmptyTitle>No hay {itemName}s</EmptyTitle>
                                    <EmptyDescription>Agrega {itemName}s para el control de acceso</EmptyDescription>
                                </div>
                            </EmptyContent>
                        </Empty>
                    )}
                </section>
            </div>
        </AppLayout>
    );
}