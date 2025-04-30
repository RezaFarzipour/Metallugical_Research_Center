"use client";

import React from "react";
import TitleStructure from "../element/TitleStructure";
import SectionWrapper from "@/hoc/SectionWrapper";
import FilteredContainer from "../containers/FilteredContainer";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import CardModule from "../module/cardModule/CardModule";
import { useQuery } from "@tanstack/react-query";
import { getAllServiceCustomer } from "@/services/api/service";

const Services: React.FC = () => {
  const { view } = useTableStore();
  const { data, isPending } = useQuery({
    queryKey: ["getAll-servicesCustomer"],
    queryFn: getAllServiceCustomer,
  });

  // گرفتن آرایه‌ی سرویس‌ها از formData
  const formDataServices = Array.isArray(data) ? data : [];
  const { sortedItems } = useFilteredContainer(formDataServices);

  return (
    <div className="container flex flex-col items-center justify-center gap-5 max-w-screen-lg pt-72">
      <h3 className="flex text-xl">
        <TitleStructure size="1rem">خدمات ما </TitleStructure>
      </h3>

      <div className="flex flex-col gap-36 lg:gap-5 lg:flex-row justify-center w-full items-center p-4">
        <FilteredContainer
          datas={formDataServices}
          quantity="سرویس ها "
          topContents={true}
          viewContent={true}
          viewContentSmSize={false}
          btn={false}
          dropDownBtn={false}
          roles={false}
          addBtn={false}
          rolesDropDown={false}
          stausDropDown={false}
          bottomContents={true}
        >
          <div
            className={`grid grid-cols-1 ${
              view ? "sm:grid-cols-2 lg:grid-cols-3" : ""
            } gap-4 mt-10 mb-32`}
            style={{ width: "1200px" }}
          >
            <CardModule
              data={sortedItems}
              widthConter="100%"
              heightImg="300px"
              heightConter="350px"
              view={view}
            />
          </div>
        </FilteredContainer>
      </div>
    </div>
  );
};

export default SectionWrapper(Services, "Services-Card");
