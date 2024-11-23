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
import PdfDisplay from './_components/PdfDisplay'

const Page = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [htmlContent, setHtmlContent] = useState("");
    const [activeTab, setActiveTab] = useState("tweets");

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

        const prompt = `you are a LLMs model i use to get data from the vector database and do not give any suggestion or notes or also do not repeat and also give the answer in beutiful ui format if there is any url make sure they will open in new tab also give the original tweet url and if not then make a url for the tweet post using fileId/tweetId that is mention in ${UnformateAns}, For question : ${search} and with the given content as answer, please give appropriate answer in text. The answer content is : ${UnformateAns}`;

        const AiModelResult = await chatSession.sendMessage(prompt);
        const FinalAns = AiModelResult.response.text().replaceAll('```html', '').replaceAll('```', '');

        // console.log(FinalAns)

        setHtmlContent(FinalAns);

        setLoading(false);
    }

    return (
        <div className="h-screen p-6">
            {/* Tabs */}
            <div className="flex justify-center mb-6">
                <button
                    className={`px-6 py-2 font-medium ${activeTab === "tweets" ? "text-purple-700 border-b-2 border-purple-700" : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("tweets")}
                >
                    Tweets
                </button>
                <button
                    className={`px-6 py-2 font-medium ${activeTab === "pdf" ? "text-purple-700 border-b-2 border-purple-700" : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("pdf")}
                >
                    PDF
                </button>
            </div>

            {/* Content */}
            {activeTab === "tweets" ? (
                <div className="space-y-4">
                    {/* Search Bar */}
                    <div className="flex justify-center gap-4">
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Tweets..."
                            className="w-full max-w-md py-3 text-sm rounded-lg shadow"
                        />
                        <Button
                            className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-3 rounded-lg"
                            onClick={searchTweet}
                            disabled={loading}
                        >
                            {loading ? <Loader2Icon className="animate-spin" /> : <Send />}
                        </Button>
                    </div>

                    {/* Tweet Content */}
                    <div className="rounded-lg">
                        {htmlContent ? (
                            <div className="prose max-w-none">
                                {/* Assuming RenderHTML is a component */}
                                <RenderHTML htmlContent={htmlContent} />
                            </div>
                        ) : (
                            <div className="text-center text-gray-600">
                                {user?.primaryEmailAddress?.emailAddress ? (
                                    <TweetDisplay email={user.primaryEmailAddress.emailAddress} />
                                ) : (
                                    "User is not logged in"
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                // PDF Viewer
                <div className="flex justify-center">
                    {user?.primaryEmailAddress?.emailAddress && <PdfDisplay email={user.primaryEmailAddress.emailAddress} />}
                </div>
            )}
        </div>
    )
}

export default Page