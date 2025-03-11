import React from "react";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { TbBasket } from "react-icons/tb";

interface AppBarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const AppBar = ({ isSidebarOpen, setIsSidebarOpen }: AppBarProps) => {
  return (
    <nav className="w-full bg-default-50 flex justify-between py-6 px-4 items-center shadow-md">
      <button
        className="md:hidden text-2xl"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu />
      </button>

      <p>سلام کاربر | صبح بخیر</p>

      <div className="flex items-center gap-4 text-xl">
        <button className="cursor-pointer p-3 bg-white border-1 border-black-300 rounded-full">
          <TbBasket size={23} />
        </button>

        <button className="cursor-pointer p-3 bg-white border-1 border-black-300 rounded-full">
          <CgProfile size={23} />
        </button>
      </div>
    </nav>
  );
};

export default AppBar;
