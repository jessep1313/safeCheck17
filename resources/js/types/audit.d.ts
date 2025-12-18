export enum AuditType {
    INSPECTION = 'Inspeccion',
    ROUND = 'Recorrido',
    OTHER = "Otro"
}

export enum AuditStatus {
    PENDING = "Pendiente",
    FINISH = "Finalizado"
}

export type Audit = {
    id: number;
    audit_id: number;
    uuid: string;
    type: AuditType;
    status: AuditStatus;
    created_by_id?: number;
    user_audit?: string;
    created_at_formatted: string;
    created_at: string;
    updated_at: string;
};

export type AuditInspectionQuestion = {
    id: number;
    audit_inspection_id: number;
    question: string;
    answared: boolean;
    result: boolean;
    comments?: string;
    created_at: string;
    updated_at: string;
};