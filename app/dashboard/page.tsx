"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2Icon, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TweetDisplay from './_components/tweet-display'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { chatSession } from '@/config/AiModel'
import RenderHTML from './_components/RenderHTML'

const page = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [htmlContent, setHtmlContent] = useState("");

    const SearchAI = useAction(api.myAction.randomSearch);

    let tweet = {
        "lang": "en",
        "favorite_count": 252,
        "possibly_sensitive": false,
        "created_at": "2024-08-21T15:27:49.000Z",
        "display_text_range": [
            0,
            278
        ],
        "entities": {
            "hashtags": [
                {
                    "indices": [
                        171,
                        179
                    ],
                    "text": "Youtube"
                },
                {
                    "indices": [
                        219,
                        233
                    ],
                    "text": "BuildInPublic"
                },
                {
                    "indices": [
                        234,
                        243
                    ],
                    "text": "100xDevs"
                },
                {
                    "indices": [
                        244,
                        249
                    ],
                    "text": "SaaS"
                },
                {
                    "indices": [
                        250,
                        258
                    ],
                    "text": "Cohort2"
                },
                {
                    "indices": [
                        259,
                        271
                    ],
                    "text": "TechProduct"
                },
                {
                    "indices": [
                        272,
                        275
                    ],
                    "text": "YT"
                }
            ],
            "urls": [],
            "user_mentions": [
                {
                    "id_str": "1517315759185272833",
                    "indices": [
                        4,
                        13
                    ],
                    "name": "Harkirat Singh",
                    "screen_name": "kirat_tw"
                }
            ],
            "symbols": [],
            "media": [
                {
                    "display_url": "pic.x.com/xAmWoGDv4H",
                    "expanded_url": "https://x.com/1omsharma/status/1826280052243526136/photo/1",
                    "indices": [
                        276,
                        299
                    ],
                    "url": "https://t.co/xAmWoGDv4H"
                }
            ]
        },
        "id_str": "1826280052243526136",
        "text": "Hey @kirat_tw bhaiya, I took your challenge to heart! 🎥 \n\nFor the past 3 weeks, I’ve been developing a solution to the video uploading issues you mentioned in one of your #Youtube video. 🚀\n\nExcited to launch it soon.💫\n\n#BuildInPublic #100xDevs #SaaS #Cohort2 #TechProduct #YT https://t.co/xAmWoGDv4H",
        "user": {
            "id_str": "973027547427454976",
            "name": "Om Sharma",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/1834816397005758464/r8Pxb8r1_normal.jpg",
            "screen_name": "1omsharma",
            "verified": false,
            "is_blue_verified": false,
            "profile_image_shape": "Circle"
        },
        "mediaDetails": [
            {
                "display_url": "pic.x.com/xAmWoGDv4H",
                "expanded_url": "https://x.com/1omsharma/status/1826280052243526136/photo/1",
                "ext_media_availability": {
                    "status": "Available"
                },
                "indices": [
                    276,
                    299
                ],
                "media_url_https": "https://pbs.twimg.com/media/GVg__XXXcAA0yHS.jpg",
                "original_info": {
                    "height": 768,
                    "width": 1366
                },
                "sizes": {
                    "large": {
                        "h": 768,
                        "resize": "fit",
                        "w": 1366
                    },
                    "medium": {
                        "h": 675,
                        "resize": "fit",
                        "w": 1200
                    },
                    "small": {
                        "h": 382,
                        "resize": "fit",
                        "w": 680
                    },
                    "thumb": {
                        "h": 150,
                        "resize": "crop",
                        "w": 150
                    }
                },
                "type": "photo",
                "url": "https://t.co/xAmWoGDv4H"
            },
            {
                "display_url": "pic.x.com/xAmWoGDv4H",
                "expanded_url": "https://x.com/1omsharma/status/1826280052243526136/photo/1",
                "ext_media_availability": {
                    "status": "Available"
                },
                "indices": [
                    276,
                    299
                ],
                "media_url_https": "https://pbs.twimg.com/media/GVhAAiAasAAGj_i.jpg",
                "original_info": {
                    "height": 768,
                    "width": 1366
                },
                "sizes": {
                    "large": {
                        "h": 768,
                        "resize": "fit",
                        "w": 1366
                    },
                    "medium": {
                        "h": 675,
                        "resize": "fit",
                        "w": 1200
                    },
                    "small": {
                        "h": 382,
                        "resize": "fit",
                        "w": 680
                    },
                    "thumb": {
                        "h": 150,
                        "resize": "crop",
                        "w": 150
                    }
                },
                "type": "photo",
                "url": "https://t.co/xAmWoGDv4H"
            },
            {
                "display_url": "pic.x.com/xAmWoGDv4H",
                "expanded_url": "https://x.com/1omsharma/status/1826280052243526136/photo/1",
                "ext_media_availability": {
                    "status": "Available"
                },
                "indices": [
                    276,
                    299
                ],
                "media_url_https": "https://pbs.twimg.com/media/GVhABNDawAAV7-r.jpg",
                "original_info": {
                    "height": 642,
                    "width": 361
                },
                "sizes": {
                    "large": {
                        "h": 642,
                        "resize": "fit",
                        "w": 361
                    },
                    "medium": {
                        "h": 642,
                        "resize": "fit",
                        "w": 361
                    },
                    "small": {
                        "h": 642,
                        "resize": "fit",
                        "w": 361
                    },
                    "thumb": {
                        "h": 150,
                        "resize": "crop",
                        "w": 150
                    }
                },
                "type": "photo",
                "url": "https://t.co/xAmWoGDv4H"
            }
        ],
        "photos": [
            {
                "backgroundColor": {
                    "red": 204,
                    "green": 214,
                    "blue": 221
                },
                "expandedUrl": "https://x.com/1omsharma/status/1826280052243526136/photo/1",
                "url": "https://pbs.twimg.com/media/GVg__XXXcAA0yHS.jpg",
                "width": 1366,
                "height": 768
            },
            {
                "backgroundColor": {
                    "red": 204,
                    "green": 214,
                    "blue": 221
                },
                "expandedUrl": "https://x.com/1omsharma/status/1826280052243526136/photo/1",
                "url": "https://pbs.twimg.com/media/GVhAAiAasAAGj_i.jpg",
                "width": 1366,
                "height": 768
            },
            {
                "backgroundColor": {
                    "red": 204,
                    "green": 214,
                    "blue": 221
                },
                "expandedUrl": "https://x.com/1omsharma/status/1826280052243526136/photo/1",
                "url": "https://pbs.twimg.com/media/GVhABNDawAAV7-r.jpg",
                "width": 361,
                "height": 642
            }
        ],
        "conversation_count": 14,
        "news_action_type": "conversation",
        "error": false,
        "details": "successfully retrieved the tweet."
    }

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

export default page