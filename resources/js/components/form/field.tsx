import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import RequiredTag from "./required-tag";
import FieldErrorMessage from "./field-error-message";
import FieldDescription from "./field-description";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string
    label: string
    required?: boolean
    placeholder?: string
    error?: string
    className?: string
    description?: string
}

export default ({ id, label, placeholder, description, required, error, className = "", ...props }: FieldProps) => {
    return (
        <div className={`inline-block w-full ${className}`}>
            <Label className="inline-block mb-2" htmlFor={id}>{label} {required && <RequiredTag />}</Label>
            <Input id={id} required={required} placeholder={placeholder} {...props} />
            {description && <FieldDescription description={description} />}
            {error && <FieldErrorMessage message={error} />}
        </div>
    )
}