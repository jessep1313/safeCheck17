import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

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
        {items.map((item) => (
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
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
