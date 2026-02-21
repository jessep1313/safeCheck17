import { Check, Clock, Hourglass, LucideIcon, X } from "lucide-react";

export enum IncidenceType {
    INSPECTION = 'Inspeccion',
    ROUND = 'Recorrido',
    OTHER = 'Otro',
}

export enum PlanActionStatus {
    PENDING = 'Pendiente',
    IN_PROGRESS = 'En Proceso',
    FINISHED = 'Finalizado',
    CANCELLED = 'Cancelado',
}

export interface Incidence {
    id: string;
    uuid: string;
    type: IncidenceType;
    evidences: string[];
    comments?: string;
    action_plan?: {
        uuid: string;
        status: PlanActionStatus;
    };
    created_at: string;
}

export interface ActionPlan {
    id: string;
    uuid: string;
    uuid_incidence: string;
    incidence_type: IncidenceType;
    plan?: string;
    user_id: string;
    created_by_id: string;
    status: PlanActionStatus;
    finished_at?: string;
}
