import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/components/ui/item';
import useFancybox from '@/hooks/use-fancybox';
import { InspectionPoint, InspectionPointProblem } from '@/types/inspections';
import { Camera, MessageSquareText } from 'lucide-react';

interface ProblemProps {
    question: InspectionPoint;
    problem: InspectionPointProblem;
}

export default ({ question, problem }: ProblemProps) => {
    const [fancyboxRef] = useFancybox();

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <h2>Problema encontrado</h2>
                </CardTitle>
                <CardDescription>
                    <p>
                        <strong>Pregunta {question.number}: </strong>
                        {question.label}
                    </p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Item variant={'outline'}>
                    <ItemHeader>
                        <ItemTitle>
                            <h3>Comentarios y anotaciones</h3>
                        </ItemTitle>
                        <MessageSquareText />
                    </ItemHeader>
                    <ItemContent>
                        <div
                            className="prose dark:prose-invert"
                            dangerouslySetInnerHTML={{
                                __html: problem.comments ?? 'No se ha dejado comentarios sobre el problema en el punto de inspección',
                            }}
                        />
                    </ItemContent>
                </Item>
            </CardContent>
            <CardContent>
                <Item variant={'outline'}>
                    <ItemHeader>
                        <div className="space-y-2">
                            <ItemTitle>
                                <h2>Evidencia registrada</h2>
                            </ItemTitle>
                            <ItemDescription>Se tomarón {problem.evidences.length} fotografías como evidencia</ItemDescription>
                        </div>
                        <Camera />
                    </ItemHeader>
                    <ItemContent>
                        <ul ref={fancyboxRef} className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                            {problem.evidences.map((imgSrc, key) => (
                                <li key={key}>
                                    <a data-fancybox="evidences" href={imgSrc}>
                                        <picture>
                                            <img
                                                className="aspect-square object-cover"
                                                src={imgSrc}
                                                alt="Fotografia para evidenciar el punto en peligro de la unidad"
                                            />
                                        </picture>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </ItemContent>
                </Item>
            </CardContent>
        </Card>
    );
};
