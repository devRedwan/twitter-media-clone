import {
  ArrowsRightLeftIcon,
  ArrowUpTrayIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import TimeAgo from "react-timeago";
import { Comment, CommentBody, Tweet, TweetBody } from "../typings";
import { fetchComments } from "../utils/fetchComments";
import AvatarImageIcon from "../public/avatar-man-icon.jpg";

interface Props {
  tweet: Tweet;
}

function Tweets({ tweet }: Props) {
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);

  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const postComment = async () => {
    const commentToast = toast.loading("Posting Comment...");

    // Comment logic
    const comment: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || { AvatarImageIcon },
    };

     await fetch(`/api/addComment`, {
      body: JSON.stringify(comment),
      method: "POST",
    });


    const newComments = await fetchComments(tweet._id);
    setComments(newComments);

    toast.success("Comment Posted!", {
      id: commentToast,
    });

  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    postComment();

    setInput("");
    setCommentBoxVisible(false);
    refreshComments();
  };

  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg}
          alt={tweet.username}
        />

        <div className="">
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username} ·
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>
          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
            />
          )}
        </div>
      </div>

      <div className="comments flex justify-between mt-5">
        <div
          className="feedTweet__icons"
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}>
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="feedTweet__icons">
          <ArrowsRightLeftIcon className="h-5 w-5" />
        </div>
        <div className="feedTweet__icons">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="feedTweet__icons">
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3">
          <input
            onChange={(event) => setInput(event.target.value)}
            value={input}
            type="text"
            placeholder="Write a comment..."
            className="rounded-lg flex-1 bg-gray-100 p-2 outline-none"
          />
          <button
            disabled={!input}
            type="submit"
            onClick={handleSubmit}
            className="text-twitter disabled:text-gray-200">
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div className="flex space-x-2 relative" key={comment._id}>
              <hr className="absolute left-5 top-10 h-8  border-x border-twitter/30" />
              <img
                src={comment.profileImg}
                className="mt-2 h-7 w-7 object-cover rounded-full"
                alt=""
              />
              <div className="">
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, "").toLowerCase()} ·{" "}
                  </p>{" "}
                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweets;
