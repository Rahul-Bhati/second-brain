"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useAction, useMutation } from "convex/react"
import { Loader2Icon, Send } from "lucide-react"
import Image from "next/image"
import { useState, ReactNode } from "react"
import { toast } from "sonner"


interface AddTweetProps {
    children: ReactNode; // Define children prop to accept React nodes
}

const AddTweet: React.FC<AddTweetProps> = ({ children }) => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);

    const insertTweetToDb = useMutation(api.tweetStore.AddTweetToDB);

    const embededDoc = useAction(api.myAction.ingest);

    const sendTweet = async () => {
        setLoading(true);
        const match = input.match(/status\/(\d+)/);
        const tweetId = match ? match[1] : null;

        // console.log(match, tweetId, input)
        const options = {
            method: 'GET',
            url: 'https://freetweet.p.rapidapi.com/',
            params: {
                tweet_id: tweetId
            },
            headers: {
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
                'x-rapidapi-host': 'freetweet.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const tweet = response.data;

            await insertTweetToDb({ tweetId: tweet.id_str, text: tweet.text, userName: tweet.user.name, screen_name: tweet.user.screen_name, profileUrl: tweet.user.profile_image_url_https, createdBy: user?.primaryEmailAddress?.emailAddress || 'unknown' });

            // emedding call
            await embededDoc({
                splitText: [tweet.text], fileId: tweet.id_str, contentType: "tweet", apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''
            });

            // console.log(res);
            setInput("");
            toast("tweet is saved!");
        } catch (error) {
            console.error(error);
        }
        setOpen(false);
        setLoading(false);
    }
    return (
        <Dialog open={open}>
            <DialogTrigger asChild className="flex m-0 p-0 justify-start">
                <Button className="w-full gap-3" variant={"ghost"} onClick={() => setOpen(true)}>
                    <Image src={"/twitter.png"} width={20} height={20} alt='twitter' /> <h2>Add tweet</h2>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>add tweet link</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            {/* <h2 className="mt-5">Select a file to Upload</h2> */}
                            <div className="gap-2 p-3 rounded-md border">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="paste your tweet link here..."
                                />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="button" onClick={sendTweet} disabled={loading}>
                        {loading ? <Loader2Icon className="animate-spin" /> : <Send />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default AddTweet