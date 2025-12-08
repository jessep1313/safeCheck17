interface Props {
    time: string
}

export default function Chronometer ({time}: Props) {
    return (
        <p className="text-6xl font-bold text-center">
            {time}
        </p>
    )
}