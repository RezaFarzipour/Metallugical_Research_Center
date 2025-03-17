"use client";

import { LatestArticles } from "@/constants/data";
import { latestArticleType } from "@/types";
import React, { useState } from "react";
import TitleStructure from "../element/TitleStructure";
import SectionWrapper from "@/hoc/SectionWrapper";
import { Card } from "@heroui/card";
import { ImageContainer } from "../element/cardElement/ImageContainer";
import { CardContent } from "../element/cardElement/CardContent";

const BlogCardModule = () => {
  const [hoveredArticleId, setHoveredArticleId] = useState<number | null>(null);

  return (
    <div className="full-w flex flex-col items-center justify-center gap-5 py-16 lg:py-6">
      <h3 className="flex text-xl">
        <TitleStructure size="1rem"> وبلاگ های ما </TitleStructure>
      </h3>

      <h2 className="font-extrabold text-2xl text-wrap">
        نگاهی به آخرین مقالات ما بندازید.
      </h2>

      <div className="flex flex-col gap-36 lg:gap-5 lg:flex-row justify-center w-full items-center p-4 ">
        {LatestArticles.map((article: latestArticleType) => (
          <div key={article.id} className="flex justify-center items-center">
            <Card className="w-full max-w-[600px] h-[400px] col-span-12 sm:col-span-5 relative overflow-visible group">
              <ImageContainer
                image={article.image}
                isHovered={hoveredArticleId === article.id}
                setIsHovered={(isHovered) =>
                  setHoveredArticleId(isHovered ? article.id : null)
                }
              />
              <CardContent
                publishedDate={article.publishedDate.toISOString()}
                author={article.author}
                articleTitle={article.articleTitle}
                description={article.description}
              />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(BlogCardModule, "Blog-Card");
