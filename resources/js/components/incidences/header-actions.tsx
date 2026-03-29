import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { FileDown, FileX } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Link } from "@inertiajs/react"
import Filters from "./filters"

export default () => {
    return (
        <ButtonGroup>
            {/* Filtros */}
            <ButtonGroup>
                <Filters />
            </ButtonGroup>

            {/* Descarga de reportes */}
            <ButtonGroup>
                {/* Descarga Excel */}
                <Tooltip>
                    <Button variant={'outline'} size={'icon'} asChild>
                        <Link>
                            <TooltipTrigger>
                                <FileX />
                            </TooltipTrigger>
                        </Link>
                    </Button>
                    <TooltipContent>
                        Descargar Excel
                    </TooltipContent>
                </Tooltip>
                {/* Descarga PDF */}
                <Tooltip>
                    <Button variant={'outline'} size={'icon'} asChild>
                        <Link>
                            <TooltipTrigger>
                                <FileDown />
                            </TooltipTrigger>
                        </Link>
                    </Button>
                    <TooltipContent>
                        Descargar PDF
                    </TooltipContent>
                </Tooltip>
            </ButtonGroup>
        </ButtonGroup>
    )
}