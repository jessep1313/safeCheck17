import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InspectionShow, InspectionStatus, InspectionType } from '@/types/inspections.d';
import { AlertCircle, Building, CalendarSearch, CheckCircle, FileBadge, LogIn, LogOut, LucideIcon, UserRoundPlus, Warehouse } from 'lucide-react';
import CardItem from './card-item';

interface CardInfoInspectionProps {
    data: InspectionShow;
}

export default ({ data }: CardInfoInspectionProps) => {
    const IconTypes: Record<InspectionType, LucideIcon> = {
        Entrada: LogIn,
        Salida: LogOut,
        Almacen: Warehouse,
    };

    const IconType = IconTypes[data.type];
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle className="mb-2">
                        <h2>Información de inspección</h2>
                    </CardTitle>
                    <CardDescription>
                        <p>
                            Estado de inspección: <strong>{data.status}</strong>
                        </p>
                    </CardDescription>
                </div>
                <div>{data.status === InspectionStatus.Rejected ? <AlertCircle /> : <CheckCircle />}</div>
            </CardHeader>
            <CardContent>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <li>
                        <CardItem title="Tipo de inspección" text={data.type} icon={IconType} />
                    </li>
                    <li>
                        <CardItem title="Certificación aplicada" text={data.certification} icon={FileBadge} />
                    </li>
                    <li>
                        <CardItem title="Compañia transportista" text={data.company_transport} icon={Building} />
                    </li>
                    <li>
                        <CardItem title="Compañia Propietaria" text={data.company_property} icon={Building} />
                    </li>
                    <li>
                        <CardItem title="Creado por" text={data.created_by} icon={UserRoundPlus} />
                    </li>
                    <li>
                        <CardItem title="Fecha de inspección" text={data.created_at} icon={CalendarSearch} />
                    </li>
                </ul>
            </CardContent>
        </Card>
    );
};
