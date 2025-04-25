"use client";
import { Card } from "@heroui/react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ImageContainer } from "./ImageContainer";
import { CardContent } from "./CardContent";

type Props = {
  data: [];
  isDate: boolean;
  widthConter: string;
  heightImg: string;
  moreDetailsHref?: string;
  heightConter: string;
  view?: boolean;
};

const CardModule = ({
  data,
  isDate,
  moreDetailsHref,
  widthConter,
  heightImg,
  heightConter,
  view = true,
}: Props) => {
  const [hoveredArticleId, setHoveredArticleId] = useState<number | null>(null);
  console.log("adqawd", data);

  const cardStyles = {
    cardsBox: ` w-full max-w-[600px] h-[${heightImg}] col-span-12 sm:col-span-5 relative overflow-visible group`,
    cardsList: `w-full max-w-[900px]  flex flex-col md:flex-row  h-[300px]  group `,
  };
  console.log("adwawd", data);

  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
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
              image={item.image || item.cover_image}
              isHovered={hoveredArticleId === item.id}
              setIsHovered={(isHovered) =>
                setHoveredArticleId(isHovered ? item.id : null)
              }
              view={view}
            />

            <CardContent
              isDate={isDate}
              date={item.date}
              moreDetailsHref={moreDetailsHref}
              name={item.name}
              description={item.description}
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
