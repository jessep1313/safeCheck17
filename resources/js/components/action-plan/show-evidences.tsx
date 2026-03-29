import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import useFancybox from "@/hooks/use-fancybox"
import { Camera, CameraOff } from "lucide-react"
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "../ui/empty"

export default ({ data }: { data: string[] }) => {

    const [fancyboxRef] = useFancybox({})

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center gap-2 w-full">
                    <CardTitle className="inline-flex gap-2 items-center"><Camera /> Evidencias</CardTitle>
                    <CardDescription>Se subierón {data.length} evidencias</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                {data.length > 0 ? (
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-2" ref={fancyboxRef}>
                        {data.map((evidence, index) => (
                            <li key={index}>
                                <a data-fancybox="gallery" href={evidence}>
                                    <img src={evidence} className="aspect-square w-full rounded-md object-cover" />
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Empty>
                        <EmptyMedia variant={'icon'}>
                            <CameraOff />
                        </EmptyMedia>
                        <EmptyTitle>Sin evidencias</EmptyTitle>
                        <EmptyDescription>No se han agregado evidencias al plan de acción</EmptyDescription>
                    </Empty>
                )}
            </CardContent>
        </Card>
    )
}