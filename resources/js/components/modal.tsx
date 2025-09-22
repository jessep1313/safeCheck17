import { ReactNode } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"

interface ModalProps {
    open: boolean
    onHide: () => void
    children: ReactNode
    actions?: ReactNode
    title: string
    description?: string
    footerHidden?: boolean
}

const Modal = ({ open, onHide, children, title, description, actions, footerHidden }: ModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onHide}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (<DialogDescription>{description}</DialogDescription>)}
                    <DialogClose></DialogClose>
                </DialogHeader>
                {children}
                {!footerHidden && (
                    <DialogFooter className="justify-end gap-2 space-x-2 mt-4">
                        <Button variant={"outline"} onClick={onHide} type="button">
                            Cerrar
                        </Button>
                        {actions && actions}
                    </DialogFooter>
                )}
            </DialogContent>

        </Dialog>
    )
}

export default Modal