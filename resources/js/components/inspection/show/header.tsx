import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppHeader from '@/layouts/app-header';
import { FileDown, FileX } from 'lucide-react';

interface HeaderProps {
    uuid: string;
}

export default ({ uuid }: HeaderProps) => {
    return (
        <AppHeader title="Resumen de inspección" text={`${uuid}`}>
            <ButtonGroup>
                <ButtonGroupText>Descargas:</ButtonGroupText>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="secondary" asChild>
                            <a href={route('inspections.export-pdf', { uuid })}>
                                PDF
                                <FileDown />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Descargar en formato PDF</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="secondary" asChild>
                            <a href={route('inspections.export-excel', { uuid })}>
                                Excel
                                <FileX />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Descargar en formato XLSX</TooltipContent>
                </Tooltip>
            </ButtonGroup>
        </AppHeader>
    );
};
