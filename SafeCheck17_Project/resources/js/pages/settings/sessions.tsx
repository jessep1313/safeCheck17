import HeadingSmall from "@/components/heading-small"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AppLayout from "@/layouts/app-layout"
import SettingsLayout from "@/layouts/settings/layout"
import { BreadcrumbItem, Session, SharedData } from "@/types"
import { Head, router, usePage } from "@inertiajs/react"
import { Check, LogOut } from "lucide-react"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ajustes',
        href: '/settings'
    },
    {
        title: 'Inicios de sesión',
        href: '/settings/sessions'
    }
]

const sessions = () => {

    const { sessions } = usePage<{sessions: Session[]}>().props

    const handleDelete = (id: Session['id']) => {
        router.delete(route('sessions.destroy', id));
    }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head  title="Inicios de sesión" />
        <SettingsLayout>
            <div className="space-y-6">

                <HeadingSmall title="Inicios de sesión" description="Administra tu actividad de inicios de sesión dentro de la plataforma" />

                {/* Tabla de sesiones */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Dirección IP</TableHead>
                            <TableHead>Agente</TableHead>
                            <TableHead>Última Actividad</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sessions.map(session => (
                            <TableRow>
                                <TableCell>
                                    {session.ip_address}
                                    {session.is_current && (<Badge className="block mt-1" variant={'secondary'}>Actual</Badge>)}
                                </TableCell>
                                <TableCell>
                                    <span className="text-wrap">{session.user_agent}</span>
                                </TableCell>
                                <TableCell>{session.last_activity_human}</TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button size={'icon'} variant={'outline'}>
                                                <LogOut />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="space-y-5">
                                            <header className="space-y-4">
                                                <CardTitle>Cerrar sesión</CardTitle>
                                                <CardDescription>Cerrarás sesión en este dispositivo. Si deseas continuar presiona en <strong>Confirmar</strong></CardDescription>
                                            </header>
                                            <footer>
                                                <Button size={'sm'} onClick={() => handleDelete(session.id)}>
                                                    <Check />
                                                    Confirmar
                                                </Button>
                                            </footer>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        </SettingsLayout>
    </AppLayout>
  )
}

export default sessions