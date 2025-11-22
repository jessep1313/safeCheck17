import { SelectOption } from '@/types';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import RequiredTag from './required-tag';

interface FieldRadioGroupProps {
    id: string;
    name: string;
    label: string;
    options: SelectOption[];
    onValueChange?: (value: string) => void;
    hint?: string;
    error?: string;
    value?: string;
    required?: boolean;
}

export default ({ label, options, required, value, name, id, onValueChange }: FieldRadioGroupProps) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>(value);

    const onChange = (newValue: string) => {
        setSelectedValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <div>
            <Label className="mb-2 block">
                {label} {required && <RequiredTag />}
            </Label>
            <div className="inline-flex space-x-2">
                {options.map((opt) => (
                    <Button
                        key={opt.value}
                        value={opt.value}
                        variant={'outline'}
                        className={`${selectedValue === opt.value ? 'ring-primary' : 'ring-primary/0'} -ring-offset-0 ring-1`}
                        asChild
                    >
                        <label htmlFor={`radio-${id}-${opt.value?.toLowerCase()}`}>
                            {selectedValue === opt.value && <Check className={`text-primary`} />}
                            <input
                                checked={selectedValue === opt.value}
                                hidden
                                name={name}
                                id={`radio-${id}-${opt.value?.toLowerCase()}`}
                                type="radio"
                                value={opt.value}
                                onChange={() => onChange(`${opt.value}`)}
                            />
                            {opt.label}
                        </label>
                    </Button>
                ))}
            </div>
        </div>
    );
};
