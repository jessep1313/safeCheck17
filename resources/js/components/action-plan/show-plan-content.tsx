import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
    plan: string
}

export default ({ plan }: Props) => {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Descripción del plan</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[40vh] overflow-y-auto">
                <div className="prose dark:prose-invert [&_li_p]:my-0 [&_li_p]:leading-snug" dangerouslySetInnerHTML={{ __html: plan }}></div>
            </CardContent>
        </Card>
    )
}