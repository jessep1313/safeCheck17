import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircleMore } from "lucide-react"

export default ({ comment }: { comment: string }) => {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between gap-3">
                <div className="flex flex-col gap-1">
                    <CardTitle>Comentarios</CardTitle>
                    <CardDescription>El responsable del recorrido agrego el siguiente comentario:</CardDescription>
                </div>
                <div>
                    <MessageCircleMore />
                </div>
            </CardHeader>
            <CardContent>
                <div className="prose dark:prose-invert !max-w-full" dangerouslySetInnerHTML={{ __html: comment }}></div>
            </CardContent>
        </Card>
    )
}