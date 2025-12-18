import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Download } from 'lucide-react';

interface Props {
    href: string
}

export default ({href}: Props) => {
    return (
        <a target="_blank" href={href} download>
            <Item variant={'muted'}>
                <ItemMedia variant={'image'} className='bg-green-700'>
                    <Download />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Descarga reporte de inspección</ItemTitle>
                    <ItemDescription>Presiona para descargar el reporte y tomarlo como referencia.</ItemDescription>
                </ItemContent>
            </Item>
        </a>
    );
};
