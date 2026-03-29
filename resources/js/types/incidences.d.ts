import { Check, Clock, Hourglass, LucideIcon, X } from "lucide-react";
import { PlanActionStatus } from "@/enums";

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
    action_plan?: {
        uuid: string;
        status: PlanActionStatus;
        id: string;
        finished_at?: string;
    };
    created_at: string;
}

export interface ActionPlan {
    id: string;
    user_id: string;
    created_by_id: string;
    uuid: string;
    uuid_incidence: string;
    incidence_type: IncidenceType;
    plan?: string;
    status: PlanActionStatus;
    finished_at?: string;
}

export interface ActionPlanShow extends ActionPlan {
    evidences: string[]
    created_by: string
    assigned_to: string
    created_at: string
}

export interface FilterIncidences {
    status: string[]
    type: string[]
}