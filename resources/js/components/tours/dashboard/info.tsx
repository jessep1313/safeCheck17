import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from "@/components/ui/item";
import { InspectionStatus } from "@/types/inspections";
import { TourRow } from "@/types/tours";
import { Calendar, Clock, LucideIcon, ShieldCheck, ShieldX, User } from "lucide-react";

interface Props {
    data: TourRow
}

export default ({
    data
}: Props) => {

    const statusRecord: Record<InspectionStatus, { icon: LucideIcon }> = {
        Aprobado: {
            icon: ShieldCheck,
        },
        Pendiente: {
            icon: Clock
        },
        Rechazado: {
            icon: ShieldX
        }
    }

    const IconStatus = statusRecord[data.status].icon;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Detalles del recorrido</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">

                <Item variant={'outline'}>
                    <ItemHeader>
                        <div className="">
                            <ItemTitle>Estado</ItemTitle>
                            <ItemDescription>{data.status}</ItemDescription>
                        </div>
                        <IconStatus />
                    </ItemHeader>
                </Item>

                <Item variant={'outline'}>
                    <ItemHeader>
                        <div className="">
                            <ItemTitle>Responsable</ItemTitle>
                            <ItemDescription>{data.responsed}</ItemDescription>
                        </div>
                        <User />
                    </ItemHeader>
                </Item>

                <Item variant={'outline'}>
                    <ItemHeader>
                        <div className="">
                            <ItemTitle>Fecha de recorrido</ItemTitle>
                            <ItemDescription>{data.created_at}</ItemDescription>
                        </div>
                        <Calendar />
                    </ItemHeader>
                </Item>

                <Item variant={'outline'}>
                    <ItemHeader>
                        <div className="">
                            <ItemTitle>Duración</ItemTitle>
                            <ItemDescription>{data.duration}</ItemDescription>
                        </div>
                        <Clock />
                    </ItemHeader>
                </Item>


            </CardContent>
        </Card>
    );
}