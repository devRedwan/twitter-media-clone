import Image from "next/image";
import AvatarManIcon from "../public/avatar-man-icon.jpg";
import {
  CalendarIcon,
  MapPinIcon,
  FaceSmileIcon,
  MagnifyingGlassCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

function TweetBox() {
  const [input, setInput] = useState<string>("");

  return (
    <div className="flex space-x-2 p-5">
      <Image
        className="h-14 w-14 rounded-full object-cover mt-4"
        src={AvatarManIcon}
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
              <PhotoIcon className=" cursor-pointer createTweetBox__icons" />
              <MagnifyingGlassCircleIcon className=" cursor-not-allowed createTweetBox__icons" />
              <FaceSmileIcon className=" cursor-not-allowed createTweetBox__icons" />
              <CalendarIcon className=" cursor-not-allowed createTweetBox__icons" />
              <MapPinIcon className=" cursor-not-allowed createTweetBox__icons" />
            </div>
            <button
              disabled={!input}
              className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40">
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
