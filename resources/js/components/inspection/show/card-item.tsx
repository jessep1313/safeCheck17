import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { LucideIcon } from 'lucide-react';

interface CardItemProps {
    title: string;
    text: string;
    icon: LucideIcon;
}

export default ({ icon: Icon, text, title }: CardItemProps) => {
    return (
        <Item variant={'outline'}>
            <ItemContent>
                <ItemTitle>
                    <h3>{title}</h3>
                </ItemTitle>
                <ItemDescription>
                    <p>{text}</p>
                </ItemDescription>
            </ItemContent>
            <ItemMedia>
                <Icon />
            </ItemMedia>
        </Item>
    );
};
