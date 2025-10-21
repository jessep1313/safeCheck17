import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroup, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpenText,
    ClipboardList,
    FormInput,
    LayoutGrid,
    ScanSearch,
    SearchCheck,
    ShieldAlert,
    ShieldQuestion,
    Truck,
    Users2,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/', icon: LayoutGrid },
    { title: 'Formularios', href: '/formularios', icon: FormInput },
    { title: 'Inspección Digital', href: '/inspecciones/crear', icon: ScanSearch },
    { title: 'Inspecciones Realizadas', href: '/inspecciones', icon: SearchCheck },
    { title: 'Reportes', href: '/reportes', icon: ClipboardList },
    { title: 'Control de Acceso', href: '/control-de-acceso', icon: ShieldQuestion },
    { title: 'Control de Incidencias', href: '/control-de-incidencias', icon: ShieldAlert },
];

const footerNavGroup: NavGroup[] = [
    {
        title: 'Catalogos',
        icon: BookOpenText,
        items: [
            {
                title: 'Camiones',
                href: '/catalogos/tipos-de-camiones',
                icon: Truck,
            },
            {
                title: 'Certificados',
                href: '/catalogos/certificados',
                icon: ClipboardList,
            },
            {
                title: 'Usuarios',
                href: '/catalogos/usuarios',
                icon: Users2,
            },
        ],
    },
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
                <NavFooter groups={footerNavGroup} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
