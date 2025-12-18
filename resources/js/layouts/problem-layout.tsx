import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { Spinner } from '@/components/ui/spinner';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface ProblemLayoutProps {
    title: string;
    description: string;
    actionLabel: string;
    onAction?: () => void;
    processing?: boolean;
    children: ReactNode;
}

export default ({ title, description, actionLabel, onAction, processing, children }: ProblemLayoutProps) => {
    return (
        <>
            <main className="mx-auto flex h-full min-h-screen w-full max-w-2xl items-center justify-center p-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-xl">{title}</h1>
                        </CardTitle>
                        <CardDescription>
                            <p className="text-pretty">{description}</p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-5">{children}</CardContent>
                    <CardFooter>
                        <Button onClick={onAction} disabled={processing}>
                            {actionLabel} {processing ? <Spinner /> : <ArrowRight />}
                        </Button>
                    </CardFooter>
                </Card>
            </main>
            <Toaster />
        </>
    );
};
