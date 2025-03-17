import Link from "next/link";
import React from "react";
import { SidebarLink } from "@/types/index";

interface SidebarLinksProps {
  activeItemId: number | undefined;
  setActiveItemId: (id: number) => void;
  sidebarlinks: SidebarLink[];
}

const SidebarLinks = ({
  activeItemId,
  setActiveItemId,
  sidebarlinks,
}: SidebarLinksProps) => {
  return (
    <div className="w-full bg-[#ffffff]">
      {sidebarlinks.map((link, index) => (
        <div className="border-r-9" key={link.id}>
          <button
            onClick={() => setActiveItemId(link.id)}
            className={`
              flex justify-start w-full gap-3 py-4 px-2 rounded-md 
              cursor-pointer transition-all duration-300 
              ${link.hover ? `hover:${link.hover}` : ""}
              ${index === activeItemId ? "bg-default-200 font-bold" : ""}
            `}
          >
            <span className="text-xl">
              <link.icon />
            </span>
            <Link
              href={link.to}
              className={`text-xl text-default-500 transition-all duration-300 ${
                link.hover ? `hover:${link.hover}` : ""
              }`}
            >
              {link.title}
            </Link>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SidebarLinks;
