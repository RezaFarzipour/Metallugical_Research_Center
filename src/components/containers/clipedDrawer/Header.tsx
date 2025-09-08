"use client";
import SideBar from "./SideBar";
import DrawerElement from "@/components/element/DrawerElement";
import React from "react";
import { Badge } from "@heroui/react";
import { NavLinkItem, User } from "@/types";
import { getDayPart, today } from "@/utils/formatter/formatDateRangesToPersian";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import Link from "next/link";
import useExpiredReserveStore from "@/store/useExpiredReserveStore";
import { toPersianNumbers } from "@/utils/formatter/toPersianNumbers";

type HeaderPropsType = {
  isPending: boolean;
  data: User;
  warningBadge: boolean;
  sidebarData?: NavLinkItem[];
  path: string;
};

function Header({
  data,
  isPending,
  warningBadge,
  sidebarData,
  path,
}: HeaderPropsType) {
  const fullName = data ? `${data.first_name} ${data.last_name}` : "";
  const { expiredReserveDates } = useExpiredReserveStore();

  return (
    <header
      className={`bg-secondary-0 ${isPending ? "bg-opacity-30 blur-md" : ""}`}
    >
      <div className="flex items-center justify-between py-5 px-4 lg:px-8">
        <div className="flex items-center">
          <div className="flex justify-center items-center text-nowrap">
            <DrawerElement>
              {(onClose) => (
                <SideBar
                  path={path}
                  navLinkData={sidebarData}
                  user={data}
                  onClose={onClose}
                />
              )}
            </DrawerElement>
            <span className="text-[12px] md:text-[16px] font-bold text-secondary-700">
              سلام؛ {fullName}&nbsp;
            </span>
            <span className="hidden text-[12px] md:text-[16px] font-bold text-secondary-300">
              | {getDayPart()} بخیر{" "}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-secondary-700">
          {warningBadge && expiredReserveDates.length > 0 && (
            <Link href="/admin/expiredReserve" className="mt-1">
              <Badge
                color="warning"
                content={toPersianNumbers(expiredReserveDates.length)}
                shape="circle"
                style={{ color: "#444" }}
                className="text-[10px] md:text-[14px] px-1 md:px-2"
              >
                <IoNotificationsCircleOutline
                  className="fill-current block md:hidden"
                  size={22}
                />
                {/* توی دسکتاپ سایز بزرگ‌تر */}
                <IoNotificationsCircleOutline
                  className="hidden md:block fill-current"
                  size={30}
                />
              </Badge>
            </Link>
          )}

          <div className="flex items-center gap-x-3 text-secondary-600  text-[12px] md:text-[16px] font-bold text-nowrap">
            {today}
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
