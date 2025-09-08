import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpenText, ClipboardList, FormInput, LayoutGrid, ScanSearch, SearchCheck, ShieldAlert, ShieldQuestion } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/', icon: LayoutGrid },
    { title: 'Formularios', href: '/formularios', icon: FormInput },
    { title: 'Inspección Digital', href: '/inspeccion-digital', icon: ScanSearch },
    { title: 'Inspecciones Realizadas', href: '/inspecciones-realizadas', icon: SearchCheck },
    { title: 'Catalogos', href: '/catalogos', icon: BookOpenText },
    { title: 'Reportes', href: '/reportes', icon: ClipboardList },
    { title: 'Control de Acceso', href: '/control-de-acceso', icon:  ShieldQuestion},
    { title: 'Control de Incidencias', href: '/control-de-incidencias', icon: ShieldAlert },
];

const footerNavItems: NavItem[] = [
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
