import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import EditorExtension from './EditorExtension'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

const TextEditor = ({ fileId }: { fileId: string }) => {
    const notes = useQuery(api.notes.GetNotes, {
        fileId: fileId
    });

    // console.log(notes);

    const editor = useEditor({
        extensions: [StarterKit,
            Placeholder.configure({
                placeholder: 'start taking notes here …',
            }),
        ],
        editorProps: {
            attributes: {
                class: "focus:outline-none h-screen p-5 "
            }
        },
        immediatelyRender: false, // Prevent hydration mismatches
    });

    useEffect(() => {
        notes && editor && editor?.commands.setContent(notes);
    }, [notes])

    return (
        <div className="h-full flex flex-col">
            {editor && <EditorExtension editor={editor} />}
            <div className='overflow-auto [&::-webkit-scrollbar]:hidden flex-1'>
                {editor && <EditorContent editor={editor} />}
            </div>
        </div>
    )
}

export default TextEditor