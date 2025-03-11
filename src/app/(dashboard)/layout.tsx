import ClipedDrawer from "@/components/layout/containers/ClipedDrawer";
import React from "react";

type DashboardProps = {
  children: React.ReactNode;
};

const Dashboardlayout = ({ children }: DashboardProps) => {
  return <ClipedDrawer>{children}</ClipedDrawer>;
};

export default Dashboardlayout;
