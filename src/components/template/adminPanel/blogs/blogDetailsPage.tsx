import { BlogData } from "@/types";
import { Button } from "@heroui/button";
import Image from "next/image";
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const BlogDetailsPage = ({ dataByID }: { dataByID: BlogData }) => {
  const contentRender = dataByID[`blog-content`][0].content;

  let tagsArray: string[] = [];
  try {
    if (Array.isArray(dataByID.tags) && typeof dataByID.tags[0] === "string") {
      tagsArray = JSON.parse(dataByID.tags[0]); // چون به صورت استرینگ داخل آرایه هست
    }
  } catch (err) {
    console.error("Error parsing tags:", err);
  }

  const BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? "http://localhost:8000";

  const getValidImageSrc = (src: string | undefined): string => {
    if (!src) return "/fallback.jpg";
    if (src.startsWith("http") || src.startsWith("/")) return src;
    return `${BASE_URL}/${src}`;
  };

  return (
    <>
      <div className="w-full flex justify-between p-4 shadow-lg">
        {/* اطلاعات سرویس */}
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
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
          <ServiceInfo title="اسلاگ" content={dataByID.slug} />

          <ServiceInfo title="تگ ها" content={tagsArray} />
        </div>
        <div className="flex space-x-4 rtl:space-x-reverse">
          <Button
            //onPress={handleEdit}
            className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-secondary-500 to-secondary-700 hover:bg-blue-700 transition"
          >
            <FiEdit size={20} />
            <span className="hidden sm:inline">ویرایش</span>
          </Button>
          <Button
            //onPress={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-red-500 to-red-700 hover:bg-red-700 transition"
          >
            <FiTrash2 size={20} />
            <span className="hidden sm:inline">حذف</span>
          </Button>
        </div>
      </div>
      <div className="max-w-screen-lg min-h-screen flex justify-center items-center  mx-auto">
        <div dangerouslySetInnerHTML={{ __html: contentRender }} />
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
    <h2 className="font-bold text-default-400">{title}:</h2>
    <p className="text-secondary-700 pr-2">{content}</p>
  </div>
);
