import { FilterIncidences } from "@/types/incidences";
import { createContext } from "react";

interface FilterContext {
    onChange: (name: keyof FilterIncidences, value: string) => void
    onReset: () => void
    filterCount: number
    data: FilterIncidences
}

export default createContext<FilterContext | null>(null);