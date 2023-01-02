import {
  BellIcon,
  BookmarkIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
  HashtagIcon,
  HomeIcon,
  RectangleStackIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import TwitterLogo from "../public/TwitterLogo.png";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  return (
    <div className="flex flex-col  col-span-2 items-center px-4 md:items-start">
      <Image src={TwitterLogo} alt="twitter" className="m-3 h-10 w-10" />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={EnvelopeIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={RectangleStackIcon} title="Lists" />
      <SidebarRow Icon={UserIcon} title="Sign In" />
      <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
    </div>
  );
}

export default Sidebar;
