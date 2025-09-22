interface FieldErrorMessageProps {
    message : string
}

export default ({ message }: FieldErrorMessageProps) => {
    return (
        <small className="text-red-400 text-xs inline-block mt-1">{message}</small>
    )
}