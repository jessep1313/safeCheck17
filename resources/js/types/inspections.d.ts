export enum InspectionType {
    Entry = 'Entrada',
    Output = 'Salida',
    Storage = 'Almacen',
}

export interface Inspection {
    id: string;
    uuid: string;
    cert: string;
    status: string;
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
    status: string;
}

export interface InspectionTrailer {
    inspection_id: string;
    id: string;
    plate?: string;
    vin?: string;
    seil?: string;
}
