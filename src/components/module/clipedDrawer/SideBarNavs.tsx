import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NavLinkItem } from "@/types";

interface SideBarNavsProps {
  onClose?: () => void;
  navLinkData: NavLinkItem[] | undefined;
}

export default function SideBarNavs({
  onClose,
  navLinkData,
}: SideBarNavsProps) {
  const pathname = usePathname();

  return (
    <ul className="space-y-2">
      {navLinkData?.map((nav) => {
        const isActive = pathname === nav.to;

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
