import { Card } from "@heroui/react";
import React, { useState } from "react";
import { ImageContainer } from "./ImageContainer";
import { CardContent } from "./CardContent";

export type latestArticleType = {
  id: number;
  image: string;
  date: Date;
  author: string;
  articleTitle: string;
  description: string;
};

type Props = {
  data: latestArticleType[];
  widthConter: string;
  heightImg: string;
  heightConter: string;
};

const CardElement = ({ data, widthConter, heightImg, heightConter }: Props) => {
  const [hoveredArticleId, setHoveredArticleId] = useState<number | null>(null);

  return (
    <>
      {data.map((article: latestArticleType) => (
        <div
          key={article.id}
          className="flex justify-center items-center min-h-[24rem]"
        >
          <Card
            className={`w-full max-w-[600px] h-[${heightImg}] col-span-12 sm:col-span-5 relative overflow-visible group`}
          >
            <ImageContainer
              image={article.image}
              isHovered={hoveredArticleId === article.id}
              setIsHovered={(isHovered) =>
                setHoveredArticleId(isHovered ? article.id : null)
              }
            />
            <CardContent
              date={article.date}
              author={article.author}
              articleTitle={article.articleTitle}
              description={article.description}
              widthConter={widthConter}
              heightConter={heightConter}
            />
          </Card>
        </div>
      ))}
    </>
  );
};

export default CardElement;
