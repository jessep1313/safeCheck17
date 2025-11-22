import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/components/ui/item';
import { InspectionVehicle } from '@/types/inspections';

interface CardInfoVehicleProps {
    data: InspectionVehicle;
}

export default ({ data }: CardInfoVehicleProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2>Vehículo inspeccionado</h2>
                </CardTitle>
                <CardDescription>
                    <p>
                        <strong className="uppercase">{data.plate}</strong> - {data.model}
                    </p>
                </CardDescription>
            </CardHeader>
            {data.trailers.map((trailer, key) => (
                <CardContent key={key}>
                    <Item variant={'muted'}>
                        <ItemHeader>
                            <ItemTitle>
                                <h3 className="text-sm">Caja/Remolque {key + 1}</h3>
                            </ItemTitle>
                        </ItemHeader>
                        <ItemContent>
                            <ul className="grid gap-2 sm:grid-cols-3">
                                <li>
                                    <Item variant={'outline'} className="bg-background">
                                        <ItemContent>
                                            <ItemTitle>Número de serie</ItemTitle>
                                            <ItemDescription>{trailer.vin}</ItemDescription>
                                        </ItemContent>
                                    </Item>
                                </li>
                                <li>
                                    <Item variant={'outline'} className="bg-background">
                                        <ItemContent>
                                            <ItemTitle>Número de placas</ItemTitle>
                                            <ItemDescription>{trailer.plate}</ItemDescription>
                                        </ItemContent>
                                    </Item>
                                </li>
                                <li>
                                    <Item variant={'outline'} className="bg-background">
                                        <ItemContent>
                                            <ItemTitle>Número del sello</ItemTitle>
                                            <ItemDescription>{trailer.seil ?? 'No definido'}</ItemDescription>
                                        </ItemContent>
                                    </Item>
                                </li>
                            </ul>
                        </ItemContent>
                    </Item>
                </CardContent>
            ))}
        </Card>
    );
};
