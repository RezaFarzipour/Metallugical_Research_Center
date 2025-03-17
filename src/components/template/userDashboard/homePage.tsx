import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import TableModule from "@/components/module/TableModule";
import MiniCardModule from "@/components/module/userDashboard/MiniCardModule";
import React from "react";
import { CgArrowLeft } from "react-icons/cg";

const HomePage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="سوابق من" />
        <MiniCardModule />
      </div>

      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards
          mainTitle="آخرین سفارش های من"
          viewMore="مشاهده همه سفارش ها"
          icon={<CgArrowLeft />}
        />
        <TableModule />
      </div>
    </div>
  );
};

export default HomePage;
