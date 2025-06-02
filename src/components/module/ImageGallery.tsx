"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";

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
        <Button
          onPress={() => changeImage(-1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-md"
        >
          ❮
        </Button>
        <Button
          onPress={() => changeImage(1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-md"
        >
          ❯
        </Button>
      </div>

      {/* تصاویر کوچک (Thumbnail) */}
      <div className="flex gap-2 overflow-x-auto overflow-y-hidden w-full  ">
        {imgs.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            width={120}
            height={60}
            className={`rounded-md cursor-pointer transition-all duration-200 hover:scale-110 snap-start ${
              img === currentImage ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setCurrentImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
