"use client";
import { useState } from "react";
import Image from "next/image";

interface CarGalleryProps {
  images?: string[]; // آرایه رشته‌ای اختیاری
}

export default function CarGallery({ images }: CarGalleryProps) {
  const imgs: string[] =
    images && images.length > 0 ? images : ["/images/5167172.jpg"];

  const [currentImage, setCurrentImage] = useState<string>(imgs[0]);

  const changeImage = (direction: number) => {
    const currentIndex = imgs.indexOf(currentImage);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = imgs.length - 1;
    if (newIndex >= imgs.length) newIndex = 0;

    setCurrentImage(imgs[newIndex]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* تصویر اصلی با دکمه‌های اسلایدر */}
      <div className="relative w-[500px] h-[300px]">
        <Image
          src={currentImage}
          alt="Service Image"
          width={500}
          height={300}
          className="rounded-lg object-cover w-full h-full"
        />
        <button
          onClick={() => changeImage(-1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-md"
        >
          ❮
        </button>
        <button
          onClick={() => changeImage(1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-md"
        >
          ❯
        </button>
      </div>

      {/* تصاویر کوچک (Thumbnail) */}
      <div className="flex gap-2">
        {imgs.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            width={80}
            height={50}
            className={`rounded-md cursor-pointer transition-all duration-200 hover:scale-110 ${
              img === currentImage ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setCurrentImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
