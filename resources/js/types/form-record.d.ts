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
    label: string
    description: string
    img_src: string
}

export interface InspectFormCreateBody {
    certification_type : string
    vehicle_type : string
}

export interface InspectFieldCreateBody {
    label: string
    description: string
    img_src: string
}

export interface InspectFieldEditBody {
    id: string
    label: string
    description: string
    img_src?: string
}
