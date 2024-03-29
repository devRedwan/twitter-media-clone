import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Tweet } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";
import Tweets from "./Tweet";
import TweetBox from "./TweetBox";

interface Props {
  tweets: Tweet[];
}

function Feed({ tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);
  const { data: session } = useSession();

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing...");
    const tweets = await fetchTweets();
    setTweets(tweets);
    toast.success("Feed Updated!", {
      id: refreshToast,
    });
  };

  useEffect(() => {
    if (tweets.length === 0) {
      handleRefresh();
    }
  }, []);

  return (
    <div className="col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll scrollbar-hide">
      <div className="flex items-center justify-between ">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <ArrowPathIcon
          onClick={handleRefresh}
          className="h-8 w-8 cursor-pointer text-twitter mt-5 mr-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>
      <TweetBox setTweets={setTweets} />

      <div>
        {session ? (
          tweets.map((tweet) => <Tweets key={tweet._id} tweet={tweet} />)
        ) : (
          <h1 className="text-center my-5 text-2xl">
            Please sign in to post a new{" "}
            <span className="text-twitter">tweet.</span>
          </h1>
        )}
      </div>
    </div>
  );
}

export default Feed;
