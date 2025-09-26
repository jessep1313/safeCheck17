import { DataTableFilterDefault } from '@/types/datatable.d';
import { Search, SearchX } from 'lucide-react';
import React, { ChangeEvent, ReactNode } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { router } from '@inertiajs/react';

export interface DtHeaderProps {
    searchPlaceholder?: string;
    children?: ReactNode;
    routeName: string;
    filter: DataTableFilterDefault;
}

const DtHeader = ({ children, routeName, filter, searchPlaceholder = 'Buscar . . .' }: DtHeaderProps) => {
    const [searchValue, setSearchValue] = React.useState(filter.search || '');

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    };

    const onSearchClick = () => {
        setSearchValue(filter.search)
        router.get(route(routeName), {...filter, search: searchValue}, {preserveScroll: true, preserveState: true})
    }

    const onSearchClear = () => {
        setSearchValue('')
        router.get(route(routeName), {...filter, search: ''}, {preserveScroll: true, preserveState: true})
    }

    return (
        <header className="mb-3 flex justify-between">
            <search className="flex space-x-2 items-center">
                <Input value={searchValue} type="search" name="search" placeholder={searchPlaceholder} onChange={handleSearchChange} />
                <div className='flex items-center space-x-1'>
                    <Button variant={'ghost'} size={'icon'} type="button" onClick={onSearchClick}>
                        <Search />
                    </Button>
                    {!!filter.search?.trim() && (
                        <Button variant={'ghost'} size={'icon'} type="button" onClick={onSearchClear}>
                            <SearchX />
                        </Button>
                    )}
                </div>
            </search>
            {children && <nav className="flex space-x-1">{children}</nav>}
        </header>
    );
};

export default DtHeader;
