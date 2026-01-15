import { CatalogItem, SelectOption } from "@/types"
import { AccessCreateBody } from "@/types/access-control"
import { useForm, usePage } from "@inertiajs/react"
import { PageProps } from "@inertiajs/core"
import { ChangeEvent, FormEvent } from "react"

interface Props extends PageProps {
    buildings: CatalogItem[],
    booths: CatalogItem[]
}

export default () => {

    const { booths: rawBooths, buildings: rawBuildings } = usePage<Props>().props

    const booths: SelectOption[] = rawBooths.map(opt => ({label: opt.name, value: opt.id}));
    const buildings: SelectOption[] = rawBuildings.map(opt => ({label: opt.name, value: opt.id}));

    const {data, setData, errors, processing, post} = useForm({
        building_id: "",
        booth_id: "",
        name: "",
        contractor: "",
        motive: "",
        expires: ""
    })

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('access-control.store'));
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setData(name as keyof typeof data, value);
    }

    return {
        data,
        setData,
        onSubmit,
        onChange,
        errors,
        processing, 
        booths,
        buildings
    }
}