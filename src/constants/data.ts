import { TiHomeOutline } from "react-icons/ti";
import { CiWallet } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";

type Data = {
  id: number,
  title: string;
  icon: React.ElementType;
  hover: string;
};

export const sidebarlinks: Data[] = [
  {
    id: 0,
    title: "داشبورد",
    icon: TiHomeOutline,
    hover: "text-primary-500",
  },

  {
    id: 1,
    title: "سفارش های من",
    icon: CiWallet,
    hover: "text-primary-500",
  },

  {
    id: 2,
    title: "خروج",
    icon: IoMdExit,
    hover: "text-danger-500",
  },

];

