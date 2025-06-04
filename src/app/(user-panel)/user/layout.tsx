"use client";

import Header from "@/components/containers/clipedDrawer/Header";
import SideBar from "@/components/containers/clipedDrawer/SideBar";
import { userSidebarlinks } from "@/constants/data";
import { useGetUser } from "@/hooks/useAuth";
import React from "react";

type DashboardProps = {
  children: React.ReactNode;
};

const Dashboardlayout = ({ children }: DashboardProps) => {
  const { isPending, data } = useGetUser();
  return (
    <div className="bg-secondary-0">
      <div className="grid grid-cols-12 h-screen">
        <aside className="col-span-12 lg:col-span-3 xl:col-span-2 hidden lg:block">
          <SideBar
            user={data}
            navLinkData={userSidebarlinks}
            path={"/user/myProfile"}
          />
        </aside>
        <div className="col-span-12 lg:col-span-9 xl:col-span-10 h-screen flex flex-col">
          <Header data={data} isPending={isPending} warningBadge={false} />
          <main className="bg-default-50 rounded-tr-xl p-4 md:p-6 lg:p-10 flex-1 overflow-y-auto">
            <div className="xl:max-w-screen-xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboardlayout;
