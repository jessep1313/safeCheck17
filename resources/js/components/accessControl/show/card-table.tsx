import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyTitle } from '@/components/ui/empty';
import { Plus } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
    title: string;
    description: string;
    name: string;
    children: ReactNode;
    isEmpty?: boolean;
    onOpen?: () => void;
}

export default ({ title, description, children, isEmpty = true, name, onOpen }: Props) => {
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle className="mb-1">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                {onOpen && (
                    <Button size={'icon'} onClick={onOpen}>
                        <Plus />
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                {isEmpty ? (
                    <Empty>
                        <EmptyTitle>No hay {name}</EmptyTitle>
                        <EmptyDescription>En cuanto hayan datos de {name} aparecerán aquí</EmptyDescription>
                    </Empty>
                ) : (
                    children
                )}
            </CardContent>
        </Card>
    );
};
