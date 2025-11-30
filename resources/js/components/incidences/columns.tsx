import useFancybox from "@/hooks/use-fancybox";
import { ColumnDef } from "@/types/datatable";
import { Incidence } from "@/types/incidences";
import { MoreHorizontal } from "lucide-react";

export const getColumns = (): ColumnDef<Incidence>[] => {

    const [fancyboxRef] = useFancybox()

    return [
        {
            header: "UUID",
            columnType: "text",
            align: "start",
            cell: (row) => <span className="font-medium">{row.uuid}</span>,
        },
        {
            header: "Fecha/Hora",
            columnType: "date",
            align: "start",
            sortable: true,
            sort: "desc",
            cell: (row) => row.updated_at,
        },
        {
            header: "Plan de acción",
            align: "start",
            cell: (row) => row.action_plan ?? "No definido",
        },
        {
            header: "Descripción",
            align: "start",
            cell: (row) => row.description ?? "No definido",
        },
        {
            header: "Evidencia",
            align: "start",
            cell: (row) => (
                <ul className="flex" ref={fancyboxRef}>
                    {row.evidences.map((imgSrc, key) => (
                        <li className={`w-8 -ml-4 ${row.evidences.length > 2 && key > 1 ? "hidden" : ""}`} key={key}>
                            <a href={imgSrc} data-fancybox={`gallery-${row.uuid}`}>
                                <picture>
                                    <img src={imgSrc} className="border-1 border-white block w-full aspect-square object-cover rounded-full" alt={`Imagen de evidencia para el folio ${row.uuid}`} />
                                </picture>
                            </a>
                        </li>
                    ))}
                    {row.evidences.length > 2 && (
                        <li className="w-8 -ml-4" key={row.evidences.length + 1}>
                            <a href={row.evidences[2]} data-fancybox={`gallery-${row.uuid}`}>
                                <span className="w-full aspect-square flex items-center justify-center rounded-full border-1 border-white backdrop-blur-2xl">
                                    <MoreHorizontal />
                                </span>
                            </a>
                        </li>
                    )}
                </ul>
            ),
        },
    ]
}
