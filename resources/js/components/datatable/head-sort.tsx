import { ColumnType, SortTypes } from '@/types/datatable.d';
import {
    ArrowDown01,
    ArrowDownUp,
    ArrowDownWideNarrow,
    ArrowDownZa,
    ArrowUp01,
    ArrowUpWideNarrow,
    ArrowUpZa,
    CalendarArrowDown,
    CalendarArrowUp,
    ClockArrowDown,
    ClockArrowUp,
} from 'lucide-react';
import { TableHead } from '../ui/table';
import { Button } from '../ui/button';

interface HeadSortProps {
    children: React.ReactNode;
    iconType?: ColumnType;
    sort?: SortTypes;
    sortBy?: string;
    align?: string;
    columnKey: string;
    onSort: (sort: SortTypes, sort_by: string) => void;
}

export default function HeadSort({ children, iconType = 'default', sort, sortBy, columnKey, align = 'left', onSort }: HeadSortProps) {
    const icons = {
        text: {
            desc: ArrowDownZa,
            asc: ArrowUpZa,
        },
        number: {
            desc: ArrowDown01,
            asc: ArrowUp01,
        },
        date: {
            desc: CalendarArrowDown,
            asc: CalendarArrowUp,
        },
        time: {
            desc: ClockArrowDown,
            asc: ClockArrowUp,
        },
        default: {
            desc: ArrowDownWideNarrow,
            asc: ArrowUpWideNarrow,
        },
    };

    // Determinar si esta columna está siendo ordenada
    const isCurrentlySorted = sortBy === columnKey;

    // Determinar qué icono mostrar
    const getIcon = () => {
        if (!isCurrentlySorted || !sort) {
            return ArrowDownUp; // Icono neutral cuando no está ordenando
        }

        // Si está ordenando esta columna, mostrar el icono correspondiente
        const iconSet = icons[iconType] || icons.default;
        return iconSet[sort];
    };

    const Icon = getIcon();

    const handleClick = () => {
        if (isCurrentlySorted) {
            onSort(sort === "asc" ? "desc" : "asc", columnKey)
        }else{
            onSort("asc", columnKey)
        }
    };

    return (
        <TableHead className={`text-${align}`}>
            <Button variant={'ghost'} size={'sm'} onClick={handleClick}>
                <Icon size={16} />
                {children}
            </Button>
        </TableHead>
    );
}
