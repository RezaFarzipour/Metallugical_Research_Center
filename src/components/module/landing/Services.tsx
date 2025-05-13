"use client";

import { LatestArticles } from "@/constants/data";
import React from "react";
import CardModule from "../cardModule/CardModule";
import TitleStructure from "@/components/element/TitleStructure";
import { useVisibleCount } from "@/hooks/useVisibleCount";

const Services = () => {
  const visibleCount = useVisibleCount({ sm: 4, md: 4, lg: 6 });

  return (
    <div className="full-w flex flex-col items-center justify-center gap-5 py-16 lg:py-6">
      <h3 className="flex text-xl">
        <TitleStructure size="1rem">خدمات ها</TitleStructure>
      </h3>

      <h2 className="font-extrabold text-2xl text-wrap">
        نگاهی به خدمات های ما بندازید.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {LatestArticles.slice(0, visibleCount).map((item) => (
          <CardModule
            key={item.id}
            data={[item]}
            widthConter="100%"
            heightImg="250px"
            heightConter="250px"
            styleForAdmin={false}
            view
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
