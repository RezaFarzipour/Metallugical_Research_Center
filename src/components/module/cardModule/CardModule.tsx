import React, { useState } from "react";
import { Card } from "@heroui/react";
import { ImageContainer } from "./ImageContainer";
import { CardContent } from "./CardContent";
import { cn } from "@/utils/cn";
import type { ServiceDetailsType, BlogType } from "@/types";

type CardData = ServiceDetailsType | BlogType;

type Props<T extends CardData> = {
  data: T[];
  isDate?: boolean;
  widthConter: string;
  heightImg: string;
  isMoreDetails?: string;
  heightConter: string;
  view?: boolean;
  styleForAdmin: boolean;
};

const CardModule = <T extends CardData>({
  data,
  isMoreDetails,
  widthConter,
  heightImg,
  heightConter,
  view = true,
  styleForAdmin,
}: Props<T>) => {
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);

  const cardStyles = {
    cardsBox: cn(
      "w-full max-w-[600px] mb-48 col-span-12 sm:col-span-5 relative overflow-visible group"
    ),
    cardsList: "w-full max-w-[800px] max-h-[250px] flex flex-col md:flex-row ",
  };

  let parsedTags: string[] = [];

  return (
    <>
      {data.map((item) => {
        if ("tags" in item && item.tags) {
          try {
            const tagValue = Array.isArray(item.tags)
              ? item.tags[0]
              : item.tags;
            parsedTags = JSON.parse(tagValue);
          } catch (e) {
            console.error("Invalid tags format:", item.tags);
          }
        }
        const image =
          "cover_image" in item
            ? item.cover_image
            : "coverImage" in item
            ? item.coverImage
            : "image" in item
            ? item!.image
            : undefined;

        return (
          <div
            key={item.id}
            className={cn(
              "flex justify-center items-center ",
              view ? "min-h-[18rem]" : "min-h-[18rem]"
            )}
          >
            <Card
              className={cn(view ? cardStyles.cardsBox : cardStyles.cardsList)}
              style={view ? { height: heightImg } : { height: "auto" }}
            >
              <ImageContainer
                image={image}
                isHovered={hoveredId === item.id}
                setIsHovered={(isHovered) =>
                  setHoveredId(isHovered ? item.id : null)
                }
                view={view}
              />

            

              <CardContent
              parsedTags={parsedTags}
                {...item}
                reserve_date={
                  "service-reserve_date" in item
                    ? item["service-reserve_date"]
                    : undefined
                }
                isMoreDetails={isMoreDetails}
                widthConter={widthConter}
                heightConter={heightConter}
                view={view}
                styleForAdmin={styleForAdmin}
              />
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default CardModule;
