import { AccessFilter } from "@/types/access-control"
import { useForm, usePage } from "@inertiajs/react"
import { PageProps } from "@inertiajs/core"
import { useEffect, useState } from "react"

interface Props extends PageProps {
    filter: AccessFilter
}

export default () => {

    const { filter } = usePage<Props>().props
    const [filterCount, setFilterCount] = useState(0);

    const { data, setData, get, errors } = useForm<AccessFilter>({
        check_in: "",
        check_out: "",
        building_id: "",
        booth_id: ""
    })

    const filterCounter = () => {
        const count = Object.values(data).filter((value) => value !== "").length
        setFilterCount(count)
    }

    const onChange = (name: string, value: string) => {
        setData(name as keyof AccessFilter, value)
    }

    const onReset = () => {
        setData({
            check_in: "",
            check_out: "",
            building_id: "",
            booth_id: ""
        })
    }

    useEffect(() => {
        setData({
            check_in: filter.check_in ?? "",
            check_out: filter.check_out ?? "",
            building_id: filter.building_id ?? "",
            booth_id: filter.booth_id ?? ""
        });
    }, [])

    useEffect(() => {
        filterCounter();
        get(route('access-control.home'), {
            preserveState: true,
            preserveScroll: true
        })
    }, [data])

    return {
        data,
        onChange,
        onReset,
        errors,
        filterCount
    }
}