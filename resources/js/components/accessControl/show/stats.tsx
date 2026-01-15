import { Item, ItemContent, ItemDescription, ItemHeader, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Calendar, Truck, Wrench } from 'lucide-react';

export default () => {
    const stats = [
        { title: 'Visitas del día', value: '00', icon: Calendar },
        { title: 'Salidas del día', value: '00', icon: Calendar },
        { title: 'Vehiculos dentro', value: '00', icon: Truck },
        { title: 'Extras', value: '00', icon: Wrench },
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
