"use client";
import React from "react";
import CardModule from "../cardModule/CardModule";
import TitleStructure from "@/components/element/TitleStructure";
import { useVisibleCount } from "@/hooks/useVisibleCount";
import { motion } from "framer-motion";
import { fadeInSlide } from "@/utils/motion";
import { BlogType } from "@/types";
import Button from "@/components/element/Button";

type BlogsPropsType = {
  AllBlogs: BlogType[];
};

const Blogs = ({ AllBlogs }: BlogsPropsType) => {
  const visibleCount = useVisibleCount({ sm: 2, md: 2, lg: 3 });

  return (
    <div className="full-w flex flex-col items-center justify-center gap-5 py-16 lg:py-6">
      <h3 className="flex text-xl">
        <TitleStructure size="1rem"> وبلاگ های ما </TitleStructure>
      </h3>

      <h2 className="font-extrabold text-md md:text-2xl text-wrap">
        نگاهی به آخرین مقالات ما بندازید.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {AllBlogs.slice(0, visibleCount).map((item, index) => (
          <motion.div
            key={item.id}
            variants={fadeInSlide("up", "tween", index * 0.1, 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <CardModule<BlogType>
              data={[item]}
              widthConter="100%"
              heightImg="200px"
              heightConter="150px"
              bottomOffset="130"
              styleForAdmin={false}
              view
            />
          </motion.div>
        ))}
      </div>
      <Button variant="primary" type="submit" path="/blogs">
        مشاهده همه بلاگ ها ...
      </Button>
    </div>
  );
};

export default Blogs;
