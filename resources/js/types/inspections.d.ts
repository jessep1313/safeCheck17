export enum InspectionType {
    Entry = 'Entrada',
    Output = 'Salida',
    Storage = 'Almacen',
}

export enum InspectionStatus {
    Rejected = 'Rechazado',
    Approved = 'Aprobado',
    Pending = 'Pendiente',
}

export interface Inspection {
    id: string;
    uuid: string;
    cert: string;
    status: InspectionStatus;
    userBy: string;
    unitType: string;
    created_at: string;
    updated_at: string;
}

export interface InspectionModel {
    user_id: string;
    certification_id: string;
    vehicle_type_id: string;
    driver_id: string;
    guard_id: string;
    inspect_form_id: string;
    uuid: string;
    trailer_quantity: number;
    company_transport: string;
    company_property: string;
    customer_name: string;
    driver_name: string;
    guard_name: string;
    type: InspectionType;
    plate_number: string;
    status: InspectionStatus;
}

export interface InspectionTrailer {
    inspection_id: string;
    id: string;
    plate?: string;
    vin?: string;
    seil?: string;
}

export interface InspectionShow {
    certification: string;
    company_property: string;
    company_transport: string;
    created_by: string;
    created_at: string;
    customer_name: string;
    driver_name: string;
    guard_name: string;
    id: number;
    status: InspectionStatus;
    success_percentage: number;
    success_questions: number;
    total_questions: number;
    type: InspectionType;
    updated_at: string;
}

export interface InspectionTrailer {
    id: string;
    plate: string;
    seal: string;
    vin: string;
}

export interface InspectionVehicle {
    id: string;
    model: string;
    plate: string;
    trailers_count: number;
    trailers: InspectionTrailer[];
}

export interface InspectionPointProblem {
    comments: string;
    evidences: string[];
}

export interface InspectionPoint {
    id: number;
    number: number;
    approved: boolean;
    answered: boolean;
    label: string;
    description: string;
    problem?: InspectionPointProblem;
}
