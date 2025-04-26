"use client";
import { Card } from "@heroui/react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ImageContainer } from "./ImageContainer";
import { CardContent } from "./CardContent";
import clsx from "clsx";

type Props = {
  data: [];
  isDate: boolean;
  widthConter: string;
  heightImg: string;
  moreDetailsHref?: string;
  heightConter: string;
  view?: boolean;
  styleForAdmin: boolean;
};

const CardModule = ({
  data,
  isDate,
  moreDetailsHref,
  widthConter,
  heightImg,
  heightConter,
  view = true,
  styleForAdmin,
}: Props) => {
  const [hoveredArticleId, setHoveredArticleId] = useState<number | null>(null);

  const cardStyles = {
    cardsBox: clsx(
      "w-full max-w-[600px] col-span-12 sm:col-span-5 relative overflow-visible group"
    ),
    cardsList: "w-full max-w-[900px] flex flex-col md:flex-row group",
  };

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
            style={view ? { height: heightImg } : { height: "auto" }}
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
              styleForAdmin={styleForAdmin}
            />
          </Card>
        </div>
      ))}
    </>
  );
};

export default CardModule;
