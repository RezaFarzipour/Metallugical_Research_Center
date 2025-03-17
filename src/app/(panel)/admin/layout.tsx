import ClipedDrawer from "@/components/containers/ClipedDrawer";
import { adminSidebarlinks } from "@/constants/data";
import React from "react";

type DashboardProps = {
  children: React.ReactNode;
};

const Dashboardlayout = ({ children }: DashboardProps) => {
  return (
    <ClipedDrawer sideBarData={adminSidebarlinks}>{children}</ClipedDrawer>
  );
};

export default Dashboardlayout;
