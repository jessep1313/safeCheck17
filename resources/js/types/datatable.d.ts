import { PageProps } from '@inertiajs/core';
import { LucideIcon } from 'lucide-react';

export interface DataTableFilterDefault {
    page: number;
    per_page: number;
    sort: SortTypes;
    sort_by: string;
    search: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Paginator<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export type SortTypes = 'asc' | 'desc';

export type ColumnType = 'text' | 'number' | 'date' | 'time' | 'default';

export type AlignColumn = 'start' | 'center' | 'end';

export interface ColumnDef<T, K extends keyof T = keyof T> {
    key?: K;
    header: string;
    sortable?: boolean;
    sort?: SortTypes;
    columnType?: ColumnType;
    align?: AlignColumn;
    cell?: (row: T) => React.ReactNode;
}

export interface DataTablePageProps<T> extends PageProps {
    filter: DataTableFilterDefault;
    paginator: Paginator<T>;
}

export interface DataTableRowAction<T> {
    label: string | ((row: T) => string);
    icon: LucideIcon | ((row: T) => LucideIcon);
    to?: string | ((row: T) => string);
    onClick?: (row: T) => void;
    confirmation?: boolean;
    confirmTitle?: string;
    confirmText?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    hide?: boolean | ((row: T) => boolean);
}
