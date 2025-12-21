import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TourQuestion } from "@/types/tours"
import { Check, Circle, X } from "lucide-react"

interface Props {
    questions: TourQuestion[]
}

export default ({ questions }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Preguntas realizadas</CardTitle>
                <CardDescription>Resultados de las preguntas</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[35px]">#</TableHead>
                            <TableHead>Pregunta</TableHead>
                            <TableHead className="text-center w-[110px]">Aprobado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {questions.map((question, key) => (
                            <TableRow key={key}>
                                <TableCell>{question.position}</TableCell>
                                <TableCell>{question.question}</TableCell>
                                <TableCell align="center">{question.answered ? (question.result ? <Check className="text-green-500" /> : <X className="text-red-600" />) : <Circle className="text-accent" />}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
