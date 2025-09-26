import { PageProps } from "@inertiajs/core"
import { DataTableFilterDefault, Paginator } from "./datatable.d"

export enum certificate {
    CTPAT,
    OEA
}

export interface InspectForm {
    id : number
    folio : string
    vehicleType: string
    certificate: string
    fields : number
    created_at : string
}


export interface InspectFormField {
    id: number
    location: string
    label: string
    description: string
    img_src: string
}

export interface InspectFormCreateBody {
    certification_type : string
    vehicle_type : string
    preload_fields: boolean
}

export interface InspectFieldCreateBody {
    label: string
    description: string
    img_src: string
}

export interface InspectFieldEditBody {
    label: string
    description: string
    img_src?: string
}

export interface FormPageProps extends PageProps {
  certificates: CatalogItem[],
  vehicleTypes: CatalogItem[],
  paginator: Paginator<InspectForm>,
  filter: DataTableFilterDefault
}
