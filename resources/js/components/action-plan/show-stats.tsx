import { ActionPlanShow } from "@/types/incidences"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "../ui/item"
import { Calendar, User, UserPen } from "lucide-react";

interface Props {
    data: ActionPlanShow
}

export default ({ data }: Props) => {
    console.log(data);
    return (
        <ItemGroup className="grid grid-cols-4 gap-4">
            <Item variant={'outline'}>
                <ItemMedia variant={'icon'}>
                    <Calendar />
                </ItemMedia>
                <ItemContent>
                    <ItemDescription>Creado el</ItemDescription>
                    <ItemTitle>{data.created_at}</ItemTitle>
                </ItemContent>
            </Item>
            <Item variant={'outline'}>
                <ItemMedia variant={'icon'}>
                    <UserPen />
                </ItemMedia>
                <ItemContent>
                    <ItemDescription>Estado</ItemDescription>
                    <ItemTitle>{data.status}</ItemTitle>
                </ItemContent>
            </Item>
            <Item variant={'outline'}>
                <ItemMedia variant={'icon'}>
                    <UserPen />
                </ItemMedia>
                <ItemContent>
                    <ItemDescription>Creado por</ItemDescription>
                    <ItemTitle>{data.created_by || "No encontrado"}</ItemTitle>
                </ItemContent>
            </Item>
            <Item variant={'outline'}>
                <ItemMedia variant={'icon'}>
                    <User />
                </ItemMedia>
                <ItemContent>
                    <ItemDescription>Asignado a</ItemDescription>
                    <ItemTitle>{data.assigned_to || "No encontrado"}</ItemTitle>
                </ItemContent>
            </Item>
        </ItemGroup>
    )
}