"use client";
import { Card } from "@heroui/react";
import React, { useState } from "react";

import { twMerge } from "tailwind-merge";
import { ImageContainer } from "./ImageContainer";
import { CardContent } from "./CardContent";

export type latestArticleType = {
  id: number;
  image: string;
  date: string;
  author: string;
  articleTitle: string;
  description: string;
};

type Props = {
  data: latestArticleType[];
  widthConter: string;
  heightImg: string;
  heightConter: string;
  view?: boolean;
};

const CardModule = ({
  data,
  widthConter,
  heightImg,
  heightConter,
  view = true,
}: Props) => {
  const [hoveredArticleId, setHoveredArticleId] = useState<number | null>(null);

  const cardStyles = {
    cardsBox: ` w-full max-w-[600px] h-[${heightImg}] col-span-12 sm:col-span-5 relative overflow-visible group`,
    cardsList: `w-full max-w-[900px]  flex flex-col md:flex-row  h-[300px]  group `,
  };
  return (
    <>
      {data.map((article: latestArticleType) => (
        <div
          key={article.id}
          className={`flex justify-center items-center ${
            view ? "min-h-[28rem]" : "min-h-[20rem]"
          }`}
        >
          <Card
            className={twMerge(
              view ? cardStyles.cardsBox : cardStyles.cardsList
            )}
          >
            <ImageContainer
              image={article.image}
              isHovered={hoveredArticleId === article.id}
              setIsHovered={(isHovered) =>
                setHoveredArticleId(isHovered ? article.id : null)
              }
              view={view}
            />

            <CardContent
              date={article.date}
              author={article.author}
              articleTitle={article.articleTitle}
              description={article.description}
              widthConter={widthConter}
              heightConter={heightConter}
              view={view}
            />
          </Card>
        </div>
      ))}
    </>
  );
};

export default CardModule;
