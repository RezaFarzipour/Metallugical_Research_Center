import ClipedDrawer from "@/components/containers/ClipedDrawer";
import { userSidebarlinks } from "@/constants/data";
import React from "react";

type DashboardProps = {
  children: React.ReactNode;
};

const Dashboardlayout = ({ children }: DashboardProps) => {
  return <ClipedDrawer sideBarData={userSidebarlinks}>{children}</ClipedDrawer>;
};

export default Dashboardlayout;
