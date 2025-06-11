"use client";

import React from "react";
import CardModule from "../cardModule/CardModule";
import TitleStructure from "@/components/element/TitleStructure";
import { useVisibleCount } from "@/hooks/useVisibleCount";
import { fadeInSlide, staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";
import { ServiceDetailsType } from "@/types";
import Button from "@/components/element/Button";

type LandingPageProps = {
  initialData: ServiceDetailsType[];
};
const Services = ({ initialData }: LandingPageProps) => {
  const visibleCount = useVisibleCount({ sm: 4, md: 4, lg: 6 });

  return (
    <motion.div
      className="full-w flex flex-col items-center justify-center gap-5 py-36 md:py-14 lg:py-4"
      variants={staggerContainer(0.2, 0.1)}
      initial="hidden"
      animate="show"
    >
      <h3 className="flex text-xl">
        <TitleStructure size="1rem">خدمات ها</TitleStructure>
      </h3>
      <h2 className="font-extrabold text-gray-700 text-md md:text-2xl text-wrap">
        نگاهی به خدمات ما بندازید.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {initialData.slice(0, visibleCount).map((item, index) => (
          <motion.div
            key={item.id}
            variants={fadeInSlide("up", "tween", index * 0.1, 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <CardModule<ServiceDetailsType>
              data={[item]}
              widthConter="100%"
              heightImg="300px"
              heightConter="200px"
              bottomOffset="160"
              isMoreDetails="anyServices"
              styleForAdmin={false}
              view
            />
          </motion.div>
        ))}
      </div>
      <div className="mt-8">
        <Button variant="primary" type="submit" path="/services">
          مشاهده همه خدمات ...
        </Button>
      </div>
    </motion.div>
  );
};

export default Services;
