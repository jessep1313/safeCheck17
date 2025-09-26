import React from "react";
import { CardDescription } from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface FieldCardSwitchProps extends React.ComponentProps<typeof Switch> {
    title: string
    description: string
}

export default ({title, description,...props}: FieldCardSwitchProps) => {
    return (
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
                <Label>{title}</Label>
                <CardDescription>{description}</CardDescription>
            </div>
            <Switch
                {...props}
            />
        </div>
    );
};
