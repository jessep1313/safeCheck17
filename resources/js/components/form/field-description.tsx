interface FieldDescriptionProps {
    description: string
}

export default ({ description }: FieldDescriptionProps) => <small className="text-xs mt-1 block text-muted-foreground">{description}</small>