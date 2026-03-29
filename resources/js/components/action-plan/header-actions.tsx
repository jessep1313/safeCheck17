import { ActionPlanShow } from "@/types/incidences"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "../ui/button-group"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { PlanActionStatus } from "@/enums"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import { Ban, CheckCircle, Play } from "lucide-react"
import React from "react"

interface Props {
    data: ActionPlanShow
}

export default ({ data }: Props) => {
    return (
        <ButtonGroup>
            {/* Iniciar plan */}
            {data.status === PlanActionStatus.PENDING && (
                <AlertDialog>
                    <AlertDialogContent>
                        <AlertDialogTitle>¿Iniciar plan de acción?</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p>Se cambiará el estado del plan de acción a en progreso y no podrás revertirlo, solo cancelarlo o completarlo.</p>
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cerrar ventana</AlertDialogCancel>
                            <AlertDialogAction>Si, iniciar plan</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    <AlertDialogTrigger asChild>
                        <Button><Play /> Iniciar plan</Button>
                    </AlertDialogTrigger>
                </AlertDialog>
            )}

            {data.status === PlanActionStatus.IN_PROGRESS && (
                <React.Fragment>
                    <ButtonGroupText>Acciones</ButtonGroupText>

                    {/* Finalizar plan */}
                    <AlertDialog>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                    <Button size={'icon'}>
                                        <CheckCircle />
                                    </Button>
                                </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>Completar plan de acción</TooltipContent>
                        </Tooltip>
                        <AlertDialogContent>
                            <AlertDialogTitle>Completar plan de acción</AlertDialogTitle>
                            <AlertDialogDescription>
                                Se cambiará el estado del plan de acción a completado y no podrás revertirlo. ¿Estás seguro de continuar?
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cerrar ventana</AlertDialogCancel>
                                <AlertDialogAction>Si, completar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    {/* Cancelar plan */}
                    <AlertDialog>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <AlertDialogTrigger asChild>
                                    <Button size={'icon'}>
                                        <Ban />
                                    </Button>
                                </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>¿Cancelar plan de acción?</TooltipContent>
                        </Tooltip>
                        <AlertDialogContent>
                            <AlertDialogTitle>¿Cancelar plan de acción?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Se cambiará el estado del plan de acción a cancelado y no podrás revertirlo. ¿Estás seguro de continuar?
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cerrar ventana</AlertDialogCancel>
                                <AlertDialogAction>Si, cancelar plan</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </React.Fragment>
            )}

        </ButtonGroup>
    )
}