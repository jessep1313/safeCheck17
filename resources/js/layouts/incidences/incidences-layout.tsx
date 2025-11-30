import AppLayout from "../app-layout";
import { BreadcrumbItem, NavItem } from "@/types";
import AppHeader from "../app-header";
import { SearchX } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonGroup } from "@/components/ui/button-group";

const breadcrumbs: BreadcrumbItem[] = [
    { href: "/", title: 'Dashboard' },
    { href: "/control-incidencias/", title: 'Control de incidencias' },
    { href: "/control-incidencias/inspecciones", title: 'Inspecciones' },
];

interface Props {
    children: React.ReactNode;
}

export default ({ children }: Props) => {

    const currentPath = usePage().url

    const navItems: NavItem[] = [
        { title: "Inspecciones", href: "/control-de-incidencias/inspecciones", icon: SearchX, isActive: currentPath === "/control-incidencias/inspecciones" },
        { title: "recorridos", href: "/control-de-incidencias/recorridos", icon: SearchX, isActive: currentPath === "/control-incidencias/recorridos" }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <AppHeader title="Control de inicidencias">
                <ButtonGroup>
                    {navItems.map((item, index) => (
                        <Button variant={item.isActive ? 'default' : 'outline'} key={`${item.href}-${index}`} asChild>
                            <Link href={item.href}>{item.title}</Link>
                        </Button>
                    ))}
                </ButtonGroup>
            </AppHeader>
            <article className="container">
                <main>
                    {children}
                </main>
            </article>
        </AppLayout>
    );
}