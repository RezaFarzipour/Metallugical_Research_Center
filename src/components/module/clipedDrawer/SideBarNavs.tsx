import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NavLinkItem, sidebarchildren } from "@/types";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

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
                className={clsx(
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
                className={clsx(
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
                          className={clsx(
                            "flex items-center rounded-lg text-secondary-800 hover:text-secondary-500 transition-all duration-200 py-2 px-3 text-sm",
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
              className={clsx(
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
