"use client"
import { api } from '@/convex/_generated/api'
import { useAction } from 'convex/react'
import { Bold, Italic, Sparkles } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'

const EditorExtension = ({ editor }) => {
    const { fileId } = useParams();
    const SearchAI = useAction(api.myAction.search);
    const onAiText = async () => {
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        );

        console.log("selectedText", selectedText);

        const result = await SearchAI({
            query: selectedText, fileId: fileId, apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        });

        console.log("unformatterd data", result);
    }
    return editor && (
        <div className='p-5 '>
            <div className="button-group flex gap-4">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'text-blue-500' : ''}
                >
                    <Bold />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'text-blue-500' : ''}
                >
                    <Italic />
                </button>
                {/* Ai button */}
                <button
                    onClick={() => onAiText()}
                    className={'hover:text-blue-500'}
                >
                    <Sparkles />
                </button>
            </div>
        </div>
    )
}

export default EditorExtension