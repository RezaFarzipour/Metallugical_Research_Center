"use client";
import { Card } from "@heroui/react";
import React, { useState } from "react";
import { ImageContainer } from "./ImageContainer";
import { CardContent } from "./CardContent";
import clsx from "clsx";
import { cn } from "@/utils/cn";
interface ReserveDate {
  id: number;
  reserved_from: string;
  reserved_to: string;
  service: number;
}
type DataItem = {
  id: number;
  name: string;
  service_name?: string;
  description: string;
  image?: string;
  cover_image?: string;
  date?: string;
  dateRange?: string;
  "service-reserve_date"?: ReserveDate[];
};
type Props = {
  data: DataItem[];
  isDate?: boolean;
  widthConter: string;
  heightImg: string;
  isMoreDetails?: string;
  heightConter: string;
  view?: boolean;
  styleForAdmin: boolean;
};

const CardModule = ({
  data,
  isDate,
  isMoreDetails,
  widthConter,
  heightImg,
  heightConter,
  view = true,
  styleForAdmin,
}: Props) => {
  const [hoveredArticleId, setHoveredArticleId] = useState<number | null>(null);

  const cardStyles = {
    cardsBox: clsx(
      "w-full max-w-[600px] mb-48 col-span-12 sm:col-span-5 relative overflow-visible group"
    ),
    cardsList: "w-full max-w-[800px] max-h-[250px] flex flex-col md:flex-row ",
  };

  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className={cn(
            "flex justify-center items-center",
            view ? "min-h-[18rem]" : "min-h-[18rem]"
          )}
        >
          <Card
            className={cn(view ? cardStyles.cardsBox : cardStyles.cardsList)}
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
              {...item}
              reserve_date={item["service-reserve_date"]}
              isDate={isDate}
              isMoreDetails={isMoreDetails}
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
