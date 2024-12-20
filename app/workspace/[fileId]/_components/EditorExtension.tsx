"use client"
import { Button } from '@/components/ui/button'
import { chatSession } from '@/config/AiModel'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useAction, useMutation } from 'convex/react'
import { Bold, Italic, Sparkles } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
type EditorType = {
    state: {
        doc: {
            textBetween: (from: number, to: number, join: string) => string;
        };
        selection: {
            from: number;
            to: number;
        };
    };
    getHTML: () => string;
    commands: {
        setContent: (content: string) => void;
    };
    chain: () => {
        focus: () => {
            toggleBold: () => { run: () => void };
            toggleItalic: () => { run: () => void };
        };
    };
    isActive: (command: string) => boolean;
};
interface EditorExtensionProps {
    editor: EditorType;
}

const EditorExtension: React.FC<EditorExtensionProps> = ({ editor }) => {
    const { fileId } = useParams<{ fileId: string }>();
    const SearchAI = useAction(api.myAction.search);
    const saveNote = useMutation(api.notes.AddNotes);
    const { user } = useUser();

    const saveNotes = () => {
        if (user?.primaryEmailAddress?.emailAddress) {
            saveNote({
                notes: editor.getHTML(), fileId: fileId, createdBy: user.primaryEmailAddress.emailAddress
            });
        }

        toast("notes saved!")
    }
    const onAiText = async () => {
        toast("AI is getting your answer...")
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        );

        // console.log("selectedText", selectedText);
        if (!selectedText || !fileId || !process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
            console.error("Missing required parameters for SearchAI call.");
            return;
        }
        const result = await SearchAI({
            query: Array.isArray(selectedText) ? selectedText.join(' ') : selectedText,
            fileId: fileId,
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
        });

        // console.log(result)

        // Ensure that result is handled properly
        if (result) {
            const UnformateData = JSON.parse(result);
            let UnformateAns = "";
            UnformateData?.forEach((element: { pageContent: string }) => UnformateAns += element.pageContent);

            const prompt = `For question : ${selectedText} and with the given content as answer, please give appropriate answer in HTML format. The answer content is : ${UnformateAns}`;

            const AiModelResult = await chatSession.sendMessage(prompt);
            const FinalAns = AiModelResult.response.text().replaceAll('```html', '').replaceAll('```', '');

            const AllText = editor.getHTML();
            editor.commands.setContent(AllText + "<p><strong>Answer: </strong>" + FinalAns + "</p>");

            // console.log(AllText);

            if (user?.primaryEmailAddress?.emailAddress) {
                saveNote({
                    notes: editor.getHTML(), fileId: fileId, createdBy: user.primaryEmailAddress.emailAddress
                });
            }
        }
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

                <Button className='ml-auto' onClick={saveNotes}>Save</Button>
            </div>
        </div>
    )
}

export default EditorExtension