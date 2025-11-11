import AppHeader from '@/layouts/app-header';
import AppLayout from '@/layouts/app-layout';

export default () => {
    return (
        <AppLayout>
            <article className="container">
                <AppHeader title="Resumen de inspección" text="" />
            </article>
        </AppLayout>
    );
};
