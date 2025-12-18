export enum IncidenceType {
    INSPECTION = 'Inspeccion',
    ROUND = 'Recorrido',
    OTHER = 'Otro',
}

export interface Incidence {
    id: string;
    uuid: string;
    type: IncidenceType;
    evidences: string[];
    comments?: string;
    action_plan?: string;
    created_at: string;
}
