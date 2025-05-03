import React from "react";
import { HiArrowRight } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

interface EmptyProps {
  btnValue?: string;
  btnHref?: string;
  spanValue: string;
  hidden?: boolean; // اگر false باشه، دکمه مخفی میشه
}

const Empty = ({
  btnValue,
  btnHref,
  spanValue,
  hidden = true,
}: EmptyProps) => {
  return (
    <div className="container xl:max-w-screen-xl px-4 flex justify-center items-center">
      <div className="text-center space-y-4 sm:space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <Image
            src="/images/empty.png"
            alt="Empty state illustration"
            width={150}
            height={150}
            className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px]"
          />
        </div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-secondary-700">
          هنوز محتوایی برای نمایش وجود ندارد!
        </h1>
        <p className="text-xs sm:text-sm text-secondary-500">
          به نظر می‌رسد که هنوز {spanValue} ثبت نکرده‌اید یا محتوایی برای نمایش
          در دسترس نیست.
        </p>
        <div className={clsx("flex justify-center", !hidden && "hidden")}>
          <Link href={btnHref || "/default-url"}>
            <button className="flex items-center gap-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-primary-900 text-white hover:bg-primary-800 transition text-sm sm:text-base">
              {btnValue}
              <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Empty;
