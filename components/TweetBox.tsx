import {
  CalendarIcon,
  FaceSmileIcon,
  MagnifyingGlassCircleIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { Dispatch, MouseEvent, SetStateAction, useRef, useState } from "react";
import { Tweet, TweetBody } from "../typings";
import AvatarImageIcon from "../public/avatar-man-icon.jpg";
import { fetchTweets } from "../utils/fetchTweets";
import { toast } from "react-hot-toast";

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}

function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data: session } = useSession();
  const [imageURLBoxIsOpen, setImageURLBoxIsOpen] = useState<boolean>(false);

  const addImageToTweet = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageInputRef.current?.value) return;
    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setImageURLBoxIsOpen(false);
  };

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      image: image,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || { AvatarImageIcon },
    };

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });

    const json = await result.json();
    const newTweets = await fetchTweets();
    setTweets(newTweets);

    toast("Tweet Posted", {
      icon: "🚀",
    });

    setTimeout(() => {
      return json;
    }, 1000);
  };

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    postTweet();

    setInput("");
    setImage("");
    setImageURLBoxIsOpen(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 rounded-full object-cover mt-4"
        src={session?.user?.image || AvatarImageIcon}
        alt="twitter feed box"
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col ">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            type="text"
            placeholder="What's Happening?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl"
          />
          <div className="flex items-center">
            <div className="flex space-x-2 text-twitter flex-1">
              <PhotoIcon
                onClick={() => setImageURLBoxIsOpen(!imageURLBoxIsOpen)}
                className=" cursor-pointer createTweetBox__icons"
              />
              <MagnifyingGlassCircleIcon className=" cursor-not-allowed createTweetBox__icons" />
              <FaceSmileIcon className=" cursor-not-allowed createTweetBox__icons" />
              <CalendarIcon className=" cursor-not-allowed createTweetBox__icons" />
              <MapPinIcon className=" cursor-not-allowed createTweetBox__icons" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40">
              Tweet
            </button>
          </div>

          {imageURLBoxIsOpen && (
            <form className="rounded-lg mt-5 flex bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Select an image.."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white">
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              src={image}
              className="mt-10 h-40 w-full rounded-xl object-cover shadow-lg"
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
