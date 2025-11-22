import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

interface AppHeaderProps {
    title: string;
    text?: string;
    children?: ReactNode;
}

const AppHeader = ({ title, text, children }: AppHeaderProps) => {
    return (
        <>
            <Head title={title} />
            <header className="container my-5 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold">{title}</h1>
                    {text && <p>{text}</p>}
                </div>

                {children && <nav>{children}</nav>}
            </header>
        </>
    );
};

export default AppHeader;
