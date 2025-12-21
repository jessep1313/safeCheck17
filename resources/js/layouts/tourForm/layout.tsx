import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default ({ children }: Props) => {
    return (
        <article className="max-w-xl mx-auto h-[100dvh] w-full flex items-center justify-center flex-col gap-4">
            {children}
        </article>
    )
}