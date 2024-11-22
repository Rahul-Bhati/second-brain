import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import EditorExtension from './EditorExtension'

const TextEditor = () => {
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
    })
    return (
        <div>
            {editor && <EditorExtension editor={editor} />}
            <div>
                {editor && <EditorContent editor={editor} />}
            </div>
        </div>
    )
}

export default TextEditor