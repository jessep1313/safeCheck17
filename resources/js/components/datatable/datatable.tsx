import { ColumnDef, DataTablePageProps, DataTableRowAction, SortTypes } from '@/types/datatable.d';
import { router, usePage } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import DtHead from './dt-head';
import DtPagination from './dt-pagination';
import DtRowActions from './dt-row-actions';
import DtRowEmpty from './dt-row-empty';
import HeadSort from './head-sort';
import DtHeader from './dt-header';

interface DataTableProps<T> {
    columns: ColumnDef<T>[];
    createLabel?: string;
    onCreate?: () => void;
    createLink?: string;
    emptyMessage?: string;
    routeName: string;
    actions?: DataTableRowAction<T>[];
    fixedActions?: boolean
}

export type AlignColumn = 'left' | 'center' | 'right';

export default <T,>({ columns, createLabel, onCreate, createLink, emptyMessage, routeName, actions = [], fixedActions=true }: DataTableProps<T>) => {
    const { filter, paginator } = usePage<DataTablePageProps<T>>().props;

    const onChangePerPage = (per_page: string) => {
        router.get(route(routeName), { ...filter, per_page }, { preserveScroll: true, preserveState: true });
    };

    const onChangeOrder = (sort: SortTypes, sort_by: string) => {
        router.get(route(routeName), { ...filter, sort, sort_by }, { preserveScroll: true, preserveState: true });
    };

    return (
        <article>

            <DtHeader
                filter={filter}
                routeName={routeName}
            />

            <section>
                <Table>
                    <TableHeader>
                        <TableRow className='relative'>
                            {columns.map((col, key) =>
                                col.sortable && col.key ? (
                                    <HeadSort
                                        key={key}
                                        iconType={col.columnType}
                                        align={col.align}
                                        columnKey={col.key.toString()}
                                        sort={filter.sort}
                                        sortBy={filter.sort_by}
                                        onSort={onChangeOrder}
                                    >
                                        {col.header}
                                    </HeadSort>
                                ) : (
                                    <DtHead align={col.align} key={key}>
                                        {col.header}
                                    </DtHead>
                                ),
                            )}
                            {actions?.length > 0 && (
                                <TableHead 
                                    className={`w-10 border-l border-b`} 
                                />
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginator?.data && paginator.data.length > 0 ? (
                            paginator?.data.map((row, key) => (
                                <TableRow className='relative' key={key}>
                                    {columns.map((col, key) => {
                                        return (
                                            <TableCell className={`text-${col.align ? col.align : 'left'}`} key={key}>
                                                {col.cell ? col.cell(row) : col.key ? (row[col.key] as string | number) : ''}
                                            </TableCell>
                                        );
                                    })}
                                    {actions?.length > 0 && (
                                        <DtRowActions 
                                            actions={actions} 
                                            row={row} 
                                            fixed={fixedActions}
                                        />
                                    )}
                                </TableRow>
                            ))
                        ) : (
                                <DtRowEmpty
                                    colSpan={actions.length > 0 ? columns.length +1 : columns.length}
                                    createLabel={createLabel}
                                    onCreate={onCreate}
                                    createLink={createLink}
                                    message={emptyMessage}
                                />
                        )}
                    </TableBody>
                </Table>
            </section>
            <footer>
                <DtPagination paginator={paginator} currentPerPage={filter.per_page.toString()} onChangePerPage={onChangePerPage} />
            </footer>
        </article>
    );
};
