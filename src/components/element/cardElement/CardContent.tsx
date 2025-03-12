import { SlCalender } from "react-icons/sl";
import { InfoItem } from "./InfoItem";
import { CgProfile } from "react-icons/cg";
import { Button } from "@heroui/button";
import HoverIcon from "../ArrowIconEndContent";
import React from "react";

interface CardContentProps {
  publishedDate: string; // Adjust type as necessary
  author: string;
  articleTitle: string;
  description: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  publishedDate,
  author,
  articleTitle,
  description,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 p-4 absolute left-1/2 -translate-x-1/2 bottom-[-120px] bg-[#ffffff] w-[95%] xs:h-[230px] sm:h-[250px] rounded-xl shadow-lg transition-transform duration-300 ease-out group-hover:translate-y-[-10px] ">
      <div className="flex justify-start gap-5">
        <InfoItem
          icon={<SlCalender />}
          text={JSON.parse(JSON.stringify(publishedDate))}
        />
        <InfoItem icon={<CgProfile />} text={author} />
      </div>
      <h4 className="font-extrabold text-nowrap text-2xl">{articleTitle}</h4>
      <h6 className="font-light text-wrap text-justify">{description}</h6>
      <div className="mb-5">
        <Button
          className={`data-[hover]:bg-transparent data-[hover]:text-secondary-500 ${
            isHovered ? "bg-gray-200" : ""
          }`}
          variant="light"
          size="md"
          endContent={<HoverIcon isHovered={isHovered} />}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          مشاهده ی مقاله
        </Button>
      </div>
    </div>
  );
};
