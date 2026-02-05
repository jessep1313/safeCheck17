import { useContext } from "react"
import { FilterContext } from "@/context/access-control/filter-context"


export default () => {

    const context = useContext(FilterContext)

    if (!context) {
        throw new Error("FilterContext is not defined")
    }

    return context
}