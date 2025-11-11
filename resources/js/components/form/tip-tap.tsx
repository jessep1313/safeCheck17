import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { EditorContent, useEditor } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Heading1, Heading2, Heading3, Italic, List } from 'lucide-react';

interface TipTapEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function TiptapEditor({ value, onChange }: TipTapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert prose-sm sm:prose focus:outline-none min-h-[205px] p-4 rounded-md border border-input bg-background',
            },
        },
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="relative w-full">
            {/* Floating Menu - aparece en líneas vacías */}
            <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div className="flex items-center gap-1 rounded-md border bg-popover p-1 shadow-md">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'bg-accent' : ''}
                    >
                        <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'bg-accent' : ''}
                    >
                        <Heading2 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'bg-accent' : ''}
                    >
                        <Heading3 className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'bg-accent' : ''}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </FloatingMenu>

            {/* Bubble Menu - aparece al seleccionar texto */}
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div className="flex items-center gap-1 rounded-md border bg-popover p-1 shadow-md">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'bg-accent' : ''}
                    >
                        <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'bg-accent' : ''}
                    >
                        <Italic className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'bg-accent' : ''}
                    >
                        <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'bg-accent' : ''}
                    >
                        <Heading2 className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'bg-accent' : ''}
                    >
                        <Heading3 className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'bg-accent' : ''}
                    >
                        <List className="h-4 w-4" />
                    </Button>
                </div>
            </BubbleMenu>

            <EditorContent editor={editor} />
        </div>
    );
}
