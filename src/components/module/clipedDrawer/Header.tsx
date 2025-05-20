"use client";
import SideBar from "./SideBar";
import DrawerElement from "@/components/element/DrawerElement";
import { adminSidebarlinks } from "@/constants/data";

import { User } from "@/types";
import { getDayPart } from "@/utils/formatter/formatDateRangesToPersian";

type HeaderPropsType = {
  isPending: boolean;
  data: User;
};

function Header({ data, isPending }: HeaderPropsType) {
  const today = new Date().toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const fullName = data ? `${data.first_name} ${data.last_name}` : "";

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

        <div className="flex items-center gap-x-3 text-secondary-600 font-bold">
          {today}
        </div>
      </div>
    </header>
  );
}
export default Header;
