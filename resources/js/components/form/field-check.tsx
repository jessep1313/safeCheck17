import React from "react"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

interface FieldCheckProps extends React.ComponentProps<typeof Checkbox> {
    label: string,
    name: string,
}

export default ({ label, name, id, ...props }: FieldCheckProps) => {
    return (
        <div className="space-x-2">
            <Label htmlFor={id} className="inline-flex gap-2 items-center font-medium">
                <Checkbox id={id} name={name} {...props} />
                {label}
            </Label>
        </div>
    )
}