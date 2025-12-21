import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import useFancybox from "@/hooks/use-fancybox"
import { Camera } from "lucide-react"

export default ({ data }: { data: string[] }) => {

    const [fancyboxRef] = useFancybox({})

    return (
        <Card>
            <CardHeader className="flex justify-between items-center gap-3">
                <div className="flex flex-col gap-1">
                    <CardTitle>Evidencias</CardTitle>
                    <CardDescription>
                        <p>El responsable del recorrido agrego las siguientes evidencias:</p>
                    </CardDescription>
                </div>
                <div>
                    <Camera />
                </div>
            </CardHeader>
            <CardContent>
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" ref={fancyboxRef}>
                    {data.map((evidence, index) => (
                        <li key={index}>
                            <a data-fancybox="gallery" href={evidence}>
                                <img src={evidence} className="aspect-square w-full rounded-md" />
                            </a>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}