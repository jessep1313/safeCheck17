import { Search } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export interface DtHeaderProps {
    searchPlaceholder?: string;
    children?: ReactNode;
}

const DtHeader = ({ children, searchPlaceholder = 'Buscar . . .' }: DtHeaderProps) => {
    return (
        <header className="mb-3 flex justify-between">
            <form>
                <search className="flex space-x-1">
                    <Input type="search" placeholder={searchPlaceholder} />
                    <Button variant={'ghost'} type="submit">
                        <Search />
                    </Button>
                </search>
            </form>
            {children && (
                <nav className='flex space-x-1'>
                    {children}
                </nav>
            )}
        </header>
    );
};

export default DtHeader;
