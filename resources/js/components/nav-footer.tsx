import { Icon } from '@/components/icon';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { NavGroup } from '@/types';
import { Link } from '@inertiajs/react';
import { Collapsible } from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { type ComponentPropsWithoutRef } from 'react';
import { CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export function NavFooter({
    className,
    groups,
    ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
    groups?: NavGroup[];
}) {
    return (
        <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {groups?.map((group, key) => (
                        <Collapsible key={key}>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        {group.icon && <Icon iconNode={group.icon} className="mr-2 size-4" />}
                                        {group.title}
                                        <SidebarMenuAction asChild>
                                            <ChevronDown className="size-4 transition-transform peer-data-[state=open]/menu-button:rotate-180" />
                                        </SidebarMenuAction>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {group.items.map((item, subkey) => (
                                            <SidebarMenuSubItem key={subkey}>
                                                <SidebarMenuSubButton asChild className="w-full">
                                                    <Link href={item.href}>
                                                        {item.icon && <Icon iconNode={item.icon} className="mr-2 size-4" />}
                                                        {item.title}
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
