"use client";
import React from "react";
import { Card, Button } from "@heroui/react";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { MdArrowOutward } from "react-icons/md";
import { latestArticleType } from "@/types";

const CardModule = ({
  image,
  publishedDate,
  author,
  articleTitle,
  description,
}: latestArticleType) => {
  return (
    <div className=" flex justify-center items-center">
      <Card className=" w-full max-w-[600px] h-[400px] col-span-12 sm:col-span-5  relative overflow-visible group">
        <Image
          width={500}
          height={500}
          alt="Card example background"
          className="rounded-2xl w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 "
          src={image}
        />

        <div className="flex flex-col gap-4 p-4 absolute left-1/2 -translate-x-1/2 bottom-[-120px] bg-[#ffffff] w-[95%] xs:h-[230px]   sm:h-[250px]  rounded-2xl shadow-lg transition-transform duration-300 ease-out group-hover:scale-105 ">
          <div className="flex justify-start gap-5">
            <div className="flex gap-2">
              <SlCalender />
              <h4>{JSON.parse(JSON.stringify(publishedDate))}</h4>
            </div>
            <div className="flex gap-2">
              <CgProfile />
              <h4> {author}</h4>
            </div>
          </div>

          <h4 className="font-extrabold text-nowrap text-2xl">
            {articleTitle}
          </h4>

          <h6 className="font-light text-wrap text-justify">{description}</h6>

          <div className="mb-5">
            <Button
              className="hover:bg-red-500 "
              variant="ghost"
              size="md"
              endContent={<MdArrowOutward />}
            >
              مشاهده ی مقاله
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardModule;
