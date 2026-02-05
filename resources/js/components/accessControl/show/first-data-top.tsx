import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePage } from "@inertiajs/react";
import { Building, Calendar, FileDown, FileX, Siren } from "lucide-react";

interface Props {
    building: string
    booth: string
    created_at: string

}

export default ({ building, booth, created_at }: Props) => {

    const { uuid } = usePage<{ uuid: string }>().props;

    const elements = [
        { title: `${building}`, icon: Building },
        { title: `Caseta de seguridad ${booth}`, icon: Siren },
        { title: `${created_at}`, icon: Calendar },
    ];

    return (
        <nav className="flex items-center justify-between">
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
            <ButtonGroup>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={'secondary'} asChild>
                            <a href={route('access-control.report.pdf.show', { uuid })}>
                                PDF
                                <FileDown />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Descargar en formato PDF</p>
                    </TooltipContent>
                </Tooltip>

                {/* Falta agregar el botón para dar salida */}
            </ButtonGroup>
        </nav>
    );
}