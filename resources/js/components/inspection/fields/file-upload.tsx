import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

export default () => {
    const [image, setImage] = useState<string>();

    const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files![0];
        if (!file) {
            setImage(undefined);
            return;
        }
        const fileUrl = URL.createObjectURL(file);
        setImage(fileUrl);
    };

    return (
        <label className="relative z-[1] flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-accent">
            {image && <img className="absolute top-0 right-0 bottom-0 left-0 -z-[1] h-full w-full object-cover" src={image} />}
            <input
                onChange={onChangeFile}
                type="file"
                capture="environment"
                className="absolute top-0 right-0 bottom-0 left-0 h-full w-full opacity-0"
            />
            <div className="flex flex-col items-center justify-center text-center">
                <div>
                    <Button className=""></Button>
                </div>
                <Camera />
                <p>Tomar foto</p>
            </div>
        </label>
    );
};
