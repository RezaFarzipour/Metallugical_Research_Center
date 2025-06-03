import { BlogData } from "@/types";
import Image from "next/image";
import React from "react";

const BlogDetailsPage = ({ dataByID }: { dataByID: BlogData }) => {
  const contentRender = dataByID[`blog-content`][0].content;

  const BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? "http://localhost:8000";

  let tagsArray: string[] = [];

  try {
    if (Array.isArray(dataByID.tags) && typeof dataByID.tags[0] === "string") {
      tagsArray = JSON.parse(dataByID.tags[0]); // چون به صورت استرینگ داخل آرایه هست
    }
  } catch (err) {
    console.error("Error parsing tags:", err);
  }

  const getValidImageSrc = (src: string | undefined): string => {
    if (!src) return "/fallback.jpg";
    if (src.startsWith("http") || src.startsWith("/")) return src;
    return `${BASE_URL}/${src}`;
  };

  return (
    <>
      {/* اطلاعات سرویس */}
      <div className="flex w-full justify-around items-center  p-4  flex-row space-y-6 ">
        <div className="flex pt-5 items-center justify-center space-x-4 rtl:space-x-reverse">
          <div className="relative w-16 h-16">
            <Image
              className="rounded-full object-cover"
              alt={dataByID.cover_image}
              fill
              src={getValidImageSrc(dataByID.cover_image)}
            />
          </div>
          <h2 className="text-2xl font-bold text-default-400">
            {dataByID.title}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <ServiceInfo title="اسلاگ" content={dataByID.slug} />

          <ServiceInfo title="تگ ها" content={tagsArray} />
        </div>
      </div>

      <div className="max-w-screen-xl my-20 px-6 py-12 shadow-[0_0_20px_rgba(55,124,251,0.1),0_0_40px_rgba(55,124,251,0.05)] min-h-screen flex justify-center items-center mx-auto">
        <div
          className="blogUl__disc blogUl__decimal"
          dangerouslySetInnerHTML={{ __html: contentRender }}
        />
      </div>
    </>
  );
};

export default BlogDetailsPage;

const ServiceInfo = ({
  title,
  content,
}: {
  title: string;
  content: string | string[];
}) => (
  <div className="flex items-center gap-4">
    <h2 className="font-bold text-xl text-default-400">{title}:</h2>
    <p className="text-secondary-700 pr-2">{content}</p>
  </div>
);
