import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Item, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from '@/components/ui/item';
import { User } from 'lucide-react';

interface Props {
    name: string;
    phone?: string;
    contractor?: string;
    motive: string;
}

export default ({ name, phone, contractor, motive }: Props) => {
    return (
        <Item variant={'outline'}>
            <ItemHeader className='mb-auto'>
                <div>
                    <ItemDescription className="text-xs">Nombre de la persona</ItemDescription>
                    <ItemTitle>
                        <h1 className="block text-lg font-bold">{name}</h1>
                    </ItemTitle>
                </div>
                <ItemMedia variant={'image'}>
                    <Avatar>
                        <AvatarFallback>
                            <User />
                        </AvatarFallback>
                    </Avatar>
                </ItemMedia>
            </ItemHeader>
            <ItemFooter className='mt-auto'>
                <ItemGroup className="flex-row flex-wrap gap-4 flex-1">
                    {phone && (
                        <Item variant={'muted'} className='flex-1'>
                            <ItemContent>
                                <ItemTitle>Teléfono</ItemTitle>
                                <ItemDescription>
                                    <a href={`tel:${phone}`}>{phone}</a>
                                </ItemDescription>
                            </ItemContent>
                        </Item>
                    )}
                    {contractor && (
                        <Item variant={'muted'} className='flex-1'>
                            <ItemContent>
                                <ItemTitle>Contratista</ItemTitle> 
                                <ItemDescription>{contractor}</ItemDescription>
                            </ItemContent>
                        </Item>
                    )}
                    <Item variant={'muted'} className='flex-1'>
                        <ItemContent>
                            <ItemTitle>Motivo</ItemTitle> 
                            <ItemDescription>{motive ?? 'No se encontro motive'}</ItemDescription>
                        </ItemContent>
                    </Item>
                </ItemGroup>
            </ItemFooter>
        </Item>
    );
};
