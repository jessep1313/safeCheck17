import FilterContext from "@/context/incidences/filter-context"
import { FilterIncidences } from "@/types/incidences"
import { PageProps } from "@inertiajs/core"
import { usePage } from "@inertiajs/react"
import React from "react"

interface ProviderProps {
    children: React.ReactNode
}

interface Props extends PageProps {
    filters: FilterIncidences
}

export default ({ children }: ProviderProps) => {
    const { filters } = usePage<Props>().props;
    const [data, setData] = React.useState<FilterIncidences>(filters);

    const onReset = () => {
        setData({
            status: [],
            type: []
        })
    }

    const onChange = (key: keyof FilterIncidences, value: string) => {
        const filter = data[key];
        if (filter.includes(value)) {
            const newFilters = filter.filter(el => el !== value);
            setData(prev => ({ ...prev, [key]: newFilters }))
        } else {
            const newFilters = [...filter, value];
            setData(prev => ({ ...prev, [key]: newFilters }))
        }
    }

    const filterCount = React.useMemo(() => {
        if (!data) return 0
        return Object.values(data).filter(value => value !== null && value !== undefined && value !== '').length
    }, [data])

    return <FilterContext.Provider value={{ data, onChange, onReset, filterCount }}>{children}</FilterContext.Provider>
}