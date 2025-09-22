import React from "react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface DtRowActionProps extends React.ComponentProps<typeof Button> {
    tooltip: string
    children: React.ReactNode
}

export default ({tooltip, children, variant="ghost", ...props}: DtRowActionProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant={variant} size={"icon"} {...props}>
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <span>{tooltip}</span>
            </TooltipContent>
        </Tooltip>
    )
}