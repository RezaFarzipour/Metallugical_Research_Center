"use client";

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
import { useRouter } from "next/navigation";

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
  useMaxWidth?: boolean;
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
  useMaxWidth,
}: Props<T>) => {
  const [hoveredId, setHoveredId] = useState<number | string | null>(null);
  const router = useRouter();
  const cardStyles = {
    cardsBox: cn(
      "w-full mb-32 mt-8 col-span-12 sm:col-span-5 relative overflow-visible group",
      useMaxWidth ? "max-w-[350px]" : "min-w-[350px]"
    ),
    cardsList:
      "w-full max-w-[800px] min-h-[220px] md:max-h-[220px] flex flex-col md:flex-row ",
  };

  const getItemId = (item: CardData): string | number => {
    if ("id" in item && item.id !== undefined) return item.id;
    if ("data" in item && item.data?.id !== undefined) return item.data.id;
    return Math.random();
  };

  const getDetailsHref = (
    type?: string,
    id: string | number = "",
    slug?: string
  ) => {
    switch (type) {
      case "adminBlogs":
        return `/admin/blogs/${id}/details`;
      case "adminServices":
        return `/admin/services/${id}/details`;
      case "adminCourses":
        return `/admin/courses/${id}/details`;
      case "anyBlogs":
        return `/blogs/${slug || "no-slug"}/${id}`;
      case "anyServices":
        return `/services/${id}/details`;
      case "anyCourses":
        return `/courses/${id}/details`;
      default:
        return "/";
    }
  };

  return (
    <>
      {data.map((item) => {
        let parsedTags: string[] = [];
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
            ? item.image
            : undefined;

        const resolvedId =
          "service_id" in item && item.service_id
            ? item.service_id
            : "id" in item && item.id !== undefined
            ? item.id
            : "data" in item && item.data?.id !== undefined
            ? item.data.id
            : Math.random(); // fallback اگر هیچ id نداشت

        const MoreDetailsHref = getDetailsHref(
          isMoreDetails,
          resolvedId,
          "slug" in item ? item.slug : undefined
        );

        return (
          <div
            key={getItemId(item)}
            className={cn(
              "flex justify-center items-center ",
              view ? "min-h-[16rem]" : "min-h-[14rem]"
            )}
            onClick={() => {
              if (typeof window !== "undefined" && window.innerWidth < 768) {
                router.push(MoreDetailsHref);
              }
            }}
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
                widthConter={widthConter}
                heightConter={heightConter}
                view={view}
                styleForAdmin={styleForAdmin}
                bottomOffset={bottomOffset}
                MoreDetailsHref={MoreDetailsHref}
                isHovered={hoveredId === getItemId(item)}
                setIsHovered={(hover) =>
                  setHoveredId(hover ? getItemId(item) : null)
                }
              />
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default CardModule;
