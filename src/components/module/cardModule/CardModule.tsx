import React, { useState } from "react";
import { Card } from "@heroui/react";
import { ImageContainer } from "./ImageContainer";
import { CardContent } from "./CardContent";
import { cn } from "@/utils/cn";
import {
  ServerServiceType,
  ServiceDetailsType,
  ServiceReserveDateType,
} from "@/types/serviceType";
import { BlogType, ExpiredReserveItem } from "@/types";

type CardData =
  | ServerServiceType
  | BlogType
  | ServiceDetailsType
  | ExpiredReserveItem;

type Props<T extends CardData> = {
  data: T[];
  isDate?: boolean;
  widthConter: string;
  heightImg: string;
  isMoreDetails?: string;
  heightConter: string;
  view?: boolean;
  styleForAdmin: boolean;
  bottomOffset: string;
};

const CardModule = <T extends CardData>({
  data,
  isMoreDetails,
  widthConter,
  heightImg,
  heightConter,
  view = true,
  styleForAdmin,
  bottomOffset,
}: Props<T>) => {
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);

  const cardStyles = {
    cardsBox: cn(
      "w-full max-w-[600px] mb-32 mt-8 col-span-12 sm:col-span-5 relative overflow-visible group"
    ),
    cardsList:
      "w-full max-w-[800px] min-h-[220px] md:max-h-[220px] flex flex-col md:flex-row ",
  };

  let parsedTags: string[] = [];

  const getItemId = (item: CardData): string | number => {
    if ("id" in item && item.id !== undefined) return item.id;
    if ("data" in item && item.data?.id !== undefined) return item.data.id;
    return Math.random();
  };

  return (
    <>
      {data.map((item) => {
        if ("tags" in item && item.tags) {
          const tagValue = Array.isArray(item.tags) ? item.tags[0] : item.tags;
          parsedTags = JSON.parse(tagValue);
        }
        const image =
          "cover_image" in item
            ? item.cover_image
            : "coverImage" in item
            ? item.coverImage
            : "image" in item
            ? item?.image
            : undefined;

        return (
          <div
            key={getItemId(item)}
            className={cn(
              "flex justify-center items-center ",
              view ? "min-h-[16rem]" : "min-h-[14rem]"
            )}
          >
            <Card
              className={cn(view ? cardStyles.cardsBox : cardStyles.cardsList)}
              style={view ? { height: heightImg } : { height: "auto" }}
            >
              <ImageContainer
                image={image}
                isHovered={hoveredId === getItemId(item)}
                setIsHovered={(isHovered) =>
                  setHoveredId(isHovered ? getItemId(item) : null)
                }
                view={view}
              />

              <CardContent
                parsedTags={parsedTags}
                {...item}
                reserve_date={
                  "service-reserve_date" in item
                    ? (item["service-reserve_date"] as ServiceReserveDateType[])
                    : undefined
                }
                isMoreDetails={isMoreDetails}
                widthConter={widthConter}
                heightConter={heightConter}
                view={view}
                styleForAdmin={styleForAdmin}
                bottomOffset={bottomOffset}
              />
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default CardModule;
