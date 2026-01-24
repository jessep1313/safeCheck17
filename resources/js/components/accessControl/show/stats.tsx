import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from '@/components/ui/item';
import { AccessDetail, AccessDeviceBody, AccessToolBody, AccessVehicleBody } from '@/types/access-control';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';
import { Calendar, Hammer, List, Smartphone, Truck } from 'lucide-react';

interface Props extends PageProps {
    data: AccessDetail,
}

export default () => {

    const { data } = usePage<Props>().props;

    const totalElements = data.vehicles.length + data.tools.length + data.devices.length;

    const stats = [
        { title: 'Total de ingresos', value: totalElements, icon: List },
        { title: 'Unidades dentro', value: data.vehicles.length, icon: Truck },
        { title: 'Herramientas', value: data.tools.length, icon: Hammer },
        { title: 'Dispositivos', value: data.devices.length, icon: Smartphone },
    ];

    return (
        <ul className="grid grid-cols-2 gap-4">
            {stats.map((el, key) => (
                <li key={key} className="h-full">
                    <Item variant={'outline'} className="h-full">
                        <ItemHeader>
                            <ItemDescription>{el.title}</ItemDescription>
                            <ItemMedia variant={'icon'}>
                                <el.icon />
                            </ItemMedia>
                        </ItemHeader>
                        <ItemContent>
                            <ItemTitle className="text-4xl">{el.value}</ItemTitle>
                        </ItemContent>
                    </Item>
                </li>
            ))}
        </ul>
    );
};
