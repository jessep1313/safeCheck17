import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export default ({children} :Props) => {
    return (
        <div className="h-[100dvh] flex items-center justify-center flex-col gap-4">
            {children}
        </div>
    )
}