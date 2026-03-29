import FilterContext from "@/context/incidences/filter-context"
import { FilterIncidences } from "@/types/incidences"
import { PageProps, router } from "@inertiajs/core"
import { useForm, usePage } from "@inertiajs/react"
import React from "react"

interface ProviderProps {
    children: React.ReactNode
}

interface Props extends PageProps {
    filter: FilterIncidences
}

export default ({ children }: ProviderProps) => {
    const { filter } = usePage<Props>().props;
    const { data, setData, get } = useForm<FilterIncidences>({
        status: [],
        type: []
    });

    const onReset = () => {
        setData({
            status: [],
            type: []
        })
    }

    const onChange = (key: keyof FilterIncidences, value: string) => {
        console.log(key, value)
        const filter = data[key];
        const newFilters = filter.includes(value)
            ? filter.filter(el => el !== value)
            : [...filter, value];

        const newData = { ...data, [key]: newFilters };
        setData(newData);
    }

    const filterCount = React.useMemo(() => {
        if (!data) return 0
        return data.status.length + data.type.length
    }, [data])

    React.useEffect(() => {
        setData({
            status: filter.status ?? [],
            type: filter.type ?? []
        })
    }, [])

    React.useEffect(() => {
        get(route('incidences-control.home'), {
            preserveState: true,
            preserveScroll: true
        });
    }, [data])


    return <FilterContext.Provider value={{ data, onChange, onReset, filterCount }}>{children}</FilterContext.Provider>
}