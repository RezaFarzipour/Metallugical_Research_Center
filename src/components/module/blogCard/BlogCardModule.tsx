import CardModule from "@/components/element/CardModule";
import { LatestArticles } from "@/constants/data";
import { latestArticleType } from "@/types";
import React from "react";
import { SlChemistry } from "react-icons/sl";

const BlogCardModule = () => {
  return (
    <div className="full-w flex flex-col items-center justify-center gap-5 py-16 lg:py-6">
      <h3 className="flex text-xl">
        وبلاگ های ما <SlChemistry size={"20px"} />
      </h3>

      <h2 className="font-extrabold text-2xl text-wrap">
        نگاهی به آخرین مقالات ما بندازید.
      </h2>

      <div className="flex flex-col gap-36 lg:gap-5 lg:flex-row  justify-center w-full items-center p-4 ">
        {LatestArticles.map((article: latestArticleType) => (
          <>
            <CardModule key={article.id} {...article} />
          </>
        ))}
      </div>
    </div>
  );
};

export default BlogCardModule;
