"use client";
import SideBar from "./SideBar";
import DrawerElement from "@/components/element/DrawerElement";
import { adminSidebarlinks } from "@/constants/data";
import React from "react";
import { Badge } from "@heroui/react";
import { User } from "@/types";
import { getDayPart, today } from "@/utils/formatter/formatDateRangesToPersian";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import Link from "next/link";
import useExpiredReserveStore from "@/store/useExpiredReserveStore";

type HeaderPropsType = {
  isPending: boolean;
  data: User;
};

function Header({ data, isPending }: HeaderPropsType) {
  const fullName = data ? `${data.first_name} ${data.last_name}` : "";
  const { expiredReserveDates } = useExpiredReserveStore();


  return (
    <header
      className={`bg-secondary-0 ${isPending ? "bg-opacity-30 blur-md" : ""}`}
    >
      <div className="flex items-center justify-between py-5 px-4 lg:px-8">
        <div className="flex items-center">
          <div className="flex justify-center items-center ">
            <DrawerElement>
              {(onClose) => (
                <SideBar
                  path={"/admin/userProfile"}
                  navLinkData={adminSidebarlinks}
                  user={data}
                  onClose={onClose}
                />
              )}
            </DrawerElement>
            <span className="text-sm lg:text-lg font-bold text-secondary-700">
              سلام؛ {fullName}&nbsp;
            </span>
            <span className="text-sm lg:text-md font-bold text-secondary-300">
              | {getDayPart()} بخیر{" "}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-secondary-700">
          <Link href="/admin/warning">
            <Badge
              color="danger"
              content={expiredReserveDates.length}
              shape="rectangle"
            >
              <IoNotificationsCircleOutline
                className="fill-current"
                size={30}
              />
            </Badge>
          </Link>

          <div className="flex items-center gap-x-3 text-secondary-600 font-bold">
            {today}
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
