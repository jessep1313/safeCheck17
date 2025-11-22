import { SelectOption } from '@/types';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import FieldDescription from './field-description';
import FieldErrorMessage from './field-error-message';
import RequiredTag from './required-tag';

interface FieldSelectProps {
    id: string;
    label: string;
    name: string;
    placeholder?: string;
    description?: string;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    options?: SelectOption[];
    className?: string;
    required?: boolean;
    error?: string;
}

export default ({
    id,
    label,
    name,
    placeholder,
    description,
    defaultValue,
    value,
    onValueChange,
    options = [],
    className = '',
    required,
    error,
}: FieldSelectProps) => {
    return (
        <div className={`block w-full ${className}`}>
            <Label htmlFor={id} className="mb-2 block">
                {label} {required && <RequiredTag />}
            </Label>
            <Select onValueChange={onValueChange} value={value} defaultValue={defaultValue} name={name} required={required}>
                <SelectTrigger className="w-full">
                    <SelectValue id={id} placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt, key) => (
                        <SelectItem key={key} value={opt.value?.toString() || ''}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {description && <FieldDescription description={description} />}
            {error && <FieldErrorMessage message={error} />}
        </div>
    );
};
