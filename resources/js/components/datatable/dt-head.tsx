import { AlignColumn } from "@/types/datatable.d"
import { TableHead } from "../ui/table"


interface DtHeadProps {
    children?: React.ReactNode,
    align?: AlignColumn
}

export default ({ children, align = 'start' }: DtHeadProps) => {

    const aligns = {
        start: 'text-left',
        center: 'text-center',
        end: 'text-right',
    }

    const className = `${aligns[align]}`

    return (
        <TableHead className={className}>
            {children}
        </TableHead>
    )
}