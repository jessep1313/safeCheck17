import { Head } from '@inertiajs/react';
import { ItemGroup } from '@/components/ui/item';
import AppLayout from '@/layouts/app-layout';
import HeadingSmall from '@/components/heading-small';
import SettingsLayout from '@/layouts/settings/layout';
import useTour from '@/hooks/tours/settings/use-tour';
import ItemSetting from '@/components/tours/item-setting';
import TourCreate from './tour-create';
import { Reorder } from "framer-motion"
import { Button } from '@/components/ui/button';

export default () => {

    const {
        questions,
        handleReorder,
        isReordering,
        handleApplyReorder
    } = useTour()

    return (
        <AppLayout breadcrumbs={[{ title: "Preguntas de recorrido", href: "" }]}>
            <Head title="Preguntas de recorrido" />
            <SettingsLayout>
                <HeadingSmall title="Preguntas de recorrido" description="Actualiza, elimina, agrega u ordena las preguntas del recorrido" />
                <div className='-mt-5'>
                    <div className='flex items-center gap-2'>
                        <TourCreate />
                        {isReordering && (
                            <Button variant={'outline'} onClick={handleApplyReorder}>
                                Aplicar cambios
                            </Button>
                        )}
                    </div>
                    <Reorder.Group axis='y' values={questions} onReorder={handleReorder}>
                        <ItemGroup className='gap-2 mt-3'>
                            {questions.map((question) => (
                                <Reorder.Item key={question.id} value={question}>
                                    <ItemSetting question={question} />
                                </Reorder.Item>
                            ))}
                        </ItemGroup>
                    </Reorder.Group>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
};
