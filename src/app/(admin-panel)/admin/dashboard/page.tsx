import DashboardPage from "@/components/template/adminPanel/dashboard/dashboardPage";
import { fetchCardData } from "@/components/template/adminPanel/dashboard/serverAction/data";
import React from "react";

const AdminDashboard = async () => {
  const data = await fetchCardData();

  return (
    <div>
      <DashboardPage cardsData={data} />
    </div>
  );
};

export default AdminDashboard;
