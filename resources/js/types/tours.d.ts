import { PagePros } from "@inertiajs/core"
import { InspectionStatus } from "./inspections"

export type NewTour = {
    responsed_id?: string
}

export type TourRow = {
    id: string
    uuid: string
    responsed: string
    responsed_id: string
    status: InspectionStatus
    created_by: string
    created_by_id: string
    comments?: string
    duration?: string
    created_at: string
    finished_at?: string
}