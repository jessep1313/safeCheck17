import FieldUpload from "@/components/form/field-upload";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useEvidence from "@/hooks/actionPlan/use-evidence";
import CreateLayout from "@/layouts/planAction/create-layout";
import { Camera, CameraOff, ImagePlus, Trash2, UploadCloud } from "lucide-react";

export default () => {

    const { uuid, setData, handleSubmit, destroyEvidence, errors, processing, evidences } = useEvidence()

    return (
        <CreateLayout
            title="Evidencia del plan"
            text="Sube la evidencia del plan de acción"
            icon={Camera}
            toBack={route("incidences-control.action-plan.plan", { uuid })}
            toNext={route("incidences-control.home")}
            processing={processing}
        >
            <Dialog>
                <DialogTrigger>
                    <Button>
                        Agregar evidencia
                        <ImagePlus />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Agrega evidencia del plan de acción</DialogTitle>
                    </DialogHeader>
                    <FieldUpload
                        label="Evidencia del plan"
                        name="evidence"
                        error={errors.evidence}
                        setData={setData}
                        placeholder="Arrastra una imagen o da click para subirla"
                        required
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button onClick={handleSubmit} disabled={processing}>Guardar evidencia <UploadCloud /></Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="my-4">
                {evidences.length > 0 ? (
                    <ul className="grid grid-cols-4 gap-2">
                        {evidences.map((row, key) => (
                            <li key={key}>
                                <div className="relative border rounded-md overflow-hidden group">
                                    <picture>
                                        <img src={row.path} className="object-cover aspect-square h-full w-full" />
                                    </picture>
                                    <div className={`absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-accent/60 group-hover:opacity-100 opacity-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-300`}>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button onClick={() => destroyEvidence(row.id)} aria-label="Eliminar evidencia" size={"icon"} variant={'ghost'}>
                                                    <Trash2 />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Eliminar esta imagen</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Empty className="border">
                        <EmptyContent>
                            <EmptyMedia>
                                <CameraOff />
                            </EmptyMedia>
                            <EmptyTitle>No hay evidencias</EmptyTitle>
                            <EmptyDescription>No has agregado evidencias en este plan de acción, cuando agregues una evidencia se mostrara aqui</EmptyDescription>
                        </EmptyContent>
                    </Empty>
                )}
            </div>
        </CreateLayout>
    );
}