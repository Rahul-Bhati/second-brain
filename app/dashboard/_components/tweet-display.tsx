import TweetCard from './tweet-card'

const tweetData = {
  "id_str": "1826280052243526136",
  "text": "Hey @kirat_tw bhaiya, I took your challenge to heart! 🎥 \n\nFor the past 3 weeks, I've been developing a solution to the video uploading issues you mentioned in one of your #Youtube video. 🚀\n\nExcited to launch it soon.💫\n\n#BuildInPublic #100xDevs #SaaS #Cohort2 #TechProduct #YT",
  "user": {
    "name": "Om Sharma",
    "screen_name": "1omsharma",
    "profile_image_url_https": "https://pbs.twimg.com/profile_images/1834816397005758464/r8Pxb8r1_normal.jpg"
  },
  "created_at": "2024-08-21T15:27:49.000Z",
  "favorite_count": 252,
  "photos": [
    {
      "url": "https://pbs.twimg.com/media/GVg__XXXcAA0yHS.jpg",
      "width": 1366,
      "height": 768
    }
  ]
}

export default function TweetDisplay() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <TweetCard tweet={tweetData} />
    </div>
  )
}

