import { useQuery } from 'convex/react';
import TweetCard from './tweet-card'
import { api } from '@/convex/_generated/api';

export default function TweetDisplay({ email }: { email: string }) {

  const getAllTweet = useQuery(api.tweetStore.getAllTweetByUser, {
    email: email
  });

  // console.log("front ", getAllTweet)

  // console.log(email);
  return (
    <div className="flex flex-wrap justify-evenly mx-4 my-10">
      {getAllTweet && getAllTweet.map((tweet) => (
        <TweetCard key={tweet._id} tweet={tweet} />
      ))}
    </div>
  )
}

