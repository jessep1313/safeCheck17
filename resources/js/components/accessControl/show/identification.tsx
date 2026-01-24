import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ItemMedia } from "@/components/ui/item"
import { AccessDetail } from "@/types/access-control"
import { usePage } from "@inertiajs/react"
import { PageProps } from "@inertiajs/core"
import { Download, IdCard } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props extends PageProps {
    data: AccessDetail
}

export default () => {

    const { data } = usePage<Props>().props

    return (
        <>
            <Card className="h-full">
                <CardHeader className="flex justify-between">
                    <div>
                        <CardTitle className="mb-1">Identificación</CardTitle>
                        <CardDescription>Fotografía de identificación de {data.name}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button size={'icon'} asChild>
                            <a href={`/storage/${data.identification}`} download>
                                <Download />
                            </a>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="h-[200px] overflow-auto">
                    <img src={`/storage/${data.identification}`} className="h-full w-full object-cover rounded-md" alt={`Identificación de ${data.name}`} />
                </CardContent>
            </Card>
        </>
    )
}