import { AccessFilter } from "@/types/access-control";
import { createContext } from "react"; // ⚠️ Cambiar de "vm" a "react"

interface FilterContext {
    data: AccessFilter
    onChange: (name: string, value: string) => void
    onReset: () => void
    filterCount: number
}

export const FilterContext = createContext<FilterContext | null>(null);