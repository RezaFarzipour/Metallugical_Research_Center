import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLinkItem, sidebarchildren } from "@/types";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { cn } from "@/utils/cn";

interface SideBarNavsProps {
  onClose?: () => void;
  navLinkData: NavLinkItem[] | undefined;
}

export default function SideBarNavs({
  onClose,
  navLinkData,
}: SideBarNavsProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleDropdownToggle = (id: number) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <ul className="space-y-2">
      {navLinkData?.map((nav) => {
        const isActive = pathname === nav.to;
        const isDropdownOpen = openDropdown === nav.id;

        if (nav.children && nav.children.length > 0) {
          return (
            <li key={nav.id}>
              <button
                onClick={() => handleDropdownToggle(nav.id)}
                className={cn(
                  "flex items-center justify-between w-full gap-x-2 rounded-lg text-secondary-800 hover:text-secondary-500 transition-all duration-200 py-3 px-4 text-lg",
                  isActive &&
                    "bg-secondary-400 !font-bold text-white hover:text-white"
                )}
              >
                <div className="flex items-center gap-x-2">
                  <nav.icon />
                  <span>{nav.title}</span>
                </div>
                {isDropdownOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isDropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <ul className="mt-2 ml-6 space-y-1">
                  {nav.children.map((child: sidebarchildren) => {
                    const isChildActive = pathname === child.to;
                    return (
                      <li key={child.id}>
                        <Link
                          href={child.to}
                          onClick={onClose}
                          className={cn(
                            "flex items-center rounded-lg text-secondary-800 hover:text-secondary-500 transition-all duration-200 py-2 text-sm w-full pr-6",
                            isChildActive &&
                              "bg-secondary-300 !font-bold text-white hover:text-white"
                          )}
                        >
                          {child.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        }

        return (
          <li key={nav.id}>
            <Link
              href={nav.to}
              onClick={onClose}
              className={cn(
                "flex items-center gap-x-2 rounded-lg text-secondary-800 hover:text-secondary-500 transition-all duration-200 py-3 px-4 text-lg",
                isActive &&
                  "bg-secondary-400 !font-bold text-white hover:text-white"
              )}
            >
              <nav.icon />
              <span>{nav.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
