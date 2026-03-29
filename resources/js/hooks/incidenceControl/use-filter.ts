import filterContext from "@/context/incidences/filter-context"
import { useContext } from "react"

export default () => {

    const context = useContext(filterContext)

    if (!context) {
        throw new Error("useFilter must be used within FilterProvider")
    }

    return context
}