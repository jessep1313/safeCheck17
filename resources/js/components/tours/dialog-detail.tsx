import { TourRow } from "@/types/tours"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "../ui/item"
import { AlertTriangle, User } from "lucide-react"
import { Button } from "../ui/button"

interface Props {
    open: boolean,
    onClose: () => void,
    data: TourRow|null
}

export default function DialogDetail ({
    data,
    onClose,
    open
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <h2>Detalle de recorrido</h2>
                        </DialogTitle>
                        <DialogDescription>
                            <p>{data?.uuid}</p>
                        </DialogDescription>
                    </DialogHeader>
                    <ul className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[75vh]">
                        <li className="col-span-full">
                            <Item variant={'outline'}>
                                <ItemContent>
                                    <ItemTitle>Responsable</ItemTitle>
                                    <ItemDescription>{data?.responsed}</ItemDescription>
                                </ItemContent>
                                <ItemMedia variant={'icon'}>
                                    <User />
                                </ItemMedia>
                            </Item>
                        </li>
                        <li className="col-span-full">
                            <Item variant={'outline'}>
                                <ItemContent>
                                    <ItemTitle>Creado por</ItemTitle>
                                    <ItemDescription>{data?.created_by}</ItemDescription>
                                </ItemContent>
                                <ItemMedia variant={'icon'}>
                                    <User />
                                </ItemMedia>
                            </Item>
                        </li>
                        <li>
                            <Item variant={'outline'}>
                                <ItemContent>
                                    <ItemTitle>Fecha y hora de creación</ItemTitle>
                                    <ItemDescription>{data?.created_at}</ItemDescription>
                                </ItemContent>
                            </Item>
                        </li>
                        <li>
                            <Item variant={'outline'}>
                                <ItemContent>
                                    <ItemTitle>Fecha y hora de finalización</ItemTitle>
                                    <ItemDescription>{data?.finished_at}</ItemDescription>
                                </ItemContent>
                            </Item>
                        </li>
                        <li>
                            <Item variant={'outline'}>
                                <ItemContent>
                                    <ItemTitle>Estado de recorrido</ItemTitle>
                                    <ItemDescription>{data?.status}</ItemDescription>
                                </ItemContent>
                            </Item>
                        </li>
                        <li>
                            <Item variant={'outline'}>
                                <ItemContent>
                                    <ItemTitle>Duracción del recorrido</ItemTitle>
                                    <ItemDescription>{data?.duration}</ItemDescription>
                                </ItemContent>
                            </Item>
                        </li>
                        {data?.comments && (
                            <li className="col-span-full">
                                <Item variant={'outline'}>
                                    <ItemMedia variant={'icon'}>
                                        <AlertTriangle />
                                    </ItemMedia>
                                        <ItemContent>
                                            <ItemTitle>Comentarios de incidencia</ItemTitle>
                                            <ItemDescription dangerouslySetInnerHTML={{ __html: data.comments }} />
                                        </ItemContent>
                                </Item>
                            </li>
                        )}
                    </ul>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant={'outline'}>Cerrar ventana</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    )
}