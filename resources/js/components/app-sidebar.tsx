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
    Route,
    ScanSearch,
    SearchCheck,
    ShieldAlert,
    ShieldQuestion,
    Truck,
    Users2,
    UsersRound,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/', icon: LayoutGrid },
    { title: 'Formularios', href: '/formularios', icon: FormInput },
    { title: 'Inspección digital', href: '/inspeccion-digital', icon: ScanSearch },
    { title: 'Inspecciones realizadas', href: '/inspecciones', icon: SearchCheck },
    { title: 'Bitacora de recorridos', href: '/recorridos', icon: Route },
    { title: 'Auditorías', href: '/auditorias', icon: ClipboardList },
    { title: 'Control de acceso', href: '/control-de-acceso', icon: ShieldQuestion },
    { title: 'Control de incidencias', href: '/control-de-incidencias', icon: ShieldAlert },
    { title: 'Grupos y roles', href: '/grupos-y-roles', icon: UsersRound },
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
