import { InspectionType } from '../inspections';

export interface FormPrepareBody {
    type?: InspectionType;
    certification_id?: string;
    vehicle_type_id?: string;
    trailer_quantity?: number;
}

export interface FieldsTrailer {
    id?: string;
    vin?: string;
    plate?: string;
    seil?: string;
}

export interface FormInspectionDataBody {
    company_transport?: string;
    company_property?: string;
    plate_number?: string;
    customer_name?: string;
    driver_name?: string;
    guard_name?: string;
    trailers: FieldsTrailer[];
}

export interface FormProblemCommentBody {
    comment: string;
}
