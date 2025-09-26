import { AlignColumn } from "@/types/datatable.d"
import { TableHead } from "../ui/table"


interface DtHeadProps {
    children?: React.ReactNode,
    align?: AlignColumn
}

export default ({children, align='start'}: DtHeadProps) => {

    const aligns = {
        start: 'left',
        center: 'center',
        end: 'right',
    }

    const className = `text-${aligns[align]}`

    return (
        <TableHead className={className}>
            {children}
        </TableHead>
    )
}