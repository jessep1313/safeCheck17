import { ButtonGroup } from "@/components/ui/button-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "../ui/button"
import { FileDown, FileX } from "lucide-react"
import DialogFilter from "./filter/dialog-filter"
import useFilter from "@/hooks/accessControl/use-filter"

export default () => {

    const { data } = useFilter()

    return (
        <ButtonGroup>
            <ButtonGroup>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={'outline'} size={'icon'} asChild>
                            <a href={'#'}>
                                <FileX />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Exportar a Excel</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={'outline'} size={'icon'} asChild>
                            <a href={route('access-control.report.pdf.list', data)}>
                                <FileDown />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Exportar a PDF</TooltipContent>
                </Tooltip>
            </ButtonGroup>
            <ButtonGroup>
                <DialogFilter />
            </ButtonGroup>
        </ButtonGroup>
    )
}