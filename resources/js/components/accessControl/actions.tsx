import { Access } from "@/types/access-control";
import { DataTableRowAction } from "@/types/datatable";
import { Eye } from "lucide-react";

export default (): DataTableRowAction<Access>[] => [
    {
        label: "Ver información",
        icon: Eye,
        to: ({uuid}) => route('access-control.show', {uuid})
    }
]