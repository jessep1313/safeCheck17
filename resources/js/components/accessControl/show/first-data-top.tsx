import { Building, Calendar, Siren } from "lucide-react";

interface Props {
    building: string
    booth: string
    created_at: string
}

export default ({ building, booth, created_at }: Props) => {

    const elements = [
        {title: `${building}`, icon: Building},
        {title: `Caseta de seguridad ${booth}`, icon: Siren},
        {title: `${created_at}`, icon: Calendar},
    ];

    return (
        <ul className="flex items-center gap-3 text-sm">
            {elements.map((el, key) => (
                <li key={key}>
                    <div className="flex items-center gap-2">
                        <div className="bg-accent aspect-square p-1 rounded">
                            <el.icon size={16} />
                        </div>
                        <p>{el.title}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}