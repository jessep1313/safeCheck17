import { FilePond, registerPlugin } from "react-filepond"
import PluginImagePreview from "filepond-plugin-image-preview"
import React from "react"
import { usePage } from "@inertiajs/react"
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

type StylePanelLayout = "integrated" | "compact" | "circle" | "integrated circle" | "compact circle" | null | undefined

export interface FileUploadProps {
    setData: (name: string, value: string) => void
    name: string
    placeholder?: string
    required?: boolean
    id?: string
    allowImagePreview?: boolean
    panelLayout?: StylePanelLayout
}

export default ({ setData, name, id, placeholder="Arrastra un archivo hasta aquí o <strong>carga uno</strong>", required, allowImagePreview=true, panelLayout }: FileUploadProps) => {

    const [files, setFiles] = React.useState<any[]>([])
    const { props } = usePage()
    registerPlugin(PluginImagePreview)

    return (
        <FilePond
            id={id}
            allowImagePreview={allowImagePreview}
            stylePanelLayout={panelLayout}
            name="file"
            files={files}
            onupdatefiles={setFiles}
            onremovefile={() => setData(name, '')}
            required={required}
            server={{
                url: route('upload.store'),
                headers: {
                    'X-CSRF-TOKEN' : `${props.csrf_token}`
                },
            }}

            labelIdle={placeholder}
            onprocessfile={() => {
                setData(name, `${document.querySelector('input[name="file"]')?.getAttribute('value')}`)
            }}
        />
    )
}