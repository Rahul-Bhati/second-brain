import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TweetCardProps {
  tweet: {
    id_str: string;
    text: string;
    user: {
      name: string;
      screen_name: string;
      profile_image_url_https: string;
    };
    created_at: string;
    favorite_count: number;
    photos?: Array<{
      url: string;
      width: number;
      height: number;
    }>;
  }
}

export default function TweetCard({ tweet }: TweetCardProps) {
  const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
  
  return (
    <Card className="max-w-[350px] overflow-hidden">
      <Link href={tweetUrl} target="_blank" rel="noopener noreferrer">
        <CardHeader className="flex items-center space-x-4 p-4">
          <Avatar>
            <AvatarImage src={tweet.user.profile_image_url_https} alt={tweet.user.name} />
            <AvatarFallback>{tweet.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{tweet.user.name}</h2>
            <p className="text-sm text-gray-500">@{tweet.user.screen_name}</p>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm">{tweet.text}</p>
          {tweet.photos && tweet.photos.length > 0 && (
            <div className="mt-4">
              <Image
                src={tweet.photos[0].url}
                alt="Tweet image"
                width={tweet.photos[0].width}
                height={tweet.photos[0].height}
                className="rounded-lg"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between p-4 text-sm text-gray-500">
          <span>{new Date(tweet.created_at).toLocaleDateString()}</span>
          <span>{tweet.favorite_count} likes</span>
        </CardFooter>
      </Link>
    </Card>
  )
}

