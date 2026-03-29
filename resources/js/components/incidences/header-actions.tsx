import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { FileDown, FileX } from "lucide-react"
import { Link } from "@inertiajs/react"
import Filters from "./filters"

export default () => {

    return (
        <ButtonGroup>
            {/* Descarga de reportes */}
            <ButtonGroup>
                {/* Descarga Excel */}
                <Button variant={'outline'} size={'icon'} asChild>
                    <Link>
                        <FileX />
                    </Link>
                </Button>
                {/* Descarga PDF */}
                <Button variant={'outline'} size={'icon'} asChild>
                    <Link>
                        <FileDown />
                    </Link>
                </Button>
            </ButtonGroup>

            {/* Filtros */}
            <ButtonGroup>
                <Filters />
            </ButtonGroup>
        </ButtonGroup>
    )
}