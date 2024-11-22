"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2Icon, Send } from 'lucide-react'
import React, { useState } from 'react'
import TweetDisplay from './_components/tweet-display'
import { useAction } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { chatSession } from '@/config/AiModel'
import RenderHTML from './_components/RenderHTML'

const Page = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [htmlContent, setHtmlContent] = useState("");

    const SearchAI = useAction(api.myAction.randomSearch);

    const searchTweet = async () => {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string; // Assuming NEXT_PUBLIC_GOOGLE_API_KEY is defined and not null
        const res = await SearchAI({
            query: search, apiKey: apiKey
        });
        // console.log(res);

        const UnformateData = JSON.parse(res || ''); // Providing a default empty string if res is null
        let UnformateAns = "";
        UnformateData?.forEach((element: { pageContent: string }) => UnformateAns += element.pageContent);

        const prompt = `you are a LLMs model i use to get data from the vector database and do not give any suggestion or notes or also do not repeat and also give the answer in beutiful ui format if there is any url make sure they will open in new tab also give the original tweet url, For question : ${search} and with the given content as answer, please give appropriate answer in text. The answer content is : ${UnformateAns}`;

        const AiModelResult = await chatSession.sendMessage(prompt);
        const FinalAns = AiModelResult.response.text().replaceAll('```html', '').replaceAll('```', '');

        // console.log(FinalAns)

        setHtmlContent(FinalAns);

        setLoading(false);
    }
    return (
        <div >
            <div className=''>

                <div className='flex mt-5 justify-center items-center gap-4'>
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="search here..."
                        className="w-[80%]  py-6 text-lg bg-white brounded-full shadow-sm"
                    />
                    <Button className=" bg-purple-700 hover:bg-purple-800 text-white right-0 top-1/2" onClick={searchTweet} disabled={loading}>
                        {loading ? <Loader2Icon className="animate-spin" /> : <Send />}

                    </Button>
                </div>
            </div>
            {htmlContent ?
                <div className="flex justify-center p-6">
                    <RenderHTML htmlContent={htmlContent} />
                </div>
                : (
                    <div>
                        {user?.primaryEmailAddress?.emailAddress ? <TweetDisplay email={user.primaryEmailAddress.emailAddress} /> : "user is not login"}
                    </div>

                )}
        </div>
    )
}

export default Page