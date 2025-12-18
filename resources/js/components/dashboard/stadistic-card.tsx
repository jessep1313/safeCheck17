import { LucideIcon } from "lucide-react"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@inertiajs/react"

interface Props { 
    title: string
    icon: LucideIcon
    to: string
    value: string
}

export default ({title,icon: Icon,to,value}: Props) => {
    return (
        <Link href={route(to)}>
            <Card className="@container/card hover:bg-accent/20 active:bg-accent/50 transition-all hover:cursor-alias">
                <CardHeader>
                    <CardDescription>{title}</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{value}</CardTitle>
                    <CardAction>
                        <Icon />
                    </CardAction>
                </CardHeader>
                <CardFooter>
                    <CardDescription>
                        <p>Presiona la tarjeta para ver detalles.</p>
                    </CardDescription>
                </CardFooter>
            </Card>
        </Link>
    )
}