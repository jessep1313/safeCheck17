import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InspectionShow } from '@/types/inspections';
import { Shield, Truck, User } from 'lucide-react';
import CardItem from './card-item';

interface CardPeoplesInspectionProps {
    data: InspectionShow;
}

export default ({ data }: CardPeoplesInspectionProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2>Participantes</h2>
                </CardTitle>
                <CardDescription>Personal que participo en la inspección de la unidad</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    <li>
                        <CardItem title="Conductor de transporte" text={data.driver_name} icon={Truck} />
                    </li>
                    <li>
                        <CardItem title="Cliente" text={data.customer_name} icon={User} />
                    </li>
                    <li>
                        <CardItem title="Guardia inspector" text={data.guard_name} icon={Shield} />
                    </li>
                </ul>
            </CardContent>
        </Card>
    );
};
