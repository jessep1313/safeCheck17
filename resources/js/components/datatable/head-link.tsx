import { InertiaLinkProps, Link } from '@inertiajs/react';
import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { TableHead } from '../ui/table';

interface TableHeadLinkProps extends InertiaLinkProps {
    children: ReactNode;
}

const TableHeadLink = ({ children, ...props }: TableHeadLinkProps) => {
    return (
        <TableHead>
            <Button variant={'ghost'} size={'sm'} asChild>
                <Link {...props}>{children}</Link>
            </Button>
        </TableHead>
    );
};

export default TableHeadLink;
