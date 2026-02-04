import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Filter } from "lucide-react"

interface Props extends React.ComponentProps<typeof Button> {
    activeCount: number
}

export default ({ activeCount, ...props }: Props) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button className="relative" size={'icon'} variant={'outline'} {...props}>
                    <Filter />
                    {activeCount > 0 && (
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500" />
                    )}
                </Button>
            </TooltipTrigger>
            <TooltipContent>Aplicar filtros</TooltipContent>
        </Tooltip>
    )
}