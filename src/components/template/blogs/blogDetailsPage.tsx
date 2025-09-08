import { showToast } from "@/store/useToastSlice";
import { BlogData } from "@/types";
import Image from "next/image";
import React from "react";

const BlogDetailsPage = ({ dataByID }: { dataByID: BlogData }) => {
  const contentRender = dataByID[`blog-content`][0].content;

  let tagsArray: string[] = [];

  try {
    if (Array.isArray(dataByID.tags) && typeof dataByID.tags[0] === "string") {
      tagsArray = JSON.parse(dataByID.tags[0]); // چون به صورت استرینگ داخل آرایه هست
    }
  } catch (error: any) {
    const errorMessage = error?.message || "خطا در پردازش تگ‌ها";
    showToast(errorMessage, "error");
  }

  const getValidImageSrc = (src?: string): string => {
    if (!src) return "/fallback.jpg";

    const BASE_URL =
      process.env.NEXT_PUBLIC_IMAGE_BASE_URL ??
      "https://metallugy.runflare.run/media";

    // اگر URL کامل بود
    if (src.startsWith("http")) {
      const isLocal = src.includes("localhost") || src.includes("127.0.0.1");
      if (isLocal) {
        const cleanPath = src.split("/cover_image/")[1] ?? "";
        return `${BASE_URL.replace(/\/$/, "")}/cover_image/${cleanPath}`;
      }
      return src.replace("http://", "https://");
    }

    // اطمینان از وجود /media فقط در صورتی که BASE_URL آن را ندارد
    const needsMediaPrefix =
      !BASE_URL.endsWith("/media") && !src.startsWith("/media");

    const finalPath: string = needsMediaPrefix
      ? `/media${src.startsWith("/") ? src : `/${src}`}`
      : src.startsWith("/")
      ? src
      : `/${src}`;

    return `${BASE_URL.replace(/\/$/, "")}${finalPath}`;
  };

  return (
    <>
      {/* اطلاعات سرویس */}
      <div className="flex w-full justify-around items-center  p-4  flex-row space-y-6 ">
        <div className="flex pt-5 items-center justify-center space-x-4 rtl:space-x-reverse">
          <div className="relative w-16 h-16">
            <Image
              className="rounded-md object-cover"
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
          <ServiceInfo title="تگ ها" content={tagsArray.join(", ")} />
        </div>
      </div>

      <div className="max-w-screen-xl my-12 px-6 py-12 shadow-[0_0_20px_rgba(55,124,251,0.1),0_0_40px_rgba(55,124,251,0.021)] min-h-screen flex justify-center items-center mx-auto">
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
