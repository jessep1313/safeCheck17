import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function useTourTimer() {

    const { post } = useForm();
    const { uuid } = usePage().props

    // region States
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // region Format
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // region Controles
    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);

    // region finished
    const onFinish = () => {
        post(route('tours.finish', {uuid}));
    }

    // region incidence
    const onIncidence = () => {
        post(route('tours.incidence', {uuid}))
    }

    // region Effects
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    useEffect(() => {
        start();
        return () => stop();
    }, []);

    return {
        time: formatTime(time),
        rawTime: time, // tiempo en segundos si lo necesitas
        isRunning,
        onFinish,
        onIncidence
    };
}
