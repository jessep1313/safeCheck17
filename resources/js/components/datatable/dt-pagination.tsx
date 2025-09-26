import { Paginator } from '@/types/datatable.d';
import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface MenuItemProps {
    onChangePerPage: (perPage: string) => void;
    size: string;
}

const MenuItem = ({ size, onChangePerPage }: MenuItemProps) => {
    const onClick = () => {
        onChangePerPage(size);
    };

    return (
        <DropdownMenuItem key={size} onClick={onClick}>
            {size}
        </DropdownMenuItem>
    );
};

interface DtPaginationProps<T> {
    paginator: Paginator<T>;
    currentPerPage: string;
    onChangePerPage: (perPage: string) => void;
}

export default <T,>({ paginator, currentPerPage, onChangePerPage }: DtPaginationProps<T>) => {
    return (
        <div className="flex items-center justify-between space-x-3 py-4">
            <div className="flex items-center space-x-2 text-nowrap">
                <span>Mostrar</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'outline'} size={'sm'}>
                            {currentPerPage}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {[10, 15, 20, 25, 50, 100].map((size) => (
                            <MenuItem key={size} size={size?.toString()} onChangePerPage={onChangePerPage} />
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <span>por página</span>
            </div>
            <ul className="flex items-center space-x-1">
                {paginator.links.map((link, key) => (
                    <li key={key}>
                        <Button disabled variant={link.active ? 'default' : 'outline'} asChild={!!link.url}>
                            <Link preserveScroll preserveState href={`${link.url || ''}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
