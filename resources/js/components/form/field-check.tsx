import React from "react"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

interface FieldCheckProps extends React.ComponentProps<typeof Checkbox> {
    label: string,
    name: string,
}

export default ({label, name, id, ...props}: FieldCheckProps) => {
    return (
        <div className="space-x-2">
            <Checkbox id={id} name={name} {...props} />
            <Label htmlFor={id}>{label}</Label>
        </div>
    )
}