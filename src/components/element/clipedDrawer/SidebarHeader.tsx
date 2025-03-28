  
import Logo from "@/components/element/Logo";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";

interface SidebarHeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const SidebarHeader = ({ setIsSidebarOpen }: SidebarHeaderProps) => {
  return (
    <div className="flex bg-[#ffffff] justify-between items-center text-center w-full pb-9">
      <h3>
        <Logo />
      </h3>
      <button
        className="md:hidden block "
        onClick={() => setIsSidebarOpen(false)}
      >
        <MdOutlineCancel size={20} />
      </button>
    </div>
  );
};

export default SidebarHeader;
