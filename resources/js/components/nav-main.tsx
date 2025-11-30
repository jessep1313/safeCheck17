import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ChevronDown } from 'lucide-react';

function stripQueryHash(path: string) {
  // Asegura que solo usemos el pathname (sin query/hash)
  const url = new URL(path, 'http://dummy'); // base requerida
  return url.pathname;
}

function normalize(path: string) {
  // Quita slashes finales excepto si es "/"
  if (!path) return '/';
  const p = path.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

export function NavMain({ items = [] }: { items: NavItem[] }) {
  const page = usePage();

  const isRouteActive = (href: string): boolean => {
    const current = normalize(stripQueryHash(page.url as string));
    const target = normalize(href);

    // Home debe coincidir exactamente
    if (target === '/') return current === '/';

    // Coincidencia exacta o como prefijo con límite de segmento
    return current === target || current.startsWith(`${target}/`);
  };

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => item.href ? (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={isRouteActive(item.href)}
              tooltip={{ children: item.title }}
            >
              <Link href={item.href} prefetch>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          // Item desplegable para childs
          <Collapsible defaultOpen={item.childs?.some(child => isRouteActive(child.href!))} className="group:collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  {item.icon && <item.icon />}
                  {item.title}
                  <SidebarMenuBadge>
                    <ChevronDown size={16} />
                  </SidebarMenuBadge>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.childs?.map((child) => (
                    <SidebarMenuSubItem key={child.title}>
                      <SidebarMenuSubButton isActive={isRouteActive(child.href!)} asChild>
                        <Link href={child.href}>{child.title}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup >
  );
}
