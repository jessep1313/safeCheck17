import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import FilterContext from '@/context/incidences/filter-context';
import { FileDown, FileX } from 'lucide-react';
import { useContext } from 'react';
import Filters from './filters';

export default () => {
    const { data } = useContext(FilterContext) ?? { data: { status: [], type: [] } };

    const buildQueryParams = () => {
        const params = new URLSearchParams();
        data.status.forEach((s) => params.append('status[]', s));
        data.type.forEach((t) => params.append('type[]', t));
        return params.toString();
    };

    const excelUrl = `${route('incidences-control.export-excel')}?${buildQueryParams()}`;
    const pdfUrl = `${route('incidences-control.export-pdf')}?${buildQueryParams()}`;

    return (
        <ButtonGroup>
            <ButtonGroup>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={'outline'} size={'icon'} asChild>
                            <a href={excelUrl} target="_blank">
                                <FileX />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Exportar a Excel</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={'outline'} size={'icon'} asChild>
                            <a href={pdfUrl} target="_blank">
                                <FileDown />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Exportar a PDF</TooltipContent>
                </Tooltip>
            </ButtonGroup>

            <ButtonGroup>
                <Filters />
            </ButtonGroup>
        </ButtonGroup>
    );
};
