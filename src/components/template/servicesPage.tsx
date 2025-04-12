"use client";

import React from "react";
import TitleStructure from "../element/TitleStructure";
import SectionWrapper from "@/hoc/SectionWrapper";
import FilteredContainer from "../containers/FilteredContainer";
import { products } from "@/constants/tableData";
import { useTableStore } from "@/store/useTableSlice";
import { useFilteredContainer } from "@/hooks/useFilteredContainer";
import CardModule from "../module/CardModule";

const Services: React.FC = () => {
  const { view } = useTableStore();
  const { sortedItems } = useFilteredContainer(products);

  return (
    <div className="container flex flex-col items-center justify-center gap-5 max-w-screen-lg pt-72">
      <h3 className="flex text-xl">
        <TitleStructure size="1rem">خدمات  ما </TitleStructure>
      </h3>

      <div className="flex flex-col gap-36 lg:gap-5 lg:flex-row justify-center w-full items-center p-4">
        <FilteredContainer
          users={products}
          quantity="خدمات  ما "
          viewContent
          viewContentSmSize
          topContents
          bottomContents
          btn={false}
          dropDownBtn={false}
          roles={false}
          product={false}
        >
          <div
            className={`grid grid-cols-1 ${
              view ? "sm:grid-cols-2 lg:grid-cols-3" : ""
            } gap-4 mt-10 mb-32`}
            style={{ width: "1200px" }} // Fixed width added here
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
