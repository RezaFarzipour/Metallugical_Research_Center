"use client";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/react";
import SideBar from "./SideBar";
import DrawerElement from "@/components/element/DrawerElement";
import { useGetUser } from "@/hooks/useAuth";
import { UserProfileResponse } from "@/types";

function Header({}) {
  const { data, isPending } = useGetUser();

  // اگر response وجود داشت، دیتا رو بگیر؛ وگرنه null باشه
  const user: UserProfileResponse[] | null = data?.response?.data ?? null;

  // چک کردن وجود user قبل از دسترسی به آن
  const fullName = user ? `${user[0].first_name} ${user[0].last_name}` : "";

  return (
    <header
      className={`bg-secondary-0 ${isPending ? "bg-opacity-30 blur-md" : ""}`}
    >
      <div className="flex items-center justify-between py-5 px-4 lg:px-8">
        <div className="flex items-center">
          <div className="flex justify-center items-center ">
            <DrawerElement>
              {(onClose) => <SideBar onClose={onClose} />}
            </DrawerElement>
            <span className="text-sm lg:text-lg font-bold text-secondary-700">
              سلام؛ {fullName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-x-3">
          <Link href="/profile">
            <Button
              isIconOnly
              className={`border-secondaray-200 rounded-2xl flex cursor-pointer items-center`}
            >
              <Avatar src="/images/user.png" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
