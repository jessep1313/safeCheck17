import { Label } from "../ui/label"
import FieldErrorMessage from "./field-error-message"
import FileUpload, { FileUploadProps } from "./file-upload"
import RequiredTag from "./required-tag"

interface FieldUploadProps extends FileUploadProps {
    label : string
    error?: string
    required?: boolean
}

export default ({ label, name, setData, placeholder, error, required }: FieldUploadProps) => {
    return (
        <div>
            <Label>{label} {required && <RequiredTag />}</Label>
            <FileUpload
                name={name}
                setData={setData}
                placeholder={placeholder}
            />
            {error && <FieldErrorMessage message={error} />}
        </div>
    )
}