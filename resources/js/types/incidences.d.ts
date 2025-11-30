import { InspectionPointProblem } from "./inspections"

interface Incidence {
    id: string
    uuid: string
    evidences: string[]
    description?: string
    action_plan?: string
    updated_at: string
}