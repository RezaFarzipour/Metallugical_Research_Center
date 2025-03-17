import TitleStructureDashboards from "@/components/element/TitleStructureDashboards";
import TableModule from "@/components/module/TableModule";
import MiniCardModule from "@/components/module/panel/shared/MiniCardModule";
import { adminCards } from "@/constants/data";
import { DashboardMinicardProps } from "@/types";
import React from "react";
import { CgArrowLeft } from "react-icons/cg";

interface HomePageProps {
  cards: DashboardMinicardProps[];
}
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards mainTitle="سوابق من" />
        <MiniCardModule cards={adminCards} />
      </div>

      <div className="bg-white rounded-sm shadow-md p-4 md:p-6">
        <TitleStructureDashboards
          mainTitle="گزارش های اخیر"
          viewMore="مشاهده همه سفارش ها"
          icon={<CgArrowLeft />}
        />
        <TableModule />
      </div>
    </div>
  );
};

export default HomePage;
