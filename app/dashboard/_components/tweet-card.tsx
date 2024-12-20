import Link from 'next/link'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface TweetCardProps {
  tweet: {
    _id: string;
    tweetId: string;
    text: string;
    userName: string;
    screen_name: string;
    profileUrl: string;
    createdBy: string;
    _creationTime: string
  }
}

export default function TweetCard({ tweet }: TweetCardProps) {
  const tweetUrl = `https://twitter.com/${tweet.screen_name}/status/${tweet.tweetId}`;

  return (
    <Card className="max-w-[350px] overflow-hidden mb-4">
      <Link href={tweetUrl} target="_blank" rel="noopener noreferrer">
        <CardHeader className="flex flex-row items-center space-x-4 p-4">
          <Avatar className='self-center mt-2'>
            <AvatarImage src={tweet.profileUrl} alt={tweet.userName} />
            <AvatarFallback>{tweet.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold p-0 m-0">{tweet.userName}</h2>
            <p className="text-sm text-gray-500">@{tweet.screen_name}</p>
          </div>
        </CardHeader>
      </Link>
      <CardContent className="px-4">
        <p className="text-sm">{tweet.text}</p>
      </CardContent>

    </Card>
  )
}

