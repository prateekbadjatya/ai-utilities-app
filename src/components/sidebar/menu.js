
import { FaTh, FaDollarSign, FaCog, FaUsersGear, FaImage, FaSpeakap, FaRegUserCircle } from "react-icons/fa";
import { BiUserCircle } from "react-icons/bi";
import { MdImageNotSupported, MdManageHistory, MdOndemandVideo, MdVideoCameraBack } from "react-icons/md";
import { IoChatboxOutline, IoVideocamOutline } from "react-icons/io5";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

export const menuItems = [
  {
    title: "Dashboard",
    icon: <FaTh size={18} />,
    path: "/dashboard",
  },
 {
    title: "Chat",
    icon: <IoChatboxOutline  size={18} />,
    path: "/dashboard/ai-chat",
  },
  {
    title: "Image Generation",
    icon: <FaImage size={18} />,
    path: "/dashboard/image-generator",
  },
  {
    title: "Image Upscaler",
    icon: <MdImageNotSupported size={18} />,
    path: "/dashboard/image-upscaler",
  },
  {
    title: "Video Generation",
    icon: <IoVideocamOutline  size={18} />,
    path: "/dashboard/video-generator",
  },
  {
    title: "Image To Video",
    icon: <MdVideoCameraBack size={18} />,
    path: "/dashboard/image-video-generator",
  },
  {
    title: "Speech Generator",
    icon: <FaSpeakap size={18} />,
    path: "/dashboard/speech-generator",
  },
  {
    title: "Speech To Text",
    icon: <FaSpeakap size={18} />,
    path: "/dashboard/caption-generator",
  },
  {
    title: "Talking AI Avatar",
    icon: <FaRegUserCircle size={18} />,
    path: "/dashboard/ai-avatar",
  },
  
];

export const toggleIcons = {
  expanded: <FiChevronLeft size={20} />,
  collapsed: <FiChevronRight size={20} />,
};