"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  "/images/5167172.jpg",
  "/images/about-shape.png",
  "/images/about1-image1.png",
  "/images/about1-image2.png",
];

export default function CarGallery() {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const changeImage = (direction: number) => {
    const currentIndex = images.indexOf(currentImage);
    console.log(currentIndex);

    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    setCurrentImage(images[newIndex]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* تصویر اصلی با دکمه‌های اسلایدر */}
      <div className="relative w-[500px] h-[300px]">
        <Image
          src={currentImage}
          alt="Car"
          width={500}
          height={300}
          className="rounded-lg object-cover w-full h-full"
        />
        <button
          onClick={() => changeImage(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-md"
        >
          ❯
        </button>
        <button
          onClick={() => changeImage(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-md"
        >
          ❮
        </button>
      </div>

      {/* تصاویر کوچک (Thumbnail) */}
      <div className="flex gap-2">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="Thumbnail"
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
