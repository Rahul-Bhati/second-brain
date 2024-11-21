"use client"
import { chatSession } from '@/config/AiModel'
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

        const UnformateData = JSON.parse(result);
        let UnformateAns = "";
        UnformateData && UnformateData.forEach(element => UnformateAns += element.pageContent);

        const prompt = "For question : " + selectedText + " and with the given content as answer, please give appropriate answer in HTML format. The answer content is : " + UnformateAns;

        const AiModelResult = await chatSession.sendMessage(prompt);
        const FinalAns = AiModelResult.response.text().replaceAll('```html', '').replaceAll('```', '');

        const AllText = editor.getHTML();
        editor.commands.setContent(AllText + "<p><strong>Answer: </strong>" + FinalAns + "</p>");

        console.log("unformatterd data", UnformateData);
        console.log("unformatterd ans", UnformateAns);
        console.log("Prompt", prompt);
        console.log("AiModelResult", AiModelResult.response.text());
    }
    return fileId && editor && (
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