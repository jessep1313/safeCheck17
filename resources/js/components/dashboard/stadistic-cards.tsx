import { Route, SearchCheck, ShieldQuestion } from "lucide-react";
import StadisticCard from "./stadistic-card";
import { usePage } from "@inertiajs/react";

export default () => {

    const { inspections, tours, access } = usePage().props

    return <section className="grid auto-rows-min gap-4 md:grid-cols-3">
        <StadisticCard 
            title="Inspecciones realizadas"
            value={`${inspections}`}
            icon={SearchCheck}
            to="inspections.home"
        />
        <StadisticCard 
            title="Recorridos realizados"
            value={`${tours}`}
            icon={Route}
            to="tours.home"
        />
        <StadisticCard 
            title="Accesos del día"
            value={`${access}`}
            icon={ShieldQuestion}
            to="access-control.home"
        />
    </section>;
};
