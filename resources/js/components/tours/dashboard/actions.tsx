import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { FileDown, FileX } from "lucide-react"

interface Props {
    uuid: string
}

export default ({ uuid }: Props) => {
    return (
        <ButtonGroup>
            <ButtonGroupText>Descargar:</ButtonGroupText>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={'secondary'} asChild>
                        <a href={route('tours.export.pdf', { uuid })} download={`tour-${uuid}.pdf`}>
                            PDF <FileDown />
                        </a>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Descargar en formato PDF</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={'secondary'} asChild>
                        <a href={route('tours.export.excel', { uuid })} download={`tour-${uuid}.xlsx`}>
                            Excel <FileX />
                        </a>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Descargar en formato XLSX</p>
                </TooltipContent>
            </Tooltip>
        </ButtonGroup>
    )
}