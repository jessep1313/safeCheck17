import { InertiaLinkProps, Link } from '@inertiajs/react';
import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { TableHead } from '../ui/table';

interface TableHeadLinkProps extends InertiaLinkProps {
    children: ReactNode;
    className?: string
}

const TableHeadLink = ({ children, className="", ...props }: TableHeadLinkProps) => {
    return (
        <TableHead className={className}>
            <Button variant={'ghost'} size={'sm'} asChild>
                <Link {...props}>{children}</Link>
            </Button>
        </TableHead>
    );
};

export default TableHeadLink;
